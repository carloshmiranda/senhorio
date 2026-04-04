"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface TaxReportSummary {
  year: number;
  total_properties: number;
  total_income: number;
  total_expenses: number;
  total_net_income: number;
  total_receipts: number;
}

interface PropertyReport {
  property: {
    id: string;
    address: string;
    city: string;
    municipality: string;
    type: string;
    typology: string;
    fiscal_value: number;
    tenant_count: number;
  };
  income: {
    total: number;
    receipt_count: number;
    receipt_numbers: string[];
  };
  expenses: {
    total: number;
    by_category: Record<string, number>;
  };
  net_income: number;
}

interface TaxReport {
  generated_at: string;
  user: {
    name: string;
    email: string;
  };
  summary: TaxReportSummary;
  properties: PropertyReport[];
}

const expenseCategories = {
  maintenance: "Manutenção",
  insurance: "Seguros",
  imu: "IMU",
  condominium: "Condomínio",
  mortgage_interest: "Juros de Empréstimo",
  legal: "Despesas Legais",
  other: "Outras"
};

export default function TaxReportsPage() {
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState<TaxReport | null>(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const currentYear = new Date().getFullYear();
  const availableYears = Array.from(
    { length: currentYear - 2019 },
    (_, i) => currentYear - i
  );

  useEffect(() => {
    loadReport();
  }, [selectedYear]);

  async function loadReport() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/tax-reports?year=${selectedYear}`);
      const data = await res.json();

      if (data.ok) {
        setReport(data.data);
      } else {
        setError(data.error || "Erro ao carregar relatório");
      }
    } catch {
      setError("Erro de ligação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  async function exportReport(format: 'csv' | 'json') {
    setExporting(true);
    setError("");

    try {
      const res = await fetch(`/api/tax-reports/export?year=${selectedYear}&format=${format}`);

      if (format === 'csv') {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `relatorio_fiscal_${selectedYear}_${report?.user.email?.split('@')[0] || 'senhorio'}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        const data = await res.json();
        if (data.ok) {
          const blob = new Blob([JSON.stringify(data.data, null, 2)], { type: 'application/json' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `relatorio_fiscal_${selectedYear}_${report?.user.email?.split('@')[0] || 'senhorio'}.json`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } else {
          setError(data.error || "Erro ao exportar relatório");
        }
      }
    } catch {
      setError("Erro ao exportar relatório");
    } finally {
      setExporting(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Relatórios Fiscais</h1>
          <p className="text-sm text-gray-600">Exporte dados formatados para o Portal das Finanças</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
          >
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="grid md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 h-24"></div>
            ))}
          </div>
        </div>
      ) : report ? (
        <div className="space-y-8">
          {/* Summary Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Imóveis</h3>
              <p className="text-3xl font-bold text-gray-900">{report.summary.total_properties}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Rendas Totais</h3>
              <p className="text-3xl font-bold text-green-600">€{report.summary.total_income.toFixed(2)}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Despesas Dedutíveis</h3>
              <p className="text-3xl font-bold text-red-600">€{report.summary.total_expenses.toFixed(2)}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Rendimento Líquido</h3>
              <p className="text-3xl font-bold text-brand-600">€{report.summary.total_net_income.toFixed(2)}</p>
            </div>
          </div>

          {/* Export Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Exportar para Portal das Finanças</h2>
            <p className="text-sm text-gray-600 mb-6">
              Exporte os seus dados fiscais formatados para facilitar o preenchimento no Portal das Finanças.
              O ficheiro CSV inclui resumos por imóvel, detalhes de rendas e despesas dedutíveis.
            </p>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => exportReport('csv')}
                disabled={exporting}
                className="px-6 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition disabled:opacity-50 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {exporting ? "A exportar..." : "Exportar CSV"}
              </button>

              <button
                onClick={() => exportReport('json')}
                disabled={exporting}
                className="px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition disabled:opacity-50 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {exporting ? "A exportar..." : "Exportar JSON"}
              </button>
            </div>

            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Nota:</strong> Este relatório deve ser usado como referência.
                Confirme todos os valores antes da submissão oficial no Portal das Finanças e
                mantenha os recibos originais para eventual auditoria.
              </p>
            </div>
          </div>

          {/* Property Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Detalhes por Imóvel</h2>
            </div>

            {report.properties.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-gray-500">Sem dados fiscais para {selectedYear}.</p>
                <p className="text-sm text-gray-400 mt-1">
                  Adicione imóveis e recibos para gerar relatórios fiscais.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {report.properties.map((propertyReport) => (
                  <div key={propertyReport.property.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {propertyReport.property.address}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {propertyReport.property.city && propertyReport.property.municipality &&
                            `${propertyReport.property.city}, ${propertyReport.property.municipality}`}
                        </p>
                        <p className="text-sm text-gray-500">
                          {propertyReport.property.typology} • VPT: €{propertyReport.property.fiscal_value?.toFixed(2) || "N/A"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          €{propertyReport.net_income.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">Rendimento líquido</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Rendas</h4>
                        <p className="text-2xl font-bold text-green-600">€{propertyReport.income.total.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">{propertyReport.income.receipt_count} recibos</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Despesas Dedutíveis</h4>
                        <p className="text-2xl font-bold text-red-600">€{propertyReport.expenses.total.toFixed(2)}</p>
                        {Object.keys(propertyReport.expenses.by_category).length > 0 && (
                          <div className="mt-2 space-y-1">
                            {Object.entries(propertyReport.expenses.by_category).map(([category, amount]) => (
                              <p key={category} className="text-xs text-gray-500">
                                {expenseCategories[category as keyof typeof expenseCategories] || category}: €{(amount as number).toFixed(2)}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Taxa Efetiva</h4>
                        <p className="text-2xl font-bold text-gray-600">
                          {propertyReport.income.total > 0
                            ? ((propertyReport.expenses.total / propertyReport.income.total) * 100).toFixed(1)
                            : "0.0"}%
                        </p>
                        <p className="text-sm text-gray-500">Despesas/Rendas</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Help Section */}
          <div className="bg-brand-50 border border-brand-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-brand-900 mb-3">Como usar no Portal das Finanças</h3>
            <div className="space-y-2 text-sm text-brand-800">
              <p>1. <strong>Faça download do ficheiro CSV</strong> clicando em "Exportar CSV"</p>
              <p>2. <strong>Aceda ao Portal das Finanças</strong> e navegue para a secção de IRS</p>
              <p>3. <strong>Use os dados do resumo</strong> para preencher os valores de rendas prediais</p>
              <p>4. <strong>Adicione as despesas dedutíveis</strong> por categoria conforme listado</p>
              <p>5. <strong>Mantenha os recibos originais</strong> como comprovativo das operações</p>
            </div>
          </div>

        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-16 text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Sem dados fiscais</h3>
          <p className="text-gray-500 mb-6">Não foi encontrada atividade fiscal para {selectedYear}.</p>
          <Link
            href="/dashboard/properties"
            className="px-6 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition"
          >
            Adicionar Imóveis
          </Link>
        </div>
      )}
    </div>
  );
}