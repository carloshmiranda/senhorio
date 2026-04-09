"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface BankingConnection {
  id: string;
  bank_name: string;
  account_name: string;
  account_iban: string;
  connection_status: 'pending' | 'active' | 'error' | 'disconnected';
  last_sync: string | null;
  auto_import_enabled: boolean;
  created_at: string;
}

interface ImportResult {
  transactions_imported: number;
  payments_matched: number;
  payments_created: number;
  message: string;
}

export default function BankingPage() {
  const [connections, setConnections] = useState<BankingConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [importResults, setImportResults] = useState<ImportResult | null>(null);

  const [newConnection, setNewConnection] = useState({
    bank_name: '',
    account_name: '',
    account_iban: '',
    bank_api_provider: 'open_banking'
  });

  useEffect(() => {
    loadConnections();
  }, []);

  async function loadConnections() {
    try {
      const response = await fetch("/api/banking/connections");
      const data = await response.json();
      if (data.ok) {
        setConnections(data.data);
      }
    } catch (error) {
      console.error("Error loading connections:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddConnection(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch("/api/banking/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConnection),
      });

      const data = await response.json();
      if (data.ok) {
        setConnections(prev => [data.data, ...prev]);
        setNewConnection({ bank_name: '', account_name: '', account_iban: '', bank_api_provider: 'open_banking' });
        setShowAddForm(false);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error adding connection:", error);
      alert("Erro ao adicionar ligação bancária");
    }
  }

  async function handleImportPayments(connectionId: string) {
    try {
      const response = await fetch("/api/banking/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          connection_id: connectionId,
          force_sync: true
        }),
      });

      const data = await response.json();
      if (data.ok) {
        setImportResults(data.data);
        loadConnections(); // Refresh to update last_sync time
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error importing payments:", error);
      alert("Erro na importação de pagamentos");
    }
  }

  async function handleDeleteConnection(connectionId: string) {
    if (!confirm("Tem a certeza que pretende remover esta ligação bancária?")) {
      return;
    }

    try {
      const response = await fetch(`/api/banking/connections/${connectionId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.ok) {
        setConnections(prev => prev.filter(c => c.id !== connectionId));
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error deleting connection:", error);
      alert("Erro ao remover ligação");
    }
  }

  const statusConfig = {
    pending: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-700' },
    active: { label: 'Ativa', color: 'bg-green-100 text-green-700' },
    error: { label: 'Erro', color: 'bg-red-100 text-red-700' },
    disconnected: { label: 'Desconectada', color: 'bg-gray-100 text-gray-700' },
  };

  const bankOptions = [
    'Millennium BCP',
    'Caixa Geral de Depósitos',
    'Santander',
    'BPI',
    'Novo Banco',
    'Crédito Agrícola',
    'Montepio',
    'Eurobic',
    'Outro'
  ];

  if (loading) {
    return <div className="animate-pulse space-y-4">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ligações Bancárias</h1>
          <p className="text-gray-600 mt-1">Configure a importação automática de pagamentos</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 transition"
        >
          + Adicionar Banco
        </button>
      </div>

      {/* Import Results Alert */}
      {importResults && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-medium text-green-900">Importação Concluída</p>
              <p className="text-sm text-green-700">{importResults.message}</p>
              <div className="text-xs text-green-600 mt-1">
                {importResults.transactions_imported} transações • {importResults.payments_matched} confirmados • {importResults.payments_created} para revisão
              </div>
            </div>
            <button
              onClick={() => setImportResults(null)}
              className="text-green-500 hover:text-green-700"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Add Connection Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Adicionar Ligação Bancária</h2>
          <form onSubmit={handleAddConnection} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banco
                </label>
                <select
                  value={newConnection.bank_name}
                  onChange={(e) => setNewConnection(prev => ({ ...prev, bank_name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500"
                  required
                >
                  <option value="">Selecionar banco</option>
                  {bankOptions.map(bank => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Conta
                </label>
                <input
                  type="text"
                  value={newConnection.account_name}
                  onChange={(e) => setNewConnection(prev => ({ ...prev, account_name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500"
                  placeholder="Ex: Conta à Ordem"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IBAN
              </label>
              <input
                type="text"
                value={newConnection.account_iban}
                onChange={(e) => setNewConnection(prev => ({ ...prev, account_iban: e.target.value.replace(/\s/g, '').toUpperCase() }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500"
                placeholder="PT50 0000 0000 0000 0000 0000 0"
                pattern="^PT\d{23}$"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Formato: PT50 seguido de 21 dígitos</p>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition"
              >
                Adicionar
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Connections List */}
      {connections.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg mb-2">Nenhuma ligação bancária configurada</p>
          <p className="text-sm text-gray-400 mb-6">
            Configure ligações bancárias para importar automaticamente os pagamentos de renda
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition"
          >
            Adicionar Primeira Ligação
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {connections.map((connection) => (
            <div key={connection.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{connection.bank_name}</h3>
                    <p className="text-sm text-gray-500">{connection.account_name}</p>
                    <p className="text-xs text-gray-400 font-mono">
                      {connection.account_iban.replace(/(.{4})/g, '$1 ').trim()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[connection.connection_status].color}`}>
                    {statusConfig[connection.connection_status].label}
                  </span>
                  {connection.connection_status === 'active' && (
                    <button
                      onClick={() => handleImportPayments(connection.id)}
                      className="px-3 py-1 bg-brand-600 text-white text-xs font-medium rounded-md hover:bg-brand-700 transition"
                    >
                      Sincronizar
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteConnection(connection.id)}
                    className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-md hover:bg-red-200 transition"
                  >
                    Remover
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Importação Automática:</span>
                  <p className="font-medium">
                    {connection.auto_import_enabled ? 'Ativada' : 'Desativada'}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Última Sincronização:</span>
                  <p className="font-medium">
                    {connection.last_sync
                      ? new Date(connection.last_sync).toLocaleString('pt-PT')
                      : 'Nunca'
                    }
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Criada em:</span>
                  <p className="font-medium">
                    {new Date(connection.created_at).toLocaleDateString('pt-PT')}
                  </p>
                </div>
              </div>

              {connection.connection_status === 'pending' && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Configuração Pendente:</strong> Para ativar a importação automática,
                    é necessário autorizar o acesso à conta bancária através do portal do seu banco.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Info Section */}
      <div className="mt-8 bg-brand-50 border border-brand-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Como funciona a importação automática?</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-start space-x-2">
            <span className="w-5 h-5 bg-brand-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
            <p>Configure a ligação à sua conta bancária através da API Open Banking (PSD2)</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="w-5 h-5 bg-brand-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
            <p>O sistema importa automaticamente as transações de entrada da conta</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="w-5 h-5 bg-brand-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
            <p>Os pagamentos são automaticamente associados aos inquilinos e imóveis correspondentes</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="w-5 h-5 bg-brand-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
            <p>Recebe notificações quando pagamentos são detetados ou quando necessitam de verificação</p>
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-500">
          <strong>Segurança:</strong> Utilizamos encriptação de nível bancário e apenas acesso de leitura às suas contas.
          Nunca armazenamos credenciais bancárias completas.
        </div>
      </div>
    </div>
  );
}