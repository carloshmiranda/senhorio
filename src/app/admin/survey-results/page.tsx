"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface SurveyStats {
  total_responses: number;
  positive_responses: number;
  neutral_responses: number;
  negative_responses: number;
  avg_max_price: number;
  positive_percentage: number;
}

interface WillingnessBreakdown {
  willingness_to_pay: string;
  count: number;
  percentage: number;
}

interface PriceDistribution {
  price_range: string;
  count: number;
}

interface SurveyResponse {
  email: string;
  willingness_to_pay: string;
  max_monthly_price: number;
  most_valuable_features: string[];
  current_solution: string;
  feedback: string;
  waitlist_position: number;
  days_on_waitlist: number;
  created_at: string;
  referral_count: number;
}

export default function SurveyResultsPage() {
  const [stats, setStats] = useState<{
    overview: SurveyStats;
    willingness_breakdown: WillingnessBreakdown[];
    price_distribution: PriceDistribution[];
    waitlist_size: number;
  } | null>(null);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'responses'>('overview');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, responsesRes] = await Promise.all([
        fetch('/api/waitlist-survey?action=stats'),
        fetch('/api/waitlist-survey')
      ]);

      const statsData = await statsRes.json();
      const responsesData = await responsesRes.json();

      if (statsData.ok) setStats(statsData.data);
      if (responsesData.ok) setResponses(responsesData.data);
    } catch (error) {
      console.error('Error loading survey data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getWillingnessColor = (value: string) => {
    const colors = {
      'definitely': 'text-green-600 bg-green-50',
      'probably': 'text-brand-600 bg-brand-50',
      'maybe': 'text-yellow-600 bg-yellow-50',
      'probably_not': 'text-orange-600 bg-orange-50',
      'definitely_not': 'text-red-600 bg-red-50'
    };
    return colors[value as keyof typeof colors] || 'text-gray-600 bg-gray-50';
  };

  const getWillingnessLabel = (value: string) => {
    const labels = {
      'definitely': 'Definitivamente',
      'probably': 'Provavelmente',
      'maybe': 'Talvez',
      'probably_not': 'Provavelmente não',
      'definitely_not': 'Definitivamente não'
    };
    return labels[value as keyof typeof labels] || value;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
          <p className="text-gray-600">A carregar resultados do survey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-500 hover:text-gray-700">
                ← Voltar ao Admin
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Survey Results</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-brand-500 text-brand-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Visão Geral
              </button>
              <button
                onClick={() => setActiveTab('responses')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'responses'
                    ? 'border-brand-500 text-brand-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Respostas Individuais ({responses.length})
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'overview' && stats && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Total Respostas</h3>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.overview.total_responses}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  de {stats.waitlist_size} na lista
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Dispostos a Pagar</h3>
                <p className="text-3xl font-bold text-green-600">
                  {stats.overview.positive_percentage}%
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {stats.overview.positive_responses} pessoas
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Preço Médio</h3>
                <p className="text-3xl font-bold text-brand-600">
                  €{stats.overview.avg_max_price?.toFixed(2) || '0'}
                </p>
                <p className="text-sm text-gray-600 mt-1">por mês</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Taxa de Resposta</h3>
                <p className="text-3xl font-bold text-purple-600">
                  {((stats.overview.total_responses / stats.waitlist_size) * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  da lista de espera
                </p>
              </div>
            </div>

            {/* Willingness Breakdown */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Disposição de Pagamento
              </h3>
              <div className="space-y-3">
                {stats.willingness_breakdown.map((item) => (
                  <div key={item.willingness_to_pay} className="flex items-center">
                    <div className="w-32">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getWillingnessColor(item.willingness_to_pay)}`}>
                        {getWillingnessLabel(item.willingness_to_pay)}
                      </span>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            item.willingness_to_pay === 'definitely' ? 'bg-green-500' :
                            item.willingness_to_pay === 'probably' ? 'bg-brand-500' :
                            item.willingness_to_pay === 'maybe' ? 'bg-yellow-500' :
                            item.willingness_to_pay === 'probably_not' ? 'bg-orange-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-gray-900">{item.count}</span>
                      <span className="text-xs text-gray-500 ml-1">({item.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Distribution */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Distribuição de Preços
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
                {stats.price_distribution.map((item) => (
                  <div key={item.price_range} className="text-center">
                    <div className="bg-brand-100 rounded-lg p-4">
                      <p className="text-2xl font-bold text-brand-600">{item.count}</p>
                      <p className="text-xs text-gray-600 mt-1">{item.price_range}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'responses' && (
          <div className="space-y-6">
            {responses.map((response, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-medium text-gray-900">{response.email}</p>
                    <p className="text-sm text-gray-500">
                      Posição: #{response.waitlist_position || 'N/A'} •
                      {response.days_on_waitlist} dias na lista •
                      {response.referral_count} referências
                    </p>
                  </div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getWillingnessColor(response.willingness_to_pay)}`}>
                    {getWillingnessLabel(response.willingness_to_pay)}
                    {response.max_monthly_price && ` (€${response.max_monthly_price}/mês)`}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Funcionalidades Mais Valiosas</h4>
                    <div className="flex flex-wrap gap-1">
                      {response.most_valuable_features.map((feature, i) => (
                        <span key={i} className="inline-block px-2 py-1 bg-brand-100 text-brand-800 text-xs rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Solução Atual</h4>
                    <p className="text-sm text-gray-700">
                      {response.current_solution || 'Não especificado'}
                    </p>
                  </div>
                </div>

                {response.feedback && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Feedback</h4>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                      {response.feedback}
                    </p>
                  </div>
                )}

                <div className="text-xs text-gray-400 mt-4">
                  Respondido em {formatDate(response.created_at)}
                </div>
              </div>
            ))}

            {responses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Ainda não há respostas ao survey.</p>
                <Link
                  href="/survey"
                  className="inline-block mt-4 px-4 py-2 bg-brand-600 text-white rounded-lg text-sm hover:bg-brand-700"
                >
                  Ver Survey
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}