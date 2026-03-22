import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const sql = getDb()
    const { email, name, plan, source_path, metadata = {} } = await request.json()

    if (!email || !plan) {
      return NextResponse.json({
        ok: false,
        error: 'Email and plan are required'
      }, { status: 400 })
    }

    // Valid plans from the pricing model
    const validPlans = ['gratis', 'pro', 'premium']
    if (!validPlans.includes(plan.toLowerCase())) {
      return NextResponse.json({
        ok: false,
        error: 'Invalid plan'
      }, { status: 400 })
    }

    // Check if payment intent already exists for this email
    const existing = await sql`
      SELECT id FROM payment_intents WHERE email = ${email.toLowerCase()}
    `

    if (existing.length > 0) {
      // Update existing record with new plan preference
      await sql`
        UPDATE payment_intents
        SET
          plan = ${plan.toLowerCase()},
          source_path = ${source_path || '/'},
          metadata = ${JSON.stringify(metadata)},
          updated_at = now()
        WHERE email = ${email.toLowerCase()}
      `

      return NextResponse.json({
        ok: true,
        data: {
          message: 'Payment intent updated successfully',
          existing: true
        }
      })
    } else {
      // Insert new payment intent
      const result = await sql`
        INSERT INTO payment_intents (
          email, name, plan, source_path, metadata
        ) VALUES (
          ${email.toLowerCase()},
          ${name || null},
          ${plan.toLowerCase()},
          ${source_path || '/'},
          ${JSON.stringify(metadata)}
        )
        RETURNING id
      `

      return NextResponse.json({
        ok: true,
        data: {
          message: 'Payment intent captured successfully',
          id: result[0].id,
          existing: false
        }
      })
    }
  } catch (error) {
    console.error('Error capturing payment intent:', error)
    return NextResponse.json({
      ok: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    const sql = getDb()
    // Return aggregated payment intent data for analytics
    const intents = await sql`
      SELECT
        plan,
        COUNT(*) as intent_count,
        DATE(created_at) as date
      FROM payment_intents
      WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY plan, DATE(created_at)
      ORDER BY date DESC, plan
    `

    return NextResponse.json({
      ok: true,
      data: intents
    })
  } catch (error) {
    console.error('Error fetching payment intents:', error)
    return NextResponse.json({
      ok: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}