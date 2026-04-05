"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import SocialShareButtons from "@/components/SocialShareButtons";

interface TaxScenario {
  name: string;
  rate: number;
  description: string;
  eligible: boolean;
  annualTax: number;
  requirements: string[];
  isNew2026?: boolean;
  savings?: number;
  highlight?: string;
}

export default function SimuladorIRSPage() {
  const [monthlyRent, setMonthlyRent] = useState<string>("1200");
  const [propertyType, setPropertyType] = useState<"single" | "multiple">("single");
  const [residency, setResidency] = useState<"resident" | "non-resident">("resident");
  const [email, setEmail] = useState<string>("");
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);
  const [emailLoading, setEmailLoading] = useState<boolean>(false);

  const taxScenarios = useMemo((): TaxScenario[] => {
    const rent = parseFloat(monthlyRent) || 0;
    const annualRent = rent * 12;

    // 2026 Tax Scenarios
    const scenarios: TaxScenario[] = [];

    // NEW 2026: 10% rate for moderate rents
    const eligible10 = rent <= 2300;
    scenarios.push({
      name: "Nova Taxa 10% (2026)",
      rate: 10,
      description: "Novo benefício fiscal 2026 para rendas moderadas",
      eligible: eligible10,
      annualTax: eligible10 ? annualRent * 0.10 : 0,
      isNew2026: true,
      highlight: eligible10 ? "NOVA TAXA REDUZIDA" : "NÃO ELEGÍVEL",
      requirements: [
        "Renda mensal ≤ €2.300",
        "Aplicável a contratos novos e existentes",
        "Válido de 2026 a 2029",
        "Redução de 60% face aos 25% anteriores"
      ]
    });

    // Standard 25% rate (was the default before 2026)
    scenarios.push({
      name: "Regime Geral 25%",
      rate: 25,
      description: "Taxa padrão para rendas de arrendamento",
      eligible: true,
      annualTax: annualRent * 0.25,
      requirements: [
        "Taxa aplicável a todas as rendas",
        "Regime por defeito até 2025",
        "Agora apenas para rendas > €2.300/mês"
      ]
    });

    // RSAA - 0% for very low income
    const eligibleRSAA = annualRent <= 15000; // Simplified threshold
    scenarios.push({
      name: "RSAA - Isenção Total (0%)",
      rate: 0,
      description: "Regime especial para rendimentos muito baixos",
      eligible: eligibleRSAA,
      annualTax: eligibleRSAA ? 0 : 0,
      requirements: [
        "Rendimento anual ≤ €15.000",
        "Renda abaixo de 80% da mediana municipal",
        "Arrendamento para habitação própria"
      ]
    });

    // Non-residents
    if (residency === "non-resident") {
      scenarios.push({
        name: "Não Residentes 28%",
        rate: 28,
        description: "Taxa fixa para proprietários não residentes",
        eligible: true,
        annualTax: annualRent * 0.28,
        requirements: [
          "Proprietário não residente em Portugal",
          "Taxa fixa independente do valor da renda",
          "Sem dedução de despesas"
        ]
      });
    }

    // Calculate savings relative to old 25% rate
    const standardTax25 = annualRent * 0.25;
    scenarios.forEach(scenario => {
      if (scenario.eligible && scenario.rate < 25) {
        scenario.savings = standardTax25 - scenario.annualTax;
      }
    });

    return scenarios.filter(s => s.eligible).sort((a, b) => a.annualTax - b.annualTax);
  }, [monthlyRent, propertyType, residency]);

  const bestScenario = taxScenarios[0];
  const standardScenario = taxScenarios.find(s => s.rate === 25);
  const annualRent = (parseFloat(monthlyRent) || 0) * 12;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || emailSubmitted) return;

    setEmailLoading(true);
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'irs_simulator_2026',
          metadata: {
            monthlyRent: parseFloat(monthlyRent),
            propertyType,
            residency,
            bestRate: bestScenario.rate,
            annualTax: bestScenario.annualTax,
            annualSavings: bestScenario.savings || 0,
            eligibleFor10Percent: bestScenario.rate === 10
          }
        }),
      });

      if (response.ok) {
        setEmailSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting email:', error);
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-green-50">
      {/* Header with 2026 highlight */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition">
            ← Voltar ao início
          </Link>

          {/* 2026 Badge */}
          <div className="mt-3 mb-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              🎉 NOVO 2026
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Simulador IRS Arrendamento 2026
          </h1>
          <p className="text-lg text-gray-600">
            Descubra quanto pode poupar com as <strong>novas taxas fiscais de 2026</strong>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Taxa de 10% para rendas até €2.300/mês • Válido até 2029 • Poupanças até 60%
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Key benefits banner */}
        <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">10%</div>
              <div className="text-sm opacity-90">Nova taxa IRS 2026</div>
            </div>
            <div>
              <div className="text-2xl font-bold">€2.300</div>
              <div className="text-sm opacity-90">Limite mensal para taxa 10%</div>
            </div>
            <div>
              <div className="text-2xl font-bold">60%</div>
              <div className="text-sm opacity-90">Poupança face aos 25%</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Dados da Sua Propriedade
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Renda Mensal (€)
                </label>
                <input
                  type="number"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(e.target.value)}
                  placeholder="1200"
                  min="0"
                  step="50"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent text-lg"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {parseFloat(monthlyRent) <= 2300 ?
                    "✅ Elegível para taxa 10% (2026)" :
                    "⚠️ Acima do limite de €2.300 para taxa 10%"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Residência Fiscal
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setResidency("resident")}
                    className={`px-4 py-3 border rounded-lg font-medium transition ${
                      residency === "resident"
                        ? "border-brand-500 bg-brand-50 text-brand-700"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Residente
                  </button>
                  <button
                    onClick={() => setResidency("non-resident")}
                    className={`px-4 py-3 border rounded-lg font-medium transition ${
                      residency === "non-resident"
                        ? "border-brand-500 bg-brand-50 text-brand-700"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Não Residente
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Propriedade
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPropertyType("single")}
                    className={`px-4 py-3 border rounded-lg font-medium transition ${
                      propertyType === "single"
                        ? "border-brand-500 bg-brand-50 text-brand-700"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    1 Propriedade
                  </button>
                  <button
                    onClick={() => setPropertyType("multiple")}
                    className={`px-4 py-3 border rounded-lg font-medium transition ${
                      propertyType === "multiple"
                        ? "border-brand-500 bg-brand-50 text-brand-700"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Múltiplas
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Simulação do Seu IRS 2026
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Renda anual:</span>
                <span className="font-semibold text-lg">€{annualRent.toLocaleString()}</span>
              </div>

              {bestScenario && (
                <div className="border-2 border-green-300 bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-green-700">
                      Melhor Regime para Si
                    </span>
                    {bestScenario.isNew2026 && (
                      <span className="px-2 py-1 bg-green-200 text-green-800 text-xs font-bold rounded-full">
                        NOVO 2026
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-green-800 mb-1">
                    {bestScenario.name}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-green-600">Taxa de imposto</p>
                      <p className="text-2xl font-bold text-green-800">{bestScenario.rate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-green-600">IRS anual</p>
                      <p className="text-2xl font-bold text-green-800">€{bestScenario.annualTax.toLocaleString()}</p>
                    </div>
                  </div>

                  {bestScenario.savings && bestScenario.savings > 0 && (
                    <div className="bg-white border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-700 mb-1">Poupança anual vs regime 25%:</p>
                      <p className="text-xl font-bold text-green-800">€{bestScenario.savings.toLocaleString()}</p>
                      <p className="text-xs text-green-600">
                        Em 4 anos (2026-2029): €{(bestScenario.savings * 4).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Email Capture */}
        {bestScenario && bestScenario.savings && bestScenario.savings > 0 && !emailSubmitted && (
          <div className="mt-8 bg-gradient-to-r from-green-50 to-brand-50 rounded-xl border-2 border-green-300 p-6">
            <div className="text-center">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Pode poupar €{bestScenario.savings.toLocaleString()} por ano!
              </h3>
              <p className="text-gray-700 mb-6">
                Com as novas regras fiscais de 2026, está a poupar <strong>€{bestScenario.savings.toLocaleString()}</strong> anualmente.
                Receba o seu relatório personalizado e dicas para maximizar as poupanças.
              </p>

              <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="o-seu-email@exemplo.com"
                    required
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={emailLoading || !email}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {emailLoading ? 'A enviar...' : 'Receber Relatório'}
                  </button>
                </div>
              </form>

              <p className="text-xs text-gray-500 mt-3">
                💡 Também receberá alertas sobre mudanças fiscais e novas ferramentas para senhorios
              </p>
            </div>
          </div>
        )}

        {/* Email Submitted */}
        {emailSubmitted && (
          <div className="mt-8 bg-green-50 border-2 border-green-300 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="text-xl font-bold text-green-800 mb-3">
              Relatório enviado com sucesso!
            </h3>
            <p className="text-green-700">
              Enviámos o seu relatório personalizado para <strong>{email}</strong>.
              Verifique a sua caixa de entrada nos próximos minutos.
            </p>
          </div>
        )}

        {/* Detailed Scenarios */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Comparação de Cenários Fiscais 2026
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {taxScenarios.map((scenario, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg p-6 border-2 transition ${
                  scenario === bestScenario
                    ? "border-green-400 shadow-green-100"
                    : "border-gray-200 hover:border-brand-300"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {scenario.name}
                  </h3>
                  {scenario.isNew2026 && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                      NOVO
                    </span>
                  )}
                  {scenario === bestScenario && (
                    <span className="px-2 py-1 bg-brand-100 text-brand-800 text-xs font-medium rounded-full">
                      Recomendado
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {scenario.rate}%
                  </div>
                  <div className="text-sm text-gray-500">Taxa de imposto</div>
                </div>

                <div className="mb-4">
                  <div className="text-xl font-bold text-gray-900">
                    €{scenario.annualTax.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">IRS anual</div>

                  {scenario.savings && scenario.savings > 0 && (
                    <div className="mt-2 p-2 bg-green-50 rounded border border-green-200">
                      <div className="text-sm font-medium text-green-800">
                        Poupança: €{scenario.savings.toLocaleString()}/ano
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-3">
                    {scenario.description}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-700 mb-2">
                    Requisitos:
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {scenario.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start">
                        <span className="text-green-500 mr-1 text-xs">✓</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2026 Changes Highlight */}
        <div className="mt-8 bg-brand-50 border border-brand-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-brand-900 mb-4">
            📋 Mudanças Fiscais de 2026 para Arrendamento
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-brand-800 mb-2">Novas Vantagens</h4>
              <ul className="text-sm text-brand-700 space-y-2">
                <li>✅ Taxa reduzida de 10% para rendas até €2.300/mês</li>
                <li>✅ Aplicável a contratos novos e existentes</li>
                <li>✅ Válido de 2026 a 2029 (4 anos)</li>
                <li>✅ Poupança de até 60% face aos 25%</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-brand-800 mb-2">Como Aplicar</h4>
              <ul className="text-sm text-brand-700 space-y-2">
                <li>📝 Opção automática na declaração IRS 2027</li>
                <li>📝 Sem necessidade de procedimentos especiais</li>
                <li>📝 Aplica-se ao rendimento de 2026 em diante</li>
                <li>📝 Compatível com deduções de despesas</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="mt-8">
          <SocialShareButtons
            page="simulador-irs"
            title="Simulador IRS Arrendamento 2026"
            description="Descubra quanto pode poupar com as novas taxas fiscais de 2026"
          />
        </div>

        {/* Legal disclaimer */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Nota:</strong> Esta simulação baseia-se nas regras fiscais de 2026 conhecidas até à data.
            Os valores são estimativos e podem variar dependendo da sua situação fiscal específica.
            Consulte sempre um contabilista para aconselhamento personalizado.
          </p>
        </div>

        {/* Related Tools */}
        <div className="mt-8 bg-green-50 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            Outras Ferramentas Úteis
          </h3>
          <p className="text-green-700 mb-4">
            Explore as nossas outras calculadoras especializadas para senhorios portugueses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/calculadora-rendas"
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
            >
              Calculadora de Aumentos de Renda
            </Link>
            <Link
              href="/aimi"
              className="px-6 py-3 border border-green-300 text-green-700 rounded-lg font-medium hover:bg-green-50 transition"
            >
              Verificar Isenção AIMI 2026
            </Link>
          </div>
        </div>

        {/* CTA to waitlist */}
        <div className="mt-8 bg-brand-600 text-white rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold mb-2">
            Quer gerir as suas propriedades profissionalmente?
          </h3>
          <p className="mb-4 opacity-90">
            A plataforma completa Senhorio vai ajudá-lo a aproveitar ao máximo os benefícios fiscais de 2026
            e gerir todas as suas obrigações como senhorio.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-white text-brand-600 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            Juntar à Lista de Espera
          </Link>
        </div>
      </div>
    </div>
  );
}