"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Payment {
  id: string;
  tenant_id: string;
  tenant_name: string;
  property_address: string;
  amount: number;
  due_date: string;
  paid_date?: string;
  payment_method?: string;
  status: "pending" | "paid" | "overdue" | "partial";
  notes?: string;
}

interface Tenant {
  id: string;
  name: string;
  property_address: string;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [tenantFilter, setTenantFilter] = useState<string>("");

  const [formData, setFormData] = useState({
    tenant_id: "",
    amount: "",
    due_date: "",
    paid_date: "",
    payment_method: "",
    status: "pending",
    notes: "",
  });

  useEffect(() => {
    loadData();
  }, [statusFilter, tenantFilter]);

  async function loadData() {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      if (tenantFilter) params.set("tenant_id", tenantFilter);

      const [paymentsRes, tenantsRes] = await Promise.all([
        fetch(`/api/payments?${params}`),
        fetch("/api/tenants"),
      ]);

      const paymentsData = await paymentsRes.json();
      const tenantsData = await tenantsRes.json();

      if (paymentsData.ok) setPayments(paymentsData.data || []);
      if (tenantsData.ok) setTenants(tenantsData.data || []);
    } catch (error) {
      console.error("Load error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const method = editingPayment ? "PUT" : "POST";
      const url = editingPayment ? `/api/payments/${editingPayment.id}` : "/api/payments";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.ok) {
        setShowAddForm(false);
        setEditingPayment(null);
        setFormData({
          tenant_id: "",
          amount: "",
          due_date: "",
          paid_date: "",
          payment_method: "",
          status: "pending",
          notes: "",
        });
        loadData();
      } else {
        alert(data.error || "Erro ao guardar pagamento");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Erro ao guardar pagamento");
    }
  }

  function startEdit(payment: Payment) {
    setEditingPayment(payment);
    setFormData({
      tenant_id: payment.tenant_id,
      amount: payment.amount.toString(),
      due_date: payment.due_date,
      paid_date: payment.paid_date || "",
      payment_method: payment.payment_method || "",
      status: payment.status,
      notes: payment.notes || "",
    });
    setShowAddForm(true);
  }

  function cancelEdit() {
    setShowAddForm(false);
    setEditingPayment(null);
    setFormData({
      tenant_id: "",
      amount: "",
      due_date: "",
      paid_date: "",
      payment_method: "",
      status: "pending",
      notes: "",
    });
  }

  const statusLabels: Record<string, { text: string; color: string }> = {
    paid: { text: "Pago", color: "bg-green-100 text-green-700" },
    pending: { text: "Pendente", color: "bg-yellow-100 text-yellow-700" },
    overdue: { text: "Em atraso", color: "bg-red-100 text-red-700" },
    partial: { text: "Parcial", color: "bg-orange-100 text-orange-700" },
  };

  const paymentMethods: Record<string, string> = {
    transfer: "Transferência",
    mbway: "MB WAY",
    cash: "Dinheiro",
    check: "Cheque",
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48"></div>
        <div className="bg-white rounded-xl p-6 h-96"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Pagamentos</h1>
          <p className="text-gray-600 mt-1">Acompanhe rendas e registe pagamentos</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition"
        >
          + Registar Pagamento
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
            >
              <option value="">Todos os estados</option>
              <option value="pending">Pendente</option>
              <option value="paid">Pago</option>
              <option value="overdue">Em atraso</option>
              <option value="partial">Parcial</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Inquilino</label>
            <select
              value={tenantFilter}
              onChange={(e) => setTenantFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
            >
              <option value="">Todos os inquilinos</option>
              {tenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name} - {tenant.property_address}
                </option>
              ))}
            </select>
          </div>
          {(statusFilter || tenantFilter) && (
            <div className="flex items-end">
              <button
                onClick={() => {
                  setStatusFilter("");
                  setTenantFilter("");
                }}
                className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingPayment ? "Editar Pagamento" : "Novo Pagamento"}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Inquilino *
              </label>
              <select
                value={formData.tenant_id}
                onChange={(e) => setFormData({ ...formData, tenant_id: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
              >
                <option value="">Selecione um inquilino</option>
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
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de Vencimento *
              </label>
              <input
                type="date"
                value={formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de Pagamento
              </label>
              <input
                type="date"
                value={formData.paid_date}
                onChange={(e) => setFormData({ ...formData, paid_date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
              >
                <option value="pending">Pendente</option>
                <option value="paid">Pago</option>
                <option value="overdue">Em atraso</option>
                <option value="partial">Parcial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Método de Pagamento
              </label>
              <select
                value={formData.payment_method}
                onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
              >
                <option value="">Selecione método</option>
                <option value="transfer">Transferência</option>
                <option value="mbway">MB WAY</option>
                <option value="cash">Dinheiro</option>
                <option value="check">Cheque</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                placeholder="Observações adicionais..."
              />
            </div>

            <div className="md:col-span-2 flex justify-end space-x-3">
              <button
                type="button"
                onClick={cancelEdit}
                className="px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700"
              >
                {editingPayment ? "Atualizar" : "Guardar"} Pagamento
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Payments List */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Pagamentos ({payments.length})
          </h2>
        </div>

        {payments.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500">Ainda não existem pagamentos registados.</p>
            <p className="text-sm text-gray-400 mt-1">
              Adicione pagamentos para começar a acompanhar as suas rendas.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {payments.map((payment) => {
              const status = statusLabels[payment.status] || {
                text: payment.status,
                color: "bg-gray-100 text-gray-700"
              };

              return (
                <div key={payment.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium text-gray-900">{payment.tenant_name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                          {status.text}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">{payment.property_address}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Vence: {new Date(payment.due_date).toLocaleDateString("pt-PT")}</span>
                        {payment.paid_date && (
                          <span>Pago: {new Date(payment.paid_date).toLocaleDateString("pt-PT")}</span>
                        )}
                        {payment.payment_method && (
                          <span>{paymentMethods[payment.payment_method] || payment.payment_method}</span>
                        )}
                      </div>
                      {payment.notes && (
                        <p className="text-xs text-gray-400 mt-1">{payment.notes}</p>
                      )}
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          €{payment.amount.toLocaleString("pt-PT", { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <button
                        onClick={() => startEdit(payment)}
                        className="text-brand-600 hover:text-brand-700 text-sm font-medium"
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick stats */}
      {payments.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-sm text-gray-500 mb-1">Total de Pagamentos</p>
            <p className="text-xl font-bold text-gray-900">{payments.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-sm text-gray-500 mb-1">Valor Total</p>
            <p className="text-xl font-bold text-gray-900">
              €{payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString("pt-PT", { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-sm text-gray-500 mb-1">Pagos</p>
            <p className="text-xl font-bold text-green-600">
              {payments.filter(p => p.status === "paid").length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-sm text-gray-500 mb-1">Em Atraso</p>
            <p className="text-xl font-bold text-red-600">
              {payments.filter(p => p.status === "overdue").length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}