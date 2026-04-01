"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Property {
  id: string;
  address: string;
  city: string | null;
  municipality: string | null;
}

interface Tenant {
  id: string;
  property_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  nif: string | null;
  rent_amount: number;
  property_address: string;
}

interface Receipt {
  id: string;
  tenant_id: string;
  property_id: string;
  tenant_name: string;
  property_address: string;
  amount: number;
  period_month: number;
  period_year: number;
  receipt_number: string;
  issue_date: string;
  created_at: string;
}

const monthNames = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export default function ReceiptsPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [form, setForm] = useState({
    tenant_id: "",
    amount: "",
    period_month: new Date().getMonth() + 1,
    period_year: new Date().getFullYear(),
    issue_date: new Date().toISOString().split('T')[0],
    receipt_number: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [propsRes, tenantsRes, receiptsRes] = await Promise.all([
        fetch("/api/properties"),
        fetch("/api/tenants"),
        fetch("/api/receipts"),
      ]);

      const propsData = await propsRes.json();
      const tenantsData = await tenantsRes.json();
      const receiptsData = await receiptsRes.json();

      if (propsData.ok) {
        setProperties(propsData.data);
      }
      if (tenantsData.ok) {
        setTenants(tenantsData.data.filter((t: any) => t.status === 'active'));
      }
      if (receiptsData.ok) {
        setReceipts(receiptsData.data);
      }
    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm({
      tenant_id: "",
      amount: "",
      period_month: new Date().getMonth() + 1,
      period_year: new Date().getFullYear(),
      issue_date: new Date().toISOString().split('T')[0],
      receipt_number: "",
    });
    setShowForm(false);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setGenerating(true);

    try {
      const tenant = tenants.find(t => t.id === form.tenant_id);
      if (!tenant) {
        setError("Inquilino não encontrado");
        setGenerating(false);
        return;
      }

      const payload = {
        tenant_id: form.tenant_id,
        property_id: tenant.property_id,
        amount: parseFloat(form.amount) || tenant.rent_amount,
        period_month: form.period_month,
        period_year: form.period_year,
        issue_date: form.issue_date,
        receipt_number: form.receipt_number || undefined,
      };

      const res = await fetch("/api/receipts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.ok) {
        setError(data.error || "Erro ao gerar recibo");
        setGenerating(false);
        return;
      }

      // Open receipt in new tab
      const receiptId = data.data.id;
      window.open(`/dashboard/receipts/${receiptId}`, '_blank');

      // Reset form and reload
      resetForm();
      setGenerating(false);
      loadData();
    } catch {
      setError("Erro de ligação. Tente novamente.");
      setGenerating(false);
    }
  }

  const selectedTenant = tenants.find(t => t.id === form.tenant_id);

  // Auto-fill amount when tenant is selected
  useEffect(() => {
    if (selectedTenant && !form.amount) {
      setForm(prev => ({
        ...prev,
        amount: selectedTenant.rent_amount.toString()
      }));
    }
  }, [selectedTenant, form.amount]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 h-24"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Recibos de Renda</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
          disabled={tenants.length === 0}
        >
          {showForm ? "Cancelar" : "+ Gerar Recibo"}
        </button>
      </div>

      {/* Generate receipt form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Gerar Novo Recibo</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Inquilino *
                </label>
                <select
                  required
                  value={form.tenant_id}
                  onChange={(e) => setForm({ ...form, tenant_id: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecionar inquilino</option>
                  {tenants.map((tenant) => (
                    <option key={tenant.id} value={tenant.id}>
                      {tenant.name} - {tenant.property_address}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Valor (€) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  placeholder="Valor da renda"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mês *
                </label>
                <select
                  value={form.period_month}
                  onChange={(e) => setForm({ ...form, period_month: parseInt(e.target.value) })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {monthNames.map((month, index) => (
                    <option key={index + 1} value={index + 1}>{month}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ano *
                </label>
                <input
                  type="number"
                  required
                  min="2020"
                  max="2030"
                  value={form.period_year}
                  onChange={(e) => setForm({ ...form, period_year: parseInt(e.target.value) })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Emissão *
                </label>
                <input
                  type="date"
                  required
                  value={form.issue_date}
                  onChange={(e) => setForm({ ...form, issue_date: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número do Recibo (opcional)
                </label>
                <input
                  type="text"
                  value={form.receipt_number}
                  onChange={(e) => setForm({ ...form, receipt_number: e.target.value })}
                  placeholder="Gerado automaticamente se vazio"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {selectedTenant && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Detalhes do Inquilino</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Nome:</strong> {selectedTenant.name}</p>
                  <p><strong>Imóvel:</strong> {selectedTenant.property_address}</p>
                  <p><strong>Renda Mensal:</strong> €{selectedTenant.rent_amount.toFixed(2)}</p>
                  {selectedTenant.nif && <p><strong>NIF:</strong> {selectedTenant.nif}</p>}
                  {selectedTenant.email && <p><strong>Email:</strong> {selectedTenant.email}</p>}
                </div>
              </div>
            )}

            {error && (
              <div className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={generating}
                className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {generating ? "A gerar..." : "Gerar Recibo"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Empty state for no tenants */}
      {tenants.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-16 text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Sem inquilinos ativos</h3>
          <p className="text-gray-500 mb-6">Para gerar recibos, primeiro precisa de adicionar inquilinos aos seus imóveis.</p>
          <Link
            href="/dashboard/properties"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Gerir Imóveis
          </Link>
        </div>
      )}

      {/* Receipts history */}
      {tenants.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Histórico de Recibos</h2>
          </div>

          {receipts.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">Ainda não foram gerados recibos.</p>
              <p className="text-sm text-gray-400 mt-1">
                Use o botão "Gerar Recibo" para criar o primeiro recibo.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {receipts.map((receipt) => (
                <div key={receipt.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Recibo #{receipt.receipt_number}
                    </p>
                    <p className="text-xs text-gray-500">
                      {receipt.tenant_name} • {receipt.property_address}
                    </p>
                    <p className="text-xs text-gray-500">
                      {monthNames[receipt.period_month - 1]} {receipt.period_year} •
                      Emitido em {new Date(receipt.issue_date).toLocaleDateString('pt-PT')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-semibold text-gray-900">
                      €{receipt.amount.toFixed(2)}
                    </span>
                    <Link
                      href={`/dashboard/receipts/${receipt.id}`}
                      target="_blank"
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Ver recibo"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}