"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Property {
  id: string;
  address: string;
  city: string | null;
  municipality: string | null;
  property_type: string;
  typology: string | null;
  area_m2: number | null;
  fiscal_value: number | null;
  status: string;
  active_tenants: number;
  monthly_income: number;
}

interface Tenant {
  id: string;
  property_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  nif: string | null;
  contract_start: string;
  contract_end: string | null;
  contract_type: string;
  rent_amount: number;
  payment_day: number;
  deposit_amount: number | null;
  status: string;
  created_at: string;
}

const contractTypeLabels: Record<string, string> = {
  residential: "Habitação",
  commercial: "Comercial",
  student: "Estudante",
  temporary: "Temporário",
};

const statusLabels: Record<string, { text: string; color: string }> = {
  active: { text: "Ativo", color: "bg-green-100 text-green-700" },
  inactive: { text: "Inativo", color: "bg-gray-100 text-gray-700" },
  terminated: { text: "Terminado", color: "bg-red-100 text-red-700" },
};

export default function PropertyTenantsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [property, setProperty] = useState<Property | null>(null);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);
  const [deletingTenant, setDeletingTenant] = useState<Tenant | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    nif: "",
    contract_start: "",
    contract_end: "",
    contract_type: "residential",
    rent_amount: "",
    payment_day: "1",
    deposit_amount: "",
    status: "active",
  });

  useEffect(() => {
    async function loadParams() {
      const resolvedParams = await params;
      setPropertyId(resolvedParams.id);
    }
    loadParams();
  }, [params]);

  useEffect(() => {
    if (propertyId) {
      loadProperty();
      loadTenants();
    }
  }, [propertyId]);

  async function loadProperty() {
    try {
      const res = await fetch("/api/properties");
      const data = await res.json();
      if (data.ok) {
        const prop = data.data.find((p: Property) => p.id === propertyId);
        if (!prop) {
          router.push("/dashboard/properties");
          return;
        }
        setProperty(prop);
      }
    } catch (err) {
      console.error("Error loading property:", err);
    }
  }

  async function loadTenants() {
    try {
      const res = await fetch(`/api/tenants?property_id=${propertyId}`);
      const data = await res.json();
      if (data.ok) {
        setTenants(data.data);
      }
    } catch (err) {
      console.error("Error loading tenants:", err);
    } finally {
      setLoading(false);
    }
  }

  function startEdit(tenant: Tenant) {
    setEditingTenant(tenant);
    setForm({
      name: tenant.name,
      email: tenant.email || "",
      phone: tenant.phone || "",
      nif: tenant.nif || "",
      contract_start: tenant.contract_start,
      contract_end: tenant.contract_end || "",
      contract_type: tenant.contract_type,
      rent_amount: tenant.rent_amount.toString(),
      payment_day: tenant.payment_day.toString(),
      deposit_amount: tenant.deposit_amount?.toString() || "",
      status: tenant.status,
    });
    setShowForm(true);
    setError("");
  }

  function resetForm() {
    setForm({
      name: "",
      email: "",
      phone: "",
      nif: "",
      contract_start: "",
      contract_end: "",
      contract_type: "residential",
      rent_amount: "",
      payment_day: "1",
      deposit_amount: "",
      status: "active",
    });
    setEditingTenant(null);
    setShowForm(false);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const isEditing = !!editingTenant;
      const method = isEditing ? "PUT" : "POST";
      const payload = {
        ...(isEditing && { id: editingTenant.id }),
        property_id: propertyId,
        name: form.name,
        email: form.email || undefined,
        phone: form.phone || undefined,
        nif: form.nif || undefined,
        contract_start: form.contract_start,
        contract_end: form.contract_end || undefined,
        contract_type: form.contract_type,
        rent_amount: Number(form.rent_amount),
        payment_day: Number(form.payment_day),
        deposit_amount: form.deposit_amount ? Number(form.deposit_amount) : undefined,
        status: form.status,
      };

      const res = await fetch("/api/tenants", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.ok) {
        setError(data.error || `Erro ao ${isEditing ? "atualizar" : "criar"} inquilino`);
        setSaving(false);
        return;
      }

      // Reset form and reload
      resetForm();
      setSaving(false);
      loadTenants();
      loadProperty(); // Reload to update property stats
    } catch {
      setError("Erro de ligação. Tente novamente.");
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deletingTenant) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/tenants?id=${deletingTenant.id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!data.ok) {
        setError(data.error || "Erro ao eliminar inquilino");
        return;
      }

      // Reload tenants and close modal
      loadTenants();
      loadProperty(); // Reload to update property stats
      setDeletingTenant(null);
    } catch {
      setError("Erro de ligação. Tente novamente.");
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-64"></div>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 h-32"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Imóvel não encontrado</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <button
            onClick={() => router.push("/dashboard/properties")}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Inquilinos</h1>
            <p className="text-gray-600">{property.address}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="text-sm">
              <span className="text-gray-500">Inquilinos Ativos:</span>
              <span className="ml-1 font-semibold text-gray-900">{property.active_tenants}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Rendimento Mensal:</span>
              <span className="ml-1 font-semibold text-gray-900">
                €{property.monthly_income.toLocaleString("pt-PT", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
          >
            {showForm ? "Cancelar" : "+ Adicionar Inquilino"}
          </button>
        </div>
      </div>

      {/* Add tenant form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            {editingTenant ? "Editar Inquilino" : "Novo Inquilino"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nome completo do inquilino"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="email@exemplo.com"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="912 345 678"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  NIF
                </label>
                <input
                  type="text"
                  value={form.nif}
                  onChange={(e) => setForm({ ...form, nif: e.target.value })}
                  placeholder="123456789"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Início do Contrato *
                </label>
                <input
                  type="date"
                  required
                  value={form.contract_start}
                  onChange={(e) => setForm({ ...form, contract_start: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fim do Contrato
                </label>
                <input
                  type="date"
                  value={form.contract_end}
                  onChange={(e) => setForm({ ...form, contract_end: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Contrato
                </label>
                <select
                  value={form.contract_type}
                  onChange={(e) => setForm({ ...form, contract_type: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="residential">Habitação</option>
                  <option value="commercial">Comercial</option>
                  <option value="student">Estudante</option>
                  <option value="temporary">Temporário</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Valor da Renda *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={form.rent_amount}
                  onChange={(e) => setForm({ ...form, rent_amount: e.target.value })}
                  placeholder="750.00"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dia de Pagamento
                </label>
                <select
                  value={form.payment_day}
                  onChange={(e) => setForm({ ...form, payment_day: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <option key={day} value={day}>Dia {day}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Caução
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={form.deposit_amount}
                  onChange={(e) => setForm({ ...form, deposit_amount: e.target.value })}
                  placeholder="750.00"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                  <option value="terminated">Terminado</option>
                </select>
              </div>
            </div>

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
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {saving
                  ? (editingTenant ? "A atualizar..." : "A guardar...")
                  : (editingTenant ? "Atualizar Inquilino" : "Guardar Inquilino")
                }
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tenants list */}
      {tenants.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-16 text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Sem inquilinos registados</h3>
          <p className="text-gray-500 mb-6">Adicione o primeiro inquilino deste imóvel.</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            + Adicionar Primeiro Inquilino
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {tenants.map((tenant) => {
            const st = statusLabels[tenant.status] || { text: tenant.status, color: "bg-gray-100 text-gray-700" };
            return (
              <div
                key={tenant.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {tenant.name}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${st.color}`}>
                        {st.text}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        {tenant.email && <div>📧 {tenant.email}</div>}
                        {tenant.phone && <div>📱 {tenant.phone}</div>}
                        {tenant.nif && <div>🆔 NIF: {tenant.nif}</div>}
                      </div>
                      <div>
                        <div>📋 {contractTypeLabels[tenant.contract_type] || tenant.contract_type}</div>
                        <div>📅 Início: {new Date(tenant.contract_start).toLocaleDateString("pt-PT")}</div>
                        {tenant.contract_end && (
                          <div>📅 Fim: {new Date(tenant.contract_end).toLocaleDateString("pt-PT")}</div>
                        )}
                        <div>📆 Pagamento no dia {tenant.payment_day}</div>
                        {tenant.deposit_amount && (
                          <div>💰 Caução: €{tenant.deposit_amount.toLocaleString("pt-PT", { minimumFractionDigits: 2 })}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 ml-6">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        €{tenant.rent_amount.toLocaleString("pt-PT", { minimumFractionDigits: 2 })}
                        <span className="text-base font-normal text-gray-500">/mês</span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => startEdit(tenant)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Editar inquilino"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setDeletingTenant(tenant)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Eliminar inquilino"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete confirmation modal */}
      {deletingTenant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Eliminar Inquilino</h3>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Tem a certeza que pretende eliminar <strong>{deletingTenant.name}</strong>?
              Esta ação não pode ser desfeita.
            </p>
            {error && (
              <div className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setDeletingTenant(null);
                  setError("");
                }}
                disabled={deleting}
                className="px-4 py-2 text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition disabled:opacity-50"
              >
                {deleting ? "A eliminar..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}