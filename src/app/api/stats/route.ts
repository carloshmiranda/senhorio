import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export const dynamic = 'force-dynamic'

// GET /api/stats — returns stats for Hive metrics cron
// Returns standard Hive format: { ok, views, pricing_clicks, affiliate_clicks }
// Plus extended stats for other consumers
export async function GET() {
  try {
    const sql = getDb()

    const [waitlistStats, pricingStats, emailStats, customerStats, pageViewStats] = await Promise.all([
      sql`
        SELECT
          COUNT(*) as total_signups,
          COUNT(*) FILTER (WHERE status = 'waiting') as waiting,
          COUNT(*) FILTER (WHERE status = 'invited') as invited,
          COUNT(*) FILTER (WHERE status = 'converted') as converted,
          COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as signups_last_7d,
          COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as signups_last_30d
        FROM waitlist
      `.catch(() => [{}]),
      sql`
        SELECT
          COUNT(*) as total_clicks,
          COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as clicks_last_7d,
          COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as clicks_last_30d,
          COUNT(*) FILTER (WHERE tier = 'pro') as pro_clicks,
          COUNT(*) FILTER (WHERE tier = 'premium') as premium_clicks
        FROM pricing_clicks
      `.catch(() => [{}]),
      sql`
        SELECT
          COUNT(*) as total_sent,
          COUNT(*) FILTER (WHERE status = 'delivered') as delivered,
          COUNT(*) FILTER (WHERE status = 'opened') as opened,
          COUNT(*) FILTER (WHERE status = 'clicked') as clicked,
          COUNT(*) FILTER (WHERE status = 'bounced') as bounced,
          COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as sent_last_7d
        FROM email_log
      `.catch(() => [{}]),
      sql`
        SELECT
          COUNT(*) as total_customers,
          COUNT(*) FILTER (WHERE status = 'active') as active_customers,
          COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as customers_last_7d,
          COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as customers_last_30d
        FROM customers
      `.catch(() => [{}]),
      sql`
        SELECT
          COUNT(*) as total_views,
          COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as views_last_7d,
          COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as views_last_30d
        FROM page_views
      `.catch(() => [{}]),
    ])

    return NextResponse.json({
      ok: true,
      // Standard Hive metrics format (required by Hive metrics cron)
      views: Number((pageViewStats[0] as any)?.total_views || 0),
      pricing_clicks: Number((pricingStats[0] as any)?.total_clicks || 0),
      affiliate_clicks: 0, // No affiliate system implemented yet
      // Extended stats
      data: {
        waitlist: waitlistStats[0] || {},
        pricing: pricingStats[0] || {},
        email: emailStats[0] || {},
        customers: customerStats[0] || {},
        pageViews: pageViewStats[0] || {},
        generated_at: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}
