import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

// GET /api/tax-reports/export — export tax report as CSV for Portal das Finanças
export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const sql = getDb();
    const { searchParams } = new URL(req.url);
    const year = parseInt(searchParams.get("year") || new Date().getFullYear().toString());
    const format = searchParams.get("format") || "csv";

    if (year < 2020 || year > 2030) {
      return json({ ok: false, error: "Ano inválido" }, 400);
    }

    if (!["csv", "json"].includes(format)) {
      return json({ ok: false, error: "Formato inválido. Use 'csv' ou 'json'" }, 400);
    }

    // Get user information
    const [userInfo] = await sql`
      SELECT name, email FROM customers WHERE id = ${user.userId}
    `;

    // Get detailed rental income data for export
    const incomeData = await sql`
      SELECT
        p.address as "Morada_Imovel",
        p.city as "Localidade",
        p.municipality as "Concelho",
        p.property_type as "Tipo_Imovel",
        p.typology as "Tipologia",
        p.fiscal_value as "VPT_Euros",
        t.name as "Nome_Inquilino",
        t.nif as "NIF_Inquilino",
        r.receipt_number as "Numero_Recibo",
        r.period_month as "Mes",
        r.period_year as "Ano",
        r.amount as "Valor_Renda_Euros",
        r.issue_date as "Data_Emissao",
        r.status as "Estado_Recibo"
      FROM properties p
      JOIN receipts r ON r.property_id = p.id
      JOIN tenants t ON t.id = r.tenant_id
      WHERE p.owner_id = ${user.userId}
        AND r.period_year = ${year}
        AND r.status IN ('issued', 'sent', 'submitted')
      ORDER BY p.address, r.period_month
    `;

    // Get expenses data for export
    const expensesData = await sql`
      SELECT
        p.address as "Morada_Imovel",
        p.city as "Localidade",
        p.municipality as "Concelho",
        e.category as "Categoria_Despesa",
        e.description as "Descricao",
        e.amount as "Valor_Euros",
        e.date as "Data_Despesa",
        CASE WHEN e.deductible THEN 'Sim' ELSE 'Não' END as "Dedutivel"
      FROM properties p
      JOIN expenses e ON e.property_id = p.id
      WHERE p.owner_id = ${user.userId}
        AND EXTRACT(year FROM e.date) = ${year}
      ORDER BY p.address, e.date
    `;

    // Calculate summary by property for Portal das Finanças format
    const summaryData = await sql`
      SELECT
        p.address as "Morada_Imovel",
        p.city as "Localidade",
        p.municipality as "Concelho",
        p.fiscal_value as "VPT_Euros",
        COALESCE(income_summary.total_income, 0) as "Rendas_Totais_Euros",
        COALESCE(expense_summary.total_expenses, 0) as "Despesas_Dedutiveis_Euros",
        COALESCE(income_summary.total_income, 0) - COALESCE(expense_summary.total_expenses, 0) as "Rendimento_Liquido_Euros"
      FROM properties p
      LEFT JOIN (
        SELECT
          property_id,
          SUM(amount) as total_income
        FROM receipts
        WHERE period_year = ${year} AND status IN ('issued', 'sent', 'submitted')
        GROUP BY property_id
      ) income_summary ON income_summary.property_id = p.id
      LEFT JOIN (
        SELECT
          property_id,
          SUM(amount) as total_expenses
        FROM expenses
        WHERE EXTRACT(year FROM date) = ${year} AND deductible = true
        GROUP BY property_id
      ) expense_summary ON expense_summary.property_id = p.id
      WHERE p.owner_id = ${user.userId} AND p.status = 'active'
      ORDER BY p.address
    `;

    if (format === "json") {
      const exportData = {
        exported_at: new Date().toISOString(),
        year,
        user: {
          name: userInfo?.name,
          email: userInfo?.email
        },
        summary: summaryData,
        income_details: incomeData,
        expense_details: expensesData
      };
      return json({ ok: true, data: exportData });
    }

    // Generate CSV format
    function objectToCSV(data: any[], title: string): string {
      if (data.length === 0) return `${title}\nSem dados disponíveis\n\n`;

      const headers = Object.keys(data[0]);
      const csvRows = [
        title,
        headers.join(","),
        ...data.map(row =>
          headers.map(header => {
            const value = row[header];
            // Handle null/undefined and escape CSV special characters
            if (value === null || value === undefined) return "";
            if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          }).join(",")
        ),
        "" // empty line separator
      ];
      return csvRows.join("\n");
    }

    const csvContent = [
      `# Relatório Fiscal ${year} - ${userInfo?.name || userInfo?.email}`,
      `# Gerado em: ${new Date().toLocaleDateString('pt-PT')}`,
      `# Sistema: Senhorio`,
      "",
      objectToCSV(summaryData, "RESUMO POR IMÓVEL"),
      objectToCSV(incomeData, "DETALHES DE RENDAS"),
      objectToCSV(expensesData, "DETALHES DE DESPESAS"),
      "",
      "# Notas:",
      "# - Este relatório deve ser utilizado como referência para preenchimento no Portal das Finanças",
      "# - Confirme todos os valores antes da submissão oficial",
      "# - Mantenha os recibos originais para eventual auditoria"
    ].join("\n");

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="relatorio_fiscal_${year}_${userInfo?.email?.split('@')[0] || 'senhorio'}.csv"`,
      },
    });

  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return json({ ok: false, error: "Não autorizado" }, 401);
    }
    console.error("Tax export error:", error);
    return json({ ok: false, error: "Erro ao exportar relatório fiscal" }, 500);
  }
}