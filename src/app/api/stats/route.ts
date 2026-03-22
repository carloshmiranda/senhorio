import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function GET() {
  try {
    const sql = getDb()
    // Get waitlist stats
    const waitlistStats = await sql`
      SELECT
        COUNT(*) as total_signups,
        COUNT(*) FILTER (WHERE status = 'waiting') as waiting,
        COUNT(*) FILTER (WHERE status = 'invited') as invited,
        COUNT(*) FILTER (WHERE status = 'converted') as converted,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as signups_last_7d,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as signups_last_30d
      FROM waitlist
    `

    // Get pricing clicks stats
    const pricingStats = await sql`
      SELECT
        COUNT(*) as total_clicks,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as clicks_last_7d,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as clicks_last_30d,
        COUNT(*) FILTER (WHERE tier = 'pro') as pro_clicks,
        COUNT(*) FILTER (WHERE tier = 'premium') as premium_clicks
      FROM pricing_clicks
    `

    // Get email stats
    const emailStats = await sql`
      SELECT
        COUNT(*) as total_sent,
        COUNT(*) FILTER (WHERE status = 'delivered') as delivered,
        COUNT(*) FILTER (WHERE status = 'opened') as opened,
        COUNT(*) FILTER (WHERE status = 'clicked') as clicked,
        COUNT(*) FILTER (WHERE status = 'bounced') as bounced,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as sent_last_7d
      FROM email_log
    `

    // Get customer stats
    const customerStats = await sql`
      SELECT
        COUNT(*) as total_customers,
        COUNT(*) FILTER (WHERE status = 'active') as active_customers,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as customers_last_7d,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as customers_last_30d
      FROM customers
    `

    // Aggregate all stats
    const stats = {
      waitlist: waitlistStats[0] || {},
      pricing: pricingStats[0] || {},
      email: emailStats[0] || {},
      customers: customerStats[0] || {},
      generated_at: new Date().toISOString()
    }

    return NextResponse.json({
      ok: true,
      data: stats
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({
      ok: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}