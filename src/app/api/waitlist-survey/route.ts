import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const sql = getDb()
    const {
      email,
      willingness_to_pay,
      max_monthly_price,
      most_valuable_features,
      current_solution,
      feedback,
      waitlist_id
    } = await request.json()

    if (!email || !willingness_to_pay) {
      return NextResponse.json({
        ok: false,
        error: 'Email and willingness to pay are required'
      }, { status: 400 })
    }

    // Validate email exists in waitlist
    const waitlistUser = await sql`
      SELECT id, position, created_at FROM waitlist WHERE email = ${email.toLowerCase()}
    `

    if (waitlistUser.length === 0) {
      return NextResponse.json({
        ok: false,
        error: 'Email not found in waitlist'
      }, { status: 404 })
    }

    // Create survey_responses table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS survey_responses (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        waitlist_id TEXT NOT NULL REFERENCES waitlist(id),
        email TEXT NOT NULL,
        willingness_to_pay TEXT NOT NULL CHECK (willingness_to_pay IN ('definitely', 'probably', 'maybe', 'probably_not', 'definitely_not')),
        max_monthly_price NUMERIC,
        most_valuable_features TEXT[],
        current_solution TEXT,
        feedback TEXT,
        referral_position INTEGER,
        waitlist_position INTEGER,
        days_on_waitlist INTEGER,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        UNIQUE(waitlist_id)
      )
    `

    const waitlistRecord = waitlistUser[0]
    const daysOnWaitlist = Math.floor(
      (Date.now() - new Date(waitlistRecord.created_at).getTime()) / (1000 * 60 * 60 * 24)
    )

    // Insert survey response
    await sql`
      INSERT INTO survey_responses (
        waitlist_id,
        email,
        willingness_to_pay,
        max_monthly_price,
        most_valuable_features,
        current_solution,
        feedback,
        waitlist_position,
        days_on_waitlist
      ) VALUES (
        ${waitlistRecord.id},
        ${email.toLowerCase()},
        ${willingness_to_pay},
        ${max_monthly_price || null},
        ${most_valuable_features || []},
        ${current_solution || null},
        ${feedback || null},
        ${waitlistRecord.position || null},
        ${daysOnWaitlist}
      )
      ON CONFLICT (waitlist_id) DO UPDATE SET
        willingness_to_pay = EXCLUDED.willingness_to_pay,
        max_monthly_price = EXCLUDED.max_monthly_price,
        most_valuable_features = EXCLUDED.most_valuable_features,
        current_solution = EXCLUDED.current_solution,
        feedback = EXCLUDED.feedback,
        created_at = now()
    `

    return NextResponse.json({
      ok: true,
      data: {
        message: 'Survey response recorded successfully',
        waitlist_position: waitlistRecord.position,
        days_on_waitlist: daysOnWaitlist
      }
    })

  } catch (error) {
    console.error('Error saving survey response:', error)
    return NextResponse.json({
      ok: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const sql = getDb()
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    if (action === 'stats') {
      // Return survey statistics for admin
      const stats = await sql`
        SELECT
          COUNT(*) as total_responses,
          COUNT(CASE WHEN willingness_to_pay IN ('definitely', 'probably') THEN 1 END) as positive_responses,
          COUNT(CASE WHEN willingness_to_pay = 'maybe' THEN 1 END) as neutral_responses,
          COUNT(CASE WHEN willingness_to_pay IN ('probably_not', 'definitely_not') THEN 1 END) as negative_responses,
          AVG(max_monthly_price) as avg_max_price,
          ROUND(
            COUNT(CASE WHEN willingness_to_pay IN ('definitely', 'probably') THEN 1 END) * 100.0 / COUNT(*),
            2
          ) as positive_percentage
        FROM survey_responses
      `

      const willingness_breakdown = await sql`
        SELECT
          willingness_to_pay,
          COUNT(*) as count,
          ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM survey_responses), 2) as percentage
        FROM survey_responses
        GROUP BY willingness_to_pay
        ORDER BY
          CASE willingness_to_pay
            WHEN 'definitely' THEN 1
            WHEN 'probably' THEN 2
            WHEN 'maybe' THEN 3
            WHEN 'probably_not' THEN 4
            WHEN 'definitely_not' THEN 5
          END
      `

      const price_distribution = await sql`
        SELECT
          CASE
            WHEN max_monthly_price IS NULL THEN 'No price given'
            WHEN max_monthly_price < 5 THEN '€0-5'
            WHEN max_monthly_price < 10 THEN '€5-10'
            WHEN max_monthly_price < 15 THEN '€10-15'
            WHEN max_monthly_price < 20 THEN '€15-20'
            WHEN max_monthly_price < 30 THEN '€20-30'
            ELSE '€30+'
          END as price_range,
          COUNT(*) as count
        FROM survey_responses
        GROUP BY price_range
        ORDER BY
          CASE price_range
            WHEN '€0-5' THEN 1
            WHEN '€5-10' THEN 2
            WHEN '€10-15' THEN 3
            WHEN '€15-20' THEN 4
            WHEN '€20-30' THEN 5
            WHEN '€30+' THEN 6
            ELSE 7
          END
      `

      // Get waitlist size for context
      const waitlist_size = await sql`
        SELECT COUNT(*) as total FROM waitlist WHERE status = 'waiting'
      `

      return NextResponse.json({
        ok: true,
        data: {
          overview: stats[0],
          willingness_breakdown,
          price_distribution,
          waitlist_size: waitlist_size[0].total
        }
      })
    }

    // Default: return recent responses for admin
    const responses = await sql`
      SELECT
        sr.email,
        sr.willingness_to_pay,
        sr.max_monthly_price,
        sr.most_valuable_features,
        sr.current_solution,
        sr.feedback,
        sr.waitlist_position,
        sr.days_on_waitlist,
        sr.created_at,
        w.referral_count
      FROM survey_responses sr
      JOIN waitlist w ON sr.waitlist_id = w.id
      ORDER BY sr.created_at DESC
      LIMIT 50
    `

    return NextResponse.json({
      ok: true,
      data: responses
    })

  } catch (error) {
    console.error('Error fetching survey data:', error)
    return NextResponse.json({
      ok: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}