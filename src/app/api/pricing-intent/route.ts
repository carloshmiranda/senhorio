import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const sql = getDb()
    const { tier, source_path } = await request.json()

    if (!tier) {
      return NextResponse.json({
        ok: false,
        error: 'Tier is required'
      }, { status: 400 })
    }

    // Valid tiers from the pricing model
    const validTiers = ['free', 'pro', 'premium']
    if (!validTiers.includes(tier.toLowerCase())) {
      return NextResponse.json({
        ok: false,
        error: 'Invalid tier'
      }, { status: 400 })
    }

    // Log the pricing intent click
    await sql`
      INSERT INTO pricing_clicks (tier, source_path)
      VALUES (${tier.toLowerCase()}, ${source_path || '/pricing'})
    `

    return NextResponse.json({
      ok: true,
      data: { message: 'Intent tracked successfully' }
    })
  } catch (error) {
    console.error('Error tracking pricing intent:', error)
    return NextResponse.json({
      ok: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    const sql = getDb()
    // Return aggregated pricing click data for analytics
    const clicks = await sql`
      SELECT
        tier,
        COUNT(*) as click_count,
        DATE(created_at) as date
      FROM pricing_clicks
      WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY tier, DATE(created_at)
      ORDER BY date DESC, tier
    `

    return NextResponse.json({
      ok: true,
      data: clicks
    })
  } catch (error) {
    console.error('Error fetching pricing clicks:', error)
    return NextResponse.json({
      ok: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}