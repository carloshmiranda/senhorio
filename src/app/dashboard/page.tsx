"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface DashboardStats {
  totalProperties: number;
  activetenants: number;
  monthlyIncome: number;
  pendingPayments: number;
  overduePayments: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 0,
    activetenants: 0,
    monthlyIncome: 0,
    pendingPayments: 0,
    overduePayments: 0,
  });
  const [recentPayments, setRecentPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [propsRes, paymentsRes] = await Promise.all([
          fetch("/api/properties"),
          fetch("/api/payments"),
        ]);

        const propsData = await propsRes.json();
        const paymentsData = await paymentsRes.json();

        if (propsData.ok && propsData.data) {
          const properties = propsData.data;
          const totalProperties = properties.length;
          const activetenants = properties.reduce(
            (sum: number, p: any) => sum + Number(p.active_tenants || 0),
            0
          );
          const monthlyIncome = properties.reduce(
            (sum: number, p: any) => sum + Number(p.monthly_income || 0),
            0
          );

          setStats((prev) => ({
            ...prev,
            totalProperties,
            activetenants,
            monthlyIncome,
          }));
        }

        if (paymentsData.ok && paymentsData.data) {
          const payments = paymentsData.data;
          const pendingPayments = payments.filter((p: any) => p.status === "pending").length;
          const overduePayments = payments.filter((p: any) => p.status === "overdue").length;

          setStats((prev) => ({
            ...prev,
            pendingPayments,
            overduePayments,
          }));

          setRecentPayments(payments.slice(0, 5));
        }
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const cards = [
    {
      label: "Imóveis",
      value: stats.totalProperties,
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      color: "blue",
      href: "/dashboard/properties",
    },
    {
      label: "Receita Mensal",
      value: `€${stats.monthlyIncome.toLocaleString("pt-PT", { minimumFractionDigits: 2 })}`,
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "green",
      href: "/dashboard/payments",
    },
    {
      label: "Pagamentos Pendentes",
      value: stats.pendingPayments,
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "yellow",
      href: "/dashboard/payments",
    },
    {
      label: "Pagamentos em Atraso",
      value: stats.overduePayments,
      icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",
      color: "red",
      href: "/dashboard/payments",
    },
  ];

  const colorMap: Record<string, string> = {
    blue: "bg-brand-50 text-brand-600",
    green: "bg-green-50 text-green-600",
    yellow: "bg-yellow-50 text-yellow-600",
    red: "bg-red-50 text-red-600",
  };

  const statusLabels: Record<string, { text: string; color: string }> = {
    paid: { text: "Pago", color: "bg-green-100 text-green-700" },
    pending: { text: "Pendente", color: "bg-yellow-100 text-yellow-700" },
    overdue: { text: "Em atraso", color: "bg-red-100 text-red-700" },
    partial: { text: "Parcial", color: "bg-orange-100 text-orange-700" },
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 h-28"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Painel de Gestão</h1>
          <p className="text-gray-600 mt-1">Gerir o seu portfólio de arrendamento</p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/dashboard/tax-reports"
            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition"
          >
            📊 Relatórios Fiscais
          </Link>
          <Link
            href="/dashboard/properties"
            className="px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 transition"
          >
            + Adicionar Imóvel
          </Link>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${colorMap[card.color]}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            <p className="text-sm text-gray-500 mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>

        {/* Overdue payments alert */}
        {stats.overduePayments > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-red-900">
                  {stats.overduePayments} pagamento{stats.overduePayments !== 1 ? 's' : ''} em atraso
                </p>
                <p className="text-sm text-red-700">Necessita atenção imediata</p>
              </div>
              <Link
                href="/dashboard/payments"
                className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition"
              >
                Ver
              </Link>
            </div>
          </div>
        )}

        {/* Action buttons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/dashboard/properties"
          className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-xl p-4 flex items-center space-x-3 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <div className="p-2 bg-white/20 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div>
            <p className="font-medium">Novo Imóvel</p>
            <p className="text-xs text-white/80">Adicionar propriedade</p>
          </div>
        </Link>

        <Link
          href="/dashboard/receipts"
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl p-4 flex items-center space-x-3 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <div className="p-2 bg-white/20 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p className="font-medium">Gerar Recibo</p>
            <p className="text-xs text-white/80">Recibo de renda</p>
          </div>
        </Link>

        <Link
          href="/dashboard/analytics"
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl p-4 flex items-center space-x-3 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <div className="p-2 bg-white/20 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <p className="font-medium">Analytics</p>
            <p className="text-xs text-white/80">Ver relatórios</p>
          </div>
        </Link>

        <Link
          href="/dashboard/expenses"
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl p-4 flex items-center space-x-3 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <div className="p-2 bg-white/20 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="font-medium">Despesas</p>
            <p className="text-xs text-white/80">Gerir custos</p>
          </div>
        </Link>
        </div>
      </div>

      {/* Recent payments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Pagamentos Recentes</h2>
          <Link href="/dashboard/payments" className="text-sm text-brand-600 font-medium hover:text-brand-700">
            Ver todos
          </Link>
        </div>

        {recentPayments.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500">Ainda não existem pagamentos registados.</p>
            <p className="text-sm text-gray-400 mt-1">
              Adicione imóveis e inquilinos para começar a registar pagamentos.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentPayments.map((payment: any) => {
              const st = statusLabels[payment.status] || { text: payment.status, color: "bg-gray-100 text-gray-700" };
              return (
                <div key={payment.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{payment.tenant_name}</p>
                    <p className="text-xs text-gray-500">{payment.property_address}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-semibold text-gray-900">
                      €{Number(payment.amount).toLocaleString("pt-PT", { minimumFractionDigits: 2 })}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${st.color}`}>
                      {st.text}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick start guide for empty state */}
      {stats.totalProperties === 0 && (
        <div className="mt-8 bg-brand-50 border border-brand-200 rounded-xl p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Como começar</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-medium text-gray-900">Adicione um imóvel</p>
                <p className="text-sm text-gray-600 mt-1">Registe a morada, tipologia e dados fiscais do seu imóvel.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-medium text-gray-900">Adicione inquilinos</p>
                <p className="text-sm text-gray-600 mt-1">Associe inquilinos ao imóvel com os dados do contrato.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-medium text-gray-900">Registe pagamentos</p>
                <p className="text-sm text-gray-600 mt-1">Acompanhe rendas recebidas e gere recibos automaticamente.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
