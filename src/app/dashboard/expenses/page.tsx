"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Property {
  id: string;
  address: string;
}

interface Expense {
  id: string;
  property_id: string;
  property_address: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  deductible: boolean;
  receipt_url?: string;
  created_at: string;
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

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  // Filters
  const [filterProperty, setFilterProperty] = useState("");
  const [filterYear, setFilterYear] = useState(new Date().getFullYear().toString());
  const [filterCategory, setFilterCategory] = useState("");

  // Form data
  const [formData, setFormData] = useState({
    property_id: "",
    category: "maintenance",
    description: "",
    amount: "",
    date: new Date().toISOString().split('T')[0],
    deductible: true,
    receipt_url: ""
  });

  const currentYear = new Date().getFullYear();
  const availableYears = Array.from(
    { length: currentYear - 2019 },
    (_, i) => currentYear - i
  );

  useEffect(() => {
    loadData();
  }, [filterProperty, filterYear, filterCategory]);

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    try {
      const res = await fetch("/api/properties");
      const data = await res.json();
      if (data.ok) {
        setProperties(data.data || []);
      }
    } catch (error) {
      console.error("Error loading properties:", error);
    }
  }

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      if (filterProperty) params.append("property_id", filterProperty);
      if (filterYear) params.append("year", filterYear);
      if (filterCategory) params.append("category", filterCategory);

      const res = await fetch(`/api/expenses?${params.toString()}`);
      const data = await res.json();

      if (data.ok) {
        setExpenses(data.data || []);
      } else {
        setError(data.error || "Erro ao carregar despesas");
      }
    } catch {
      setError("Erro de ligação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const url = editingExpense ? `/api/expenses/${editingExpense.id}` : "/api/expenses";
      const method = editingExpense ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount)
        })
      });

      const data = await res.json();

      if (data.ok) {
        setShowForm(false);
        setEditingExpense(null);
        resetForm();
        await loadData();
      } else {
        setError(data.error || "Erro ao guardar despesa");
      }
    } catch {
      setError("Erro de ligação. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(expense: Expense) {
    if (!confirm(`Tem certeza que deseja eliminar a despesa "${expense.description || expense.category}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/expenses/${expense.id}`, {
        method: "DELETE"
      });

      const data = await res.json();

      if (data.ok) {
        await loadData();
      } else {
        setError(data.error || "Erro ao eliminar despesa");
      }
    } catch {
      setError("Erro de ligação. Tente novamente.");
    }
  }

  function handleEdit(expense: Expense) {
    setEditingExpense(expense);
    setFormData({
      property_id: expense.property_id,
      category: expense.category,
      description: expense.description || "",
      amount: expense.amount.toString(),
      date: expense.date.split('T')[0],
      deductible: expense.deductible,
      receipt_url: expense.receipt_url || ""
    });
    setShowForm(true);
  }

  function resetForm() {
    setFormData({
      property_id: "",
      category: "maintenance",
      description: "",
      amount: "",
      date: new Date().toISOString().split('T')[0],
      deductible: true,
      receipt_url: ""
    });
    setEditingExpense(null);
  }

  function cancelForm() {
    setShowForm(false);
    resetForm();
    setError("");
  }

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const deductibleExpenses = expenses.filter(exp => exp.deductible).reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Despesas</h1>
          <p className="text-sm text-gray-600">Gerir despesas dedutíveis dos seus imóveis</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="px-4 py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nova Despesa
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Imóvel</label>
            <select
              value={filterProperty}
              onChange={(e) => setFilterProperty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
            >
              <option value="">Todos os imóveis</option>
              {properties.map(property => (
                <option key={property.id} value={property.id}>
                  {property.address}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ano</label>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
            >
              <option value="">Todos os anos</option>
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
            >
              <option value="">Todas as categorias</option>
              {Object.entries(expenseCategories).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setFilterProperty("");
                setFilterYear(currentYear.toString());
                setFilterCategory("");
              }}
              className="w-full px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition"
            >
              Limpar filtros
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Despesas</h3>
          <p className="text-3xl font-bold text-gray-900">€{totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Despesas Dedutíveis</h3>
          <p className="text-3xl font-bold text-green-600">€{deductibleExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Número de Despesas</h3>
          <p className="text-3xl font-bold text-brand-600">{expenses.length}</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingExpense ? "Editar Despesa" : "Nova Despesa"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Imóvel <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.property_id}
                    onChange={(e) => setFormData({...formData, property_id: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  >
                    <option value="">Selecionar imóvel</option>
                    {properties.map(property => (
                      <option key={property.id} value={property.id}>
                        {property.address}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoria <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  >
                    {Object.entries(expenseCategories).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Montante <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    required
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Opcional - descrição da despesa"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL do Comprovativo</label>
                <input
                  type="url"
                  value={formData.receipt_url}
                  onChange={(e) => setFormData({...formData, receipt_url: e.target.value})}
                  placeholder="https://... (opcional)"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="deductible"
                  checked={formData.deductible}
                  onChange={(e) => setFormData({...formData, deductible: e.target.checked})}
                  className="w-4 h-4 text-brand-600 bg-gray-100 border-gray-300 rounded focus:ring-brand-500"
                />
                <label htmlFor="deductible" className="ml-2 text-sm text-gray-700">
                  Despesa dedutível para efeitos fiscais
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={cancelForm}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition disabled:opacity-50"
                >
                  {submitting ? "A guardar..." : editingExpense ? "Atualizar" : "Criar Despesa"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Expenses List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Lista de Despesas</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-500 mt-2">A carregar despesas...</p>
          </div>
        ) : expenses.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma despesa encontrada</h3>
            <p className="text-gray-500 mb-4">
              {filterProperty || filterYear || filterCategory
                ? "Não há despesas que correspondam aos filtros aplicados."
                : "Comece por adicionar as primeiras despesas dos seus imóveis."
              }
            </p>
            {!properties.length ? (
              <Link
                href="/dashboard/properties"
                className="inline-flex items-center px-4 py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition"
              >
                Adicionar Imóveis
              </Link>
            ) : (
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="inline-flex items-center px-4 py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nova Despesa
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {expenses.map((expense) => (
              <div key={expense.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-sm font-medium text-gray-900">
                        {expenseCategories[expense.category as keyof typeof expenseCategories] || expense.category}
                      </h3>
                      {expense.deductible && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                          Dedutível
                        </span>
                      )}
                    </div>

                    {expense.description && (
                      <p className="text-sm text-gray-600 mb-1">{expense.description}</p>
                    )}

                    <p className="text-sm text-gray-500">
                      {expense.property_address} • {new Date(expense.date).toLocaleDateString('pt-PT')}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">€{expense.amount.toFixed(2)}</p>
                      {expense.receipt_url && (
                        <a
                          href={expense.receipt_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-brand-600 hover:text-brand-700"
                        >
                          Ver comprovativo
                        </a>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(expense)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition"
                        title="Editar despesa"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(expense)}
                        className="p-2 text-gray-400 hover:text-red-600 transition"
                        title="Eliminar despesa"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {expenses.length > 0 && (
        <div className="mt-6 bg-brand-50 border border-brand-200 rounded-xl p-4">
          <p className="text-sm text-brand-800">
            <strong>Dica:</strong> Utilize os <Link href="/dashboard/tax-reports" className="underline hover:no-underline">relatórios fiscais</Link> para exportar estas despesas formatadas para o Portal das Finanças.
          </p>
        </div>
      )}
    </div>
  );
}