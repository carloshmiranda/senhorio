import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

// GET /api/analytics — comprehensive portfolio analytics
export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();

    const { searchParams } = new URL(req.url);
    const period = searchParams.get("period") || "12months"; // 12months, 6months, 3months, all
    const year = searchParams.get("year") ? parseInt(searchParams.get("year")!) : new Date().getFullYear();

    // Date range calculation
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case "3months":
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        break;
      case "6months":
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
        break;
      case "12months":
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), 1);
        break;
      default:
        startDate = new Date(year, 0, 1); // Start of specified year
    }

    // Portfolio Overview
    const portfolioOverview = await sql`
      SELECT
        COUNT(DISTINCT p.id) as total_properties,
        COUNT(DISTINCT t.id) as total_tenants,
        COUNT(DISTINCT CASE WHEN t.status = 'active' THEN t.id END) as active_tenants,
        COALESCE(SUM(CASE WHEN t.status = 'active' THEN t.rent_amount END), 0) as total_monthly_income,
        COALESCE(AVG(CASE WHEN t.status = 'active' THEN t.rent_amount END), 0) as avg_rent_per_tenant,
        COALESCE(SUM(p.fiscal_value), 0) as total_fiscal_value
      FROM properties p
      LEFT JOIN tenants t ON t.property_id = p.id
      WHERE p.owner_id = ${user.userId}
    `;

    // Monthly Income Trends
    const incomeHistory = await sql`
      SELECT
        DATE_TRUNC('month', rp.paid_date) as month,
        SUM(rp.amount) as total_income,
        COUNT(rp.id) as payments_count,
        COUNT(DISTINCT rp.tenant_id) as paying_tenants
      FROM rental_payments rp
      JOIN tenants t ON t.id = rp.tenant_id
      JOIN properties p ON p.id = t.property_id
      WHERE p.owner_id = ${user.userId}
        AND rp.status = 'paid'
        AND rp.paid_date >= ${startDate.toISOString()}
        AND rp.paid_date <= ${now.toISOString()}
      GROUP BY DATE_TRUNC('month', rp.paid_date)
      ORDER BY month
    `;

    // Property Performance
    const propertyPerformance = await sql`
      SELECT
        p.id,
        p.address,
        p.property_type,
        p.typology,
        p.fiscal_value,
        COUNT(DISTINCT t.id) as total_tenants,
        COUNT(DISTINCT CASE WHEN t.status = 'active' THEN t.id END) as active_tenants,
        COALESCE(SUM(CASE WHEN t.status = 'active' THEN t.rent_amount END), 0) as monthly_income,
        COALESCE(SUM(rp.amount), 0) as total_collected,
        COUNT(rp.id) as total_payments,
        COUNT(CASE WHEN rp.status = 'paid' THEN rp.id END) as paid_payments,
        COUNT(CASE WHEN rp.status = 'overdue' THEN rp.id END) as overdue_payments,
        ROUND(
          CASE
            WHEN COUNT(rp.id) > 0
            THEN (COUNT(CASE WHEN rp.status = 'paid' THEN rp.id END) * 100.0 / COUNT(rp.id))
            ELSE 0
          END, 2
        ) as payment_success_rate
      FROM properties p
      LEFT JOIN tenants t ON t.property_id = p.id
      LEFT JOIN rental_payments rp ON rp.tenant_id = t.id
        AND rp.due_date >= ${startDate.toISOString()}
      WHERE p.owner_id = ${user.userId}
      GROUP BY p.id, p.address, p.property_type, p.typology, p.fiscal_value
      ORDER BY monthly_income DESC
    `;

    // Payment Status Analysis
    const paymentAnalysis = await sql`
      SELECT
        rp.status,
        COUNT(rp.id) as count,
        SUM(rp.amount) as total_amount,
        ROUND(AVG(rp.amount), 2) as avg_amount
      FROM rental_payments rp
      JOIN tenants t ON t.id = rp.tenant_id
      JOIN properties p ON p.id = t.property_id
      WHERE p.owner_id = ${user.userId}
        AND rp.due_date >= ${startDate.toISOString()}
      GROUP BY rp.status
      ORDER BY count DESC
    `;

    // Geographic Distribution
    const geographicData = await sql`
      SELECT
        COALESCE(p.municipality, 'Não especificado') as municipality,
        COUNT(p.id) as property_count,
        COALESCE(SUM(CASE WHEN t.status = 'active' THEN t.rent_amount END), 0) as monthly_income
      FROM properties p
      LEFT JOIN tenants t ON t.property_id = p.id AND t.status = 'active'
      WHERE p.owner_id = ${user.userId}
      GROUP BY p.municipality
      ORDER BY property_count DESC
    `;

    // Property Type Distribution
    const propertyTypeData = await sql`
      SELECT
        p.property_type,
        COUNT(p.id) as property_count,
        COALESCE(SUM(CASE WHEN t.status = 'active' THEN t.rent_amount END), 0) as monthly_income,
        COALESCE(AVG(CASE WHEN t.status = 'active' THEN t.rent_amount END), 0) as avg_rent
      FROM properties p
      LEFT JOIN tenants t ON t.property_id = p.id AND t.status = 'active'
      WHERE p.owner_id = ${user.userId}
      GROUP BY p.property_type
      ORDER BY property_count DESC
    `;

    // Occupancy Rate over time
    const occupancyHistory = await sql`
      SELECT
        DATE_TRUNC('month', t.start_date) as month,
        COUNT(t.id) as total_units,
        COUNT(CASE WHEN t.status = 'active' THEN t.id END) as occupied_units,
        ROUND(
          (COUNT(CASE WHEN t.status = 'active' THEN t.id END) * 100.0 / NULLIF(COUNT(t.id), 0)), 2
        ) as occupancy_rate
      FROM tenants t
      JOIN properties p ON p.id = t.property_id
      WHERE p.owner_id = ${user.userId}
        AND t.start_date >= ${startDate.toISOString()}
      GROUP BY DATE_TRUNC('month', t.start_date)
      ORDER BY month
    `;

    // ROI Analysis (based on fiscal value vs rental income)
    const roiAnalysis = await sql`
      SELECT
        p.id,
        p.address,
        p.fiscal_value,
        COALESCE(SUM(CASE WHEN t.status = 'active' THEN t.rent_amount END), 0) * 12 as annual_rental_income,
        CASE
          WHEN p.fiscal_value > 0
          THEN ROUND(((COALESCE(SUM(CASE WHEN t.status = 'active' THEN t.rent_amount END), 0) * 12) / p.fiscal_value * 100), 2)
          ELSE 0
        END as gross_yield_percentage
      FROM properties p
      LEFT JOIN tenants t ON t.property_id = p.id AND t.status = 'active'
      WHERE p.owner_id = ${user.userId}
        AND p.fiscal_value > 0
      GROUP BY p.id, p.address, p.fiscal_value
      ORDER BY gross_yield_percentage DESC
    `;

    // Recent Receipts Count
    const recentReceiptsCount = await sql`
      SELECT COUNT(*) as count
      FROM receipts r
      JOIN properties p ON p.id = r.property_id
      WHERE p.owner_id = ${user.userId}
        AND r.created_at >= ${startDate.toISOString()}
    `;

    return json({
      ok: true,
      data: {
        period,
        startDate: startDate.toISOString(),
        endDate: now.toISOString(),
        portfolioOverview: portfolioOverview[0],
        incomeHistory,
        propertyPerformance,
        paymentAnalysis,
        geographicData,
        propertyTypeData,
        occupancyHistory,
        roiAnalysis,
        recentReceiptsCount: recentReceiptsCount[0]?.count || 0
      }
    });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Analytics error:", error);
    return json({ ok: false, error: "Erro ao carregar análises" }, 500);
  }
}