"use client";

import React, { useState } from "react";
import { track } from "@vercel/analytics";
import Link from "next/link";

const FEATURES = [
  "Simulador fiscal automático",
  "Recibos de renda digitais",
  "Acompanhamento de despesas dedutíveis",
  "Lembretes de prazos fiscais",
  "Dashboard de portfólio",
  "Calculadora de atualizações de renda",
  "Relatórios para o Portal das Finanças",
  "Suporte especializado em arrendamento"
];

export default function WaitlistSurveyPage() {
  const [step, setStep] = useState<'email' | 'survey' | 'success'>('email');
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [surveyData, setSurveyData] = useState({
    willingness_to_pay: "",
    max_monthly_price: "",
    most_valuable_features: [] as string[],
    current_solution: "",
    feedback: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");

    try {
      // Check if email exists in waitlist
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, verify_only: true })
      });

      const result = await response.json();

      if (result.ok) {
        setEmailVerified(true);
        setStep('survey');
        track('survey_email_verified', { email });
      } else {
        setError('Email não encontrado na lista de espera. Tem a certeza que se registou?');
      }
    } catch (error) {
      setError('Erro ao verificar email. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSurveySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!surveyData.willingness_to_pay) {
      setError('Por favor selecione uma opção de disposição de pagamento.');
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch('/api/waitlist-survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          ...surveyData,
          max_monthly_price: surveyData.max_monthly_price ? parseFloat(surveyData.max_monthly_price) : null
        })
      });

      const result = await response.json();

      if (result.ok) {
        setStep('success');
        track('survey_completed', {
          email,
          willingness_to_pay: surveyData.willingness_to_pay,
          max_monthly_price: surveyData.max_monthly_price,
          features_count: surveyData.most_valuable_features.length
        });
      } else {
        setError(result.error || 'Erro ao guardar resposta');
      }
    } catch (error) {
      setError('Erro ao enviar survey. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleFeatureToggle = (feature: string) => {
    setSurveyData(prev => ({
      ...prev,
      most_valuable_features: prev.most_valuable_features.includes(feature)
        ? prev.most_valuable_features.filter(f => f !== feature)
        : [...prev.most_valuable_features, feature]
    }));
  };

  const getWillingnessLabel = (value: string) => {
    const labels = {
      'definitely': 'Definitivamente pagaria',
      'probably': 'Provavelmente pagaria',
      'maybe': 'Talvez pagaria',
      'probably_not': 'Provavelmente não pagaria',
      'definitely_not': 'Definitivamente não pagaria'
    };
    return labels[value as keyof typeof labels] || value;
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Obrigado pelo seu feedback!
            </h1>

            <p className="text-gray-600 mb-8">
              A sua opinião é muito valiosa para nós. Estas respostas vão-nos ajudar a construir
              exatamente o que os senhorios portugueses precisam.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h2 className="font-semibold text-blue-900 mb-3">O que acontece agora?</h2>
              <ul className="text-blue-800 text-sm space-y-2 text-left">
                <li>• Vamos analisar todas as respostas do survey</li>
                <li>• Ajustaremos o produto com base no vosso feedback</li>
                <li>• Assim que estivermos prontos, contatamos-lhe primeiro</li>
                <li>• Como membro da lista de espera, terá acesso prioritário</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Voltar ao Site
              </Link>
              <Link
                href="/calculadora"
                className="px-6 py-3 border border-blue-300 text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition"
              >
                Usar Simulador Grátis
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
            <span className="text-xl font-bold text-gray-900">Senhorio</span>
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Ajude-nos a construir o Senhorio perfeito
          </h1>
          <p className="text-gray-600">
            Como membro da nossa lista de espera, a sua opinião é crucial para definirmos
            o produto final. Este survey demora apenas 2-3 minutos.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {step === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qual é o seu email da lista de espera?
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="o-seu-email@exemplo.com"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Usaremos isto para confirmar que está na nossa lista de espera
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? "A verificar..." : "Continuar"}
              </button>
            </form>
          )}

          {step === 'survey' && (
            <form onSubmit={handleSurveySubmit} className="space-y-8">
              {/* Willingness to Pay */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Disposição de pagamento
                </h2>
                <p className="text-gray-600 mb-4">
                  Baseado no que viu até agora sobre o Senhorio, estaria disposto/a a pagar por uma solução completa de gestão de arrendamento?
                </p>
                <div className="space-y-3">
                  {[
                    { value: 'definitely', label: 'Definitivamente pagaria', color: 'bg-green-100 border-green-300 text-green-800' },
                    { value: 'probably', label: 'Provavelmente pagaria', color: 'bg-blue-100 border-blue-300 text-blue-800' },
                    { value: 'maybe', label: 'Talvez pagaria', color: 'bg-yellow-100 border-yellow-300 text-yellow-800' },
                    { value: 'probably_not', label: 'Provavelmente não pagaria', color: 'bg-orange-100 border-orange-300 text-orange-800' },
                    { value: 'definitely_not', label: 'Definitivamente não pagaria', color: 'bg-red-100 border-red-300 text-red-800' }
                  ].map(option => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="willingness"
                        value={option.value}
                        checked={surveyData.willingness_to_pay === option.value}
                        onChange={(e) => setSurveyData(prev => ({ ...prev, willingness_to_pay: e.target.value }))}
                        className="mr-3"
                      />
                      <span className={`px-3 py-2 rounded-lg border flex-1 ${surveyData.willingness_to_pay === option.value ? option.color : 'bg-gray-50 border-gray-200 text-gray-700'} transition`}>
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Point */}
              {surveyData.willingness_to_pay && !['definitely_not', 'probably_not'].includes(surveyData.willingness_to_pay) && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Preço máximo mensal
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Qual seria o preço máximo que pagaria por mês por uma solução completa?
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-700">€</span>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="15"
                      value={surveyData.max_monthly_price}
                      onChange={(e) => setSurveyData(prev => ({ ...prev, max_monthly_price: e.target.value }))}
                      className="w-24 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">por mês</span>
                  </div>
                </div>
              )}

              {/* Features */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Funcionalidades mais valiosas
                </h2>
                <p className="text-gray-600 mb-4">
                  Selecione as 3-5 funcionalidades que considera mais importantes:
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {FEATURES.map(feature => (
                    <label key={feature} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={surveyData.most_valuable_features.includes(feature)}
                        onChange={() => handleFeatureToggle(feature)}
                        className="mr-3"
                      />
                      <span className={`px-3 py-2 rounded-lg border flex-1 text-sm ${surveyData.most_valuable_features.includes(feature) ? 'bg-blue-100 border-blue-300 text-blue-800' : 'bg-gray-50 border-gray-200 text-gray-700'} transition`}>
                        {feature}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Current Solution */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Solução atual
                </h2>
                <p className="text-gray-600 mb-4">
                  Como gere atualmente o seus arrendamentos e impostos? (opcional)
                </p>
                <textarea
                  placeholder="Ex: Excel, contabilista, aplicação X, etc."
                  value={surveyData.current_solution}
                  onChange={(e) => setSurveyData(prev => ({ ...prev, current_solution: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Feedback */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Feedback adicional
                </h2>
                <p className="text-gray-600 mb-4">
                  Há algo específico que gostaria que o Senhorio tivesse? (opcional)
                </p>
                <textarea
                  placeholder="Funcionalidades em falta, melhorias, ou qualquer outra sugestão..."
                  value={surveyData.feedback}
                  onChange={(e) => setSurveyData(prev => ({ ...prev, feedback: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !surveyData.willingness_to_pay}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? "A guardar respostas..." : "Enviar Respostas"}
              </button>

              <p className="text-xs text-gray-500 text-center">
                As suas respostas são anónimas e só serão usadas para melhorar o produto.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}