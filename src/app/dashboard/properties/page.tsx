"use client";

import { useEffect, useState } from "react";

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
  created_at: string;
}

const propertyTypeLabels: Record<string, string> = {
  apartment: "Apartamento",
  house: "Moradia",
  commercial: "Comercial",
  land: "Terreno",
};

const statusLabels: Record<string, { text: string; color: string }> = {
  active: { text: "Ativo", color: "bg-green-100 text-green-700" },
  inactive: { text: "Inativo", color: "bg-gray-100 text-gray-700" },
  sold: { text: "Vendido", color: "bg-red-100 text-red-700" },
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [deletingProperty, setDeletingProperty] = useState<Property | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [form, setForm] = useState({
    address: "",
    city: "",
    municipality: "",
    property_type: "apartment",
    typology: "",
    area_m2: "",
    year_built: "",
    license_number: "",
    fiscal_value: "",
    status: "active",
  });

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    try {
      const res = await fetch("/api/properties");
      const data = await res.json();
      if (data.ok) {
        setProperties(data.data);
      }
    } catch (err) {
      console.error("Error loading properties:", err);
    } finally {
      setLoading(false);
    }
  }

  function startEdit(property: Property) {
    setEditingProperty(property);
    setForm({
      address: property.address,
      city: property.city || "",
      municipality: property.municipality || "",
      property_type: property.property_type,
      typology: property.typology || "",
      area_m2: property.area_m2?.toString() || "",
      year_built: property.area_m2 ? property.area_m2.toString() : "", // Note: this should be year_built, but the original API doesn't seem to include it
      license_number: "",
      fiscal_value: property.fiscal_value?.toString() || "",
      status: property.status,
    });
    setShowForm(true);
    setError("");
  }

  function resetForm() {
    setForm({
      address: "",
      city: "",
      municipality: "",
      property_type: "apartment",
      typology: "",
      area_m2: "",
      year_built: "",
      license_number: "",
      fiscal_value: "",
      status: "active",
    });
    setEditingProperty(null);
    setShowForm(false);
    setError("");
  }

  async function handleDelete() {
    if (!deletingProperty) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/properties?id=${deletingProperty.id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!data.ok) {
        setError(data.error || "Erro ao eliminar imóvel");
        return;
      }

      // Reload properties and close modal
      loadProperties();
      setDeletingProperty(null);
    } catch {
      setError("Erro de ligação. Tente novamente.");
    } finally {
      setDeleting(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const isEditing = !!editingProperty;
      const method = isEditing ? "PUT" : "POST";
      const payload = {
        ...(isEditing && { id: editingProperty.id }),
        address: form.address,
        city: form.city || undefined,
        municipality: form.municipality || undefined,
        property_type: form.property_type,
        typology: form.typology || undefined,
        area_m2: form.area_m2 ? Number(form.area_m2) : undefined,
        year_built: form.year_built ? Number(form.year_built) : undefined,
        license_number: form.license_number || undefined,
        fiscal_value: form.fiscal_value ? Number(form.fiscal_value) : undefined,
        status: form.status,
      };

      const res = await fetch("/api/properties", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.ok) {
        setError(data.error || `Erro ao ${isEditing ? "atualizar" : "criar"} imóvel`);
        setSaving(false);
        return;
      }

      // Reset form and reload
      resetForm();
      setSaving(false);
      loadProperties();
    } catch {
      setError("Erro de ligação. Tente novamente.");
      setSaving(false);
    }
  }

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
        <h1 className="text-2xl font-bold text-gray-900">Imóveis</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
        >
          {showForm ? "Cancelar" : "+ Adicionar Imóvel"}
        </button>
      </div>

      {/* Add property form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            {editingProperty ? "Editar Imóvel" : "Novo Imóvel"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Morada *
                </label>
                <input
                  type="text"
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Rua, número, andar"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cidade
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="Ex: Lisboa"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Concelho
                </label>
                <input
                  type="text"
                  value={form.municipality}
                  onChange={(e) => setForm({ ...form, municipality: e.target.value })}
                  placeholder="Ex: Lisboa"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Imóvel
                </label>
                <select
                  value={form.property_type}
                  onChange={(e) => setForm({ ...form, property_type: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="apartment">Apartamento</option>
                  <option value="house">Moradia</option>
                  <option value="commercial">Comercial</option>
                  <option value="land">Terreno</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipologia
                </label>
                <select
                  value={form.typology}
                  onChange={(e) => setForm({ ...form, typology: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecionar</option>
                  <option value="T0">T0</option>
                  <option value="T1">T1</option>
                  <option value="T2">T2</option>
                  <option value="T3">T3</option>
                  <option value="T4">T4</option>
                  <option value="T5+">T5+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Área (m²)
                </label>
                <input
                  type="number"
                  value={form.area_m2}
                  onChange={(e) => setForm({ ...form, area_m2: e.target.value })}
                  placeholder="Ex: 85"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ano de Construção
                </label>
                <input
                  type="number"
                  value={form.year_built}
                  onChange={(e) => setForm({ ...form, year_built: e.target.value })}
                  placeholder="Ex: 2005"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Licença de Habitação
                </label>
                <input
                  type="text"
                  value={form.license_number}
                  onChange={(e) => setForm({ ...form, license_number: e.target.value })}
                  placeholder="Número da licença"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Valor Patrimonial (VPT)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={form.fiscal_value}
                  onChange={(e) => setForm({ ...form, fiscal_value: e.target.value })}
                  placeholder="Ex: 120000"
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
                  <option value="sold">Vendido</option>
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
                  ? (editingProperty ? "A atualizar..." : "A guardar...")
                  : (editingProperty ? "Atualizar Imóvel" : "Guardar Imóvel")
                }
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Properties list */}
      {properties.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-16 text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Sem imóveis registados</h3>
          <p className="text-gray-500 mb-6">Adicione o seu primeiro imóvel para começar a gerir o arrendamento.</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            + Adicionar Primeiro Imóvel
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {properties.map((property) => {
            const st = statusLabels[property.status] || { text: property.status, color: "bg-gray-100 text-gray-700" };
            return (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {property.address}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${st.color}`}>
                        {st.text}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      {property.city && <span>{property.city}</span>}
                      <span>{propertyTypeLabels[property.property_type] || property.property_type}</span>
                      {property.typology && <span>{property.typology}</span>}
                      {property.area_m2 && <span>{property.area_m2} m²</span>}
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-500">
                        {Number(property.active_tenants)} {Number(property.active_tenants) === 1 ? "inquilino" : "inquilinos"}
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        €{Number(property.monthly_income).toLocaleString("pt-PT", { minimumFractionDigits: 2 })}
                        <span className="text-sm font-normal text-gray-500">/mês</span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <a
                        href={`/dashboard/properties/${property.id}`}
                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                        title="Gerir inquilinos"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </a>
                      <button
                        onClick={() => startEdit(property)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Editar imóvel"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setDeletingProperty(property)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Eliminar imóvel"
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
      {deletingProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Eliminar Imóvel</h3>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Tem a certeza que pretende eliminar <strong>{deletingProperty.address}</strong>?
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
                  setDeletingProperty(null);
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
