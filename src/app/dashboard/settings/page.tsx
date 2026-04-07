"use client";

import { useEffect, useState } from "react";

interface NotificationPreference {
  notification_type: string;
  enabled: boolean;
  email_enabled: boolean;
  days_before: number | null;
  time_of_day: string;
  created_at?: string;
  updated_at?: string;
}

interface NotificationHistory {
  id: string;
  notification_type: string;
  recipient_email: string;
  subject: string;
  related_id: string | null;
  related_type: string | null;
  status: string;
  sent_at: string;
  delivered_at?: string;
  opened_at?: string;
  clicked_at?: string;
}

const notificationTypes = {
  payment_reminder_3_days: {
    title: "Lembrete de Pagamento - 3 dias",
    description: "Notificação enviada 3 dias antes do vencimento da renda",
    icon: "📅"
  },
  payment_reminder_1_day: {
    title: "Lembrete de Pagamento - 1 dia",
    description: "Notificação enviada 1 dia antes do vencimento da renda",
    icon: "⏰"
  },
  payment_overdue: {
    title: "Pagamentos em Atraso",
    description: "Alerta quando existem pagamentos de renda em atraso",
    icon: "⚠️"
  },
  monthly_summary: {
    title: "Resumo Mensal",
    description: "Resumo mensal dos seus imóveis e pagamentos",
    icon: "📊"
  },
  tax_deadline_reminder: {
    title: "Prazos Fiscais",
    description: "Lembretes sobre prazos fiscais importantes",
    icon: "🗓️"
  },
  receipt_generation_reminder: {
    title: "Geração de Recibos",
    description: "Lembrete para gerar recibos de pagamentos recebidos",
    icon: "🧾"
  }
};

export default function SettingsPage() {
  const [preferences, setPreferences] = useState<NotificationPreference[]>([]);
  const [history, setHistory] = useState<NotificationHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState<'preferences' | 'history'>('preferences');

  useEffect(() => {
    loadPreferences();
    loadHistory();
  }, []);

  async function loadPreferences() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch('/api/notifications/preferences');
      const data = await res.json();

      if (data.ok) {
        setPreferences(data.data);
      } else {
        setError(data.error || "Erro ao carregar preferências");
      }
    } catch {
      setError("Erro de ligação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  async function loadHistory() {
    try {
      const res = await fetch('/api/notifications?limit=20');
      const data = await res.json();

      if (data.ok) {
        setHistory(data.data);
      }
    } catch (error) {
      console.error("Error loading notification history:", error);
    }
  }

  async function savePreferences() {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch('/api/notifications/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ preferences }),
      });

      const data = await res.json();

      if (data.ok) {
        setSuccess("Preferências guardadas com sucesso!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.error || "Erro ao guardar preferências");
      }
    } catch {
      setError("Erro ao guardar preferências. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  async function sendTestNotification() {
    setTesting(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          notification_type: 'test_notification'
        }),
      });

      const data = await res.json();

      if (data.ok) {
        setSuccess("Notificação de teste enviada! Verifique a sua caixa de entrada.");
        setTimeout(() => setSuccess(""), 5000);
        // Reload history to show the test notification
        loadHistory();
      } else {
        setError(data.error || "Erro ao enviar notificação de teste");
      }
    } catch {
      setError("Erro ao enviar notificação de teste");
    } finally {
      setTesting(false);
    }
  }

  function updatePreference(notificationType: string, updates: Partial<NotificationPreference>) {
    setPreferences(prev => prev.map(pref =>
      pref.notification_type === notificationType
        ? { ...pref, ...updates }
        : pref
    ));
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleString('pt-PT', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function getStatusBadge(status: string) {
    const styles = {
      sent: 'bg-blue-100 text-blue-800',
      delivered: 'bg-green-100 text-green-800',
      opened: 'bg-purple-100 text-purple-800',
      clicked: 'bg-indigo-100 text-indigo-800',
      bounced: 'bg-red-100 text-red-800',
      complained: 'bg-red-100 text-red-800'
    };

    const labels = {
      sent: 'Enviado',
      delivered: 'Entregue',
      opened: 'Aberto',
      clicked: 'Clicado',
      bounced: 'Rejeitado',
      complained: 'Spam'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Definições</h1>
          <p className="text-sm text-gray-600">Configure as suas notificações e preferências</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('preferences')}
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'preferences'
              ? 'text-brand-600 border-brand-600'
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          Notificações
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 font-medium text-sm border-b-2 ml-8 ${
            activeTab === 'history'
              ? 'text-brand-600 border-brand-600'
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          Histórico
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600">
          {success}
        </div>
      )}

      {activeTab === 'preferences' && (
        <div className="space-y-6">
          {/* Test Notification */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">Testar Notificações</h2>
            <p className="text-sm text-blue-700 mb-4">
              Envie uma notificação de teste para verificar se tudo está a funcionar corretamente.
            </p>
            <button
              onClick={sendTestNotification}
              disabled={testing}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center"
            >
              {testing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  A enviar...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Enviar Notificação de Teste
                </>
              )}
            </button>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Preferências de Notificação</h2>
              <p className="text-sm text-gray-600 mt-1">
                Configure quando e como quer receber notificações sobre os seus imóveis.
              </p>
            </div>

            {loading ? (
              <div className="p-6">
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {preferences.map((preference) => {
                  const typeInfo = notificationTypes[preference.notification_type as keyof typeof notificationTypes];
                  if (!typeInfo) return null;

                  return (
                    <div key={preference.notification_type} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">{typeInfo.icon}</div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{typeInfo.title}</h3>
                            <p className="text-sm text-gray-600">{typeInfo.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <input
                              id={`email-${preference.notification_type}`}
                              type="checkbox"
                              checked={preference.email_enabled}
                              onChange={(e) => updatePreference(preference.notification_type, {
                                email_enabled: e.target.checked
                              })}
                              className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`email-${preference.notification_type}`} className="ml-2 text-sm text-gray-700">
                              Email
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id={`enabled-${preference.notification_type}`}
                              type="checkbox"
                              checked={preference.enabled}
                              onChange={(e) => updatePreference(preference.notification_type, {
                                enabled: e.target.checked
                              })}
                              className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`enabled-${preference.notification_type}`} className="ml-2 text-sm font-medium text-gray-700">
                              Ativo
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {!loading && (
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    As suas preferências são guardadas automaticamente.
                  </p>
                  <button
                    onClick={savePreferences}
                    disabled={saving}
                    className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition disabled:opacity-50 flex items-center"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        A guardar...
                      </>
                    ) : (
                      'Guardar Alterações'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Histórico de Notificações</h2>
            <p className="text-sm text-gray-600 mt-1">
              Últimas notificações enviadas para a sua conta.
            </p>
          </div>

          {history.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="text-gray-300 text-4xl mb-4">📬</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Sem notificações</h3>
              <p className="text-gray-500">Ainda não foram enviadas notificações para esta conta.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {history.map((notification) => {
                const typeInfo = notificationTypes[notification.notification_type as keyof typeof notificationTypes];

                return (
                  <div key={notification.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="text-xl">{typeInfo?.icon || '📧'}</div>
                        <div>
                          <h3 className="font-medium text-gray-900">{notification.subject}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Enviado para {notification.recipient_email}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDate(notification.sent_at)}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        {getStatusBadge(notification.status)}
                        {notification.opened_at && (
                          <p className="text-xs text-gray-500">
                            Aberto: {formatDate(notification.opened_at)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}