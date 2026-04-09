"use client";

import { useEffect, useState, useMemo, lazy, Suspense } from "react";

// Dynamically import chart components to reduce initial bundle size
const LazyLineChart = lazy(async () => {
  const { Line } = await import("react-chartjs-2");
  const chartModule = await import("chart.js");

  chartModule.Chart.register(
    chartModule.CategoryScale,
    chartModule.LinearScale,
    chartModule.PointElement,
    chartModule.LineElement,
    chartModule.Title,
    chartModule.Tooltip,
    chartModule.Legend
  );

  return { default: Line };
});

const LazyBarChart = lazy(async () => {
  const { Bar } = await import("react-chartjs-2");
  const chartModule = await import("chart.js");

  chartModule.Chart.register(
    chartModule.CategoryScale,
    chartModule.LinearScale,
    chartModule.BarElement,
    chartModule.Title,
    chartModule.Tooltip,
    chartModule.Legend
  );

  return { default: Bar };
});

const LazyDoughnutChart = lazy(async () => {
  const { Doughnut } = await import("react-chartjs-2");
  const chartModule = await import("chart.js");

  chartModule.Chart.register(
    chartModule.ArcElement,
    chartModule.Title,
    chartModule.Tooltip,
    chartModule.Legend
  );

  return { default: Doughnut };
});

// Chart loading component
function ChartSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-64 bg-gray-200 rounded"></div>
    </div>
  );
}

interface AnalyticsData {
  period: string;
  startDate: string;
  endDate: string;
  portfolioOverview: {
    total_properties: number;
    total_tenants: number;
    active_tenants: number;
    total_monthly_income: number;
    avg_rent_per_tenant: number;
    total_fiscal_value: number;
  };
  incomeHistory: Array<{
    month: string;
    total_income: number;
    payments_count: number;
    paying_tenants: number;
  }>;
  propertyPerformance: Array<{
    id: string;
    address: string;
    property_type: string;
    typology: string;
    monthly_income: number;
    total_collected: number;
    payment_success_rate: number;
  }>;
  paymentAnalysis: Array<{
    status: string;
    count: number;
    total_amount: number;
  }>;
  geographicData: Array<{
    municipality: string;
    property_count: number;
    monthly_income: number;
  }>;
  propertyTypeData: Array<{
    property_type: string;
    property_count: number;
    monthly_income: number;
    avg_rent: number;
  }>;
  roiAnalysis: Array<{
    address: string;
    fiscal_value: number;
    annual_rental_income: number;
    gross_yield_percentage: number;
  }>;
  recentReceiptsCount: number;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("12months");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAnalytics();
  }, [period]);

  async function loadAnalytics() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/analytics?period=${period}`);
      const result = await response.json();

      if (result.ok) {
        setAnalytics(result.data);
      } else {
        setError(result.error || "Erro ao carregar análises");
      }
    } catch (err) {
      console.error("Analytics load error:", err);
      setError("Erro ao carregar análises");
    } finally {
      setLoading(false);
    }
  }

  // Memoized chart configurations to prevent unnecessary recalculations
  const incomeChartData = useMemo(() => ({
    labels: analytics?.incomeHistory.map(item => {
      const date = new Date(item.month);
      return date.toLocaleDateString('pt-PT', { month: 'short', year: 'numeric' });
    }) || [],
    datasets: [
      {
        label: 'Rendimento Mensal',
        data: analytics?.incomeHistory.map(item => item.total_income) || [],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.1,
      },
    ],
  }), [analytics?.incomeHistory]);

  const paymentStatusData = useMemo(() => ({
    labels: analytics?.paymentAnalysis.map(item => {
      const statusLabels: Record<string, string> = {
        paid: 'Pago',
        pending: 'Pendente',
        overdue: 'Em Atraso',
        partial: 'Parcial'
      };
      return statusLabels[item.status] || item.status;
    }) || [],
    datasets: [
      {
        data: analytics?.paymentAnalysis.map(item => item.count) || [],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(249, 115, 22, 0.8)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(234, 179, 8)',
          'rgb(239, 68, 68)',
          'rgb(249, 115, 22)',
        ],
        borderWidth: 2,
      },
    ],
  }), [analytics?.paymentAnalysis]);

  const propertyTypeData = useMemo(() => ({
    labels: analytics?.propertyTypeData.map(item => {
      const typeLabels: Record<string, string> = {
        apartment: 'Apartamento',
        house: 'Casa',
        commercial: 'Comercial',
        land: 'Terreno'
      };
      return typeLabels[item.property_type] || item.property_type;
    }) || [],
    datasets: [
      {
        label: 'Propriedades',
        data: analytics?.propertyTypeData.map(item => item.property_count) || [],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
      },
    ],
  }), [analytics?.propertyTypeData]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '€' + value.toLocaleString('pt-PT');
          }
        }
      }
    },
  }), []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-64"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-xl p-6 h-32"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-xl p-6 h-64"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Erro</h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={loadAnalytics}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  const occupancyRate = analytics.portfolioOverview.total_properties > 0
    ? (analytics.portfolioOverview.active_tenants / analytics.portfolioOverview.total_properties * 100)
    : 0;

  const avgYield = analytics.roiAnalysis.length > 0
    ? analytics.roiAnalysis.reduce((sum, prop) => sum + prop.gross_yield_percentage, 0) / analytics.roiAnalysis.length
    : 0;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Análises Avançadas</h1>
        <div className="flex space-x-2">
          {[
            { value: "3months", label: "3 Meses" },
            { value: "6months", label: "6 Meses" },
            { value: "12months", label: "12 Meses" }
          ].map(option => (
            <button
              key={option.value}
              onClick={() => setPeriod(option.value)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition ${
                period === option.value
                  ? "bg-brand-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{analytics.portfolioOverview.total_properties}</p>
          <p className="text-sm text-gray-500">Total de Imóveis</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-green-50 text-green-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            €{analytics.portfolioOverview.total_monthly_income.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-gray-500">Rendimento Mensal</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-yellow-50 text-yellow-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{occupancyRate.toFixed(1)}%</p>
          <p className="text-sm text-gray-500">Taxa de Ocupação</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{avgYield.toFixed(2)}%</p>
          <p className="text-sm text-gray-500">Rentabilidade Bruta Média</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Income History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Evolução do Rendimento</h2>
          {analytics.incomeHistory.length > 0 ? (
            <Suspense fallback={<ChartSkeleton />}>
              <LazyLineChart data={incomeChartData} options={chartOptions} />
            </Suspense>
          ) : (
            <p className="text-center text-gray-500 py-8">Sem dados de rendimento para o período selecionado</p>
          )}
        </div>

        {/* Payment Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Estado dos Pagamentos</h2>
          {analytics.paymentAnalysis.length > 0 ? (
            <Suspense fallback={<ChartSkeleton />}>
              <LazyDoughnutChart data={paymentStatusData} />
            </Suspense>
          ) : (
            <p className="text-center text-gray-500 py-8">Sem dados de pagamentos</p>
          )}
        </div>

        {/* Property Types */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Distribuição por Tipo</h2>
          {analytics.propertyTypeData.length > 0 ? (
            <Suspense fallback={<ChartSkeleton />}>
              <LazyBarChart data={propertyTypeData} options={chartOptions} />
            </Suspense>
          ) : (
            <p className="text-center text-gray-500 py-8">Sem dados de propriedades</p>
          )}
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Distribuição Geográfica</h2>
          <div className="space-y-3">
            {analytics.geographicData.slice(0, 5).map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{item.municipality}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{item.property_count} imóveis</span>
                  <span className="text-sm font-semibold text-gray-900">
                    €{item.monthly_income.toLocaleString('pt-PT')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Property Performance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Performance por Imóvel</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imóvel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rendimento Mensal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Cobrado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taxa de Sucesso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {analytics.propertyPerformance.slice(0, 10).map((property) => (
                <tr key={property.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{property.address}</p>
                      <p className="text-xs text-gray-500">{property.typology}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {property.property_type === 'apartment' ? 'Apartamento' :
                     property.property_type === 'house' ? 'Casa' :
                     property.property_type === 'commercial' ? 'Comercial' : 'Terreno'}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    €{property.monthly_income.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    €{property.total_collected.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      property.payment_success_rate >= 90
                        ? 'bg-green-100 text-green-700'
                        : property.payment_success_rate >= 70
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {property.payment_success_rate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ROI Analysis */}
      {analytics.roiAnalysis.length > 0 && (
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Análise de Rentabilidade (ROI)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imóvel</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Fiscal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rendimento Anual</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rentabilidade Bruta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {analytics.roiAnalysis.slice(0, 10).map((property, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{property.address}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      €{property.fiscal_value.toLocaleString('pt-PT')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      €{property.annual_rental_income.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        property.gross_yield_percentage >= 8
                          ? 'bg-green-100 text-green-700'
                          : property.gross_yield_percentage >= 5
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {property.gross_yield_percentage}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}