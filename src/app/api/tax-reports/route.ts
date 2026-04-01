import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

// GET /api/tax-reports — generate annual tax report for Portal das Finanças
export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const { searchParams } = new URL(req.url);
    const year = parseInt(searchParams.get("year") || new Date().getFullYear().toString());

    if (year < 2020 || year > 2030) {
      return json({ ok: false, error: "Ano inválido" }, 400);
    }

    // Get all properties for the user
    const properties = await sql`
      SELECT
        p.*,
        COUNT(t.id) as tenant_count
      FROM properties p
      LEFT JOIN tenants t ON t.property_id = p.id AND t.status = 'active'
      WHERE p.owner_id = ${user.userId} AND p.status = 'active'
      GROUP BY p.id, p.address, p.city, p.municipality, p.property_type, p.typology, p.area_m2, p.year_built, p.license_number, p.fiscal_value, p.status, p.created_at, p.updated_at, p.owner_id
      ORDER BY p.address
    `;

    // Get rental income for the year
    const rentalIncome = await sql`
      SELECT
        p.id as property_id,
        p.address,
        p.fiscal_value,
        SUM(r.amount) as total_income,
        COUNT(r.id) as receipt_count,
        array_agg(DISTINCT r.receipt_number ORDER BY r.receipt_number) as receipt_numbers
      FROM properties p
      LEFT JOIN receipts r ON r.property_id = p.id
        AND r.period_year = ${year}
        AND r.status IN ('issued', 'sent', 'submitted')
      WHERE p.owner_id = ${user.userId} AND p.status = 'active'
      GROUP BY p.id, p.address, p.fiscal_value
      ORDER BY p.address
    `;

    // Get deductible expenses for the year
    const expenses = await sql`
      SELECT
        p.id as property_id,
        p.address,
        e.category,
        SUM(e.amount) as total_amount,
        COUNT(e.id) as expense_count
      FROM properties p
      LEFT JOIN expenses e ON e.property_id = p.id
        AND EXTRACT(year FROM e.date) = ${year}
        AND e.deductible = true
      WHERE p.owner_id = ${user.userId} AND p.status = 'active'
      GROUP BY p.id, p.address, e.category
      ORDER BY p.address, e.category
    `;

    // Get user information for the report
    const [userInfo] = await sql`
      SELECT name, email FROM customers WHERE id = ${user.userId}
    `;

    // Calculate totals and organize data
    const propertyReports = properties.map((property: any) => {
      const income = rentalIncome.find((inc: any) => inc.property_id === property.id);
      const propertyExpenses = expenses.filter((exp: any) => exp.property_id === property.id);

      const totalIncome = income?.total_income || 0;
      const totalExpenses = propertyExpenses.reduce((sum: number, exp: any) => sum + (exp.total_amount || 0), 0);
      const netIncome = totalIncome - totalExpenses;

      const expensesByCategory = propertyExpenses.reduce((acc: any, exp: any) => {
        if (exp.category) {
          acc[exp.category] = exp.total_amount || 0;
        }
        return acc;
      }, {});

      return {
        property: {
          id: property.id,
          address: property.address,
          city: property.city,
          municipality: property.municipality,
          type: property.property_type,
          typology: property.typology,
          fiscal_value: property.fiscal_value,
          tenant_count: property.tenant_count
        },
        income: {
          total: totalIncome,
          receipt_count: income?.receipt_count || 0,
          receipt_numbers: income?.receipt_numbers || []
        },
        expenses: {
          total: totalExpenses,
          by_category: expensesByCategory
        },
        net_income: netIncome
      };
    });

    const summary = {
      year,
      total_properties: properties.length,
      total_income: propertyReports.reduce((sum, p) => sum + p.income.total, 0),
      total_expenses: propertyReports.reduce((sum, p) => sum + p.expenses.total, 0),
      total_net_income: propertyReports.reduce((sum, p) => sum + p.net_income, 0),
      total_receipts: propertyReports.reduce((sum, p) => sum + p.income.receipt_count, 0)
    };

    const report = {
      generated_at: new Date().toISOString(),
      user: {
        name: userInfo?.name,
        email: userInfo?.email
      },
      summary,
      properties: propertyReports
    };

    return json({ ok: true, data: report });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Tax report error:", error);
    return json({ ok: false, error: "Erro ao gerar relatório fiscal" }, 500);
  }
}