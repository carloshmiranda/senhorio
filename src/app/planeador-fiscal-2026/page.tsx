"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";

// Portuguese municipalities with rent medians for RSAA calculation
const MUNICIPALITIES = [
  { name: "Lisboa", code: "lisboa", rentMedian: 1800, region: "Grande Lisboa" },
  { name: "Porto", code: "porto", rentMedian: 1200, region: "Grande Porto" },
  { name: "Cascais", code: "cascais", rentMedian: 2200, region: "Grande Lisboa" },
  { name: "Oeiras", code: "oeiras", rentMedian: 1900, region: "Grande Lisboa" },
  { name: "Sintra", code: "sintra", rentMedian: 1400, region: "Grande Lisboa" },
  { name: "Braga", code: "braga", rentMedian: 900, region: "Norte" },
  { name: "Coimbra", code: "coimbra", rentMedian: 800, region: "Centro" },
  { name: "Aveiro", code: "aveiro", rentMedian: 750, region: "Centro" },
  { name: "Faro", code: "faro", rentMedian: 1100, region: "Algarve" },
  { name: "Setúbal", code: "setubal", rentMedian: 1300, region: "Península de Setúbal" },
  { name: "Vila Nova de Gaia", code: "vng", rentMedian: 950, region: "Grande Porto" },
  { name: "Matosinhos", code: "matosinhos", rentMedian: 1000, region: "Grande Porto" },
  { name: "Almada", code: "almada", rentMedian: 1250, region: "Península de Setúbal" },
  { name: "Funchal", code: "funchal", rentMedian: 1000, region: "Madeira" },
  { name: "Ponta Delgada", code: "ponta-delgada", rentMedian: 650, region: "Açores" },
];

interface TaxScenario {
  name: string;
  irsRate: number;
  aimiExempt: boolean;
  description: string;
  requirements: string[];
  monthlyTax: number;
  annualTax: number;
  totalSavings: number;
  eligible: boolean;
  badge?: string;
}

interface WaitlistSubmission {
  email: string;
  name?: string;
  municipality?: string;
  rent?: number;
  total_savings?: number;
  qualified_regimes?: string[];
  source: string;
  language: string;
}

export default function TaxPlanner2026Page() {
  const [monthlyRent, setMonthlyRent] = useState<string>("1200");
  const [municipality, setMunicipality] = useState<string>("lisboa");
  const [propertyCount, setPropertyCount] = useState<string>("1");
  const [residency, setResidency] = useState<"resident" | "non-resident">("resident");
  const [contractType, setContractType] = useState<"existing" | "new">("existing");
  const [propertyValue, setPropertyValue] = useState<string>("300000");
  const [showEmailCapture, setShowEmailCapture] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);
  const [emailLoading, setEmailLoading] = useState<boolean>(false);

  const selectedMunicipality = MUNICIPALITIES.find(m => m.code === municipality) || MUNICIPALITIES[0];
  const rent = parseFloat(monthlyRent) || 0;
  const annualRent = rent * 12;
  const properties = parseInt(propertyCount) || 1;
  const totalAnnualRent = annualRent * properties;
  const propValue = parseFloat(propertyValue) || 0;

  const taxScenarios = useMemo((): TaxScenario[] => {
    if (rent === 0) return [];

    const scenarios: TaxScenario[] = [];

    // Standard regime (25% for residents, 28% for non-residents)
    const standardRate = residency === "resident" ? 0.25 : 0.28;
    const standardTax = totalAnnualRent * standardRate;
    scenarios.push({
      name: "Regime Geral",
      irsRate: standardRate * 100,
      aimiExempt: false,
      description: residency === "resident"
        ? "Taxa padrão para residentes fiscais"
        : "Taxa fixa para não residentes",
      requirements: [
        residency === "resident"
          ? "Residente fiscal em Portugal"
          : "Não residente fiscal",
        "Sem requisitos especiais"
      ],
      monthlyTax: standardTax / 12,
      annualTax: standardTax,
      totalSavings: 0,
      eligible: true
    });

    // 10% regime for moderate rents (2026-2029)
    const qualifiesFor10Percent = rent <= 2300 && residency === "resident";
    if (qualifiesFor10Percent) {
      const moderateTax = totalAnnualRent * 0.10;
      scenarios.push({
        name: "Renda Moderada 10%",
        irsRate: 10,
        aimiExempt: true,
        description: "Novo regime 2026 para rendas até €2.300/mês",
        requirements: [
          "Renda mensal ≤ €2.300",
          "Residente fiscal em Portugal",
          "Válido para contratos novos e existentes",
          "Vigência: 2026-2029"
        ],
        monthlyTax: moderateTax / 12,
        annualTax: moderateTax,
        totalSavings: standardTax - moderateTax,
        eligible: true,
        badge: "NOVO 2026"
      });
    }

    // RSAA 0% regime (rent below 80% of municipality median)
    const rsaaThreshold = selectedMunicipality.rentMedian * 0.8;
    const qualifiesForRSAA = rent < rsaaThreshold && residency === "resident";
    if (qualifiesForRSAA) {
      scenarios.push({
        name: "RSAA 0% IRS",
        irsRate: 0,
        aimiExempt: true,
        description: `Isenção total - renda abaixo de 80% da mediana de ${selectedMunicipality.name}`,
        requirements: [
          `Renda < €${rsaaThreshold.toFixed(0)} (80% da mediana local)`,
          "Contrato de habitação",
          "Residente fiscal em Portugal",
          "Registo no RSAA"
        ],
        monthlyTax: 0,
        annualTax: 0,
        totalSavings: standardTax,
        eligible: true,
        badge: "0% IRS"
      });
    }

    // AIMI exemption check (properties up to €600k)
    const aimiExempt = propValue <= 600000;

    return scenarios.map(scenario => ({
      ...scenario,
      aimiExempt: scenario.aimiExempt && aimiExempt
    })).sort((a, b) => b.totalSavings - a.totalSavings);
  }, [monthlyRent, municipality, propertyCount, residency, contractType, propertyValue, selectedMunicipality, rent, totalAnnualRent, propValue]);

  const bestScenario = taxScenarios.length > 0 ? taxScenarios[0] : null;
  const maxSavings = bestScenario?.totalSavings || 0;

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setEmailLoading(true);

    try {
      const qualifiedRegimes = taxScenarios
        .filter(s => s.eligible && s.totalSavings > 0)
        .map(s => s.name);

      const submission: WaitlistSubmission = {
        email: email.trim(),
        name: name.trim() || undefined,
        municipality: selectedMunicipality.name,
        rent: rent,
        total_savings: maxSavings,
        qualified_regimes: qualifiedRegimes,
        source: "tax-planner-2026",
        language: "pt"
      };

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
      });

      if (response.ok) {
        setEmailSubmitted(true);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      console.error("Error submitting email:", error);
    } finally {
      setEmailLoading(false);
    }
  };

  const webAppData = {
    name: "Planeador Fiscal 2026 - Calculadora Impostos Arrendamento",
    description: "Simulador completo dos novos regimes fiscais 2026 para senhorios: 10% renda moderada, RSAA 0%, isenção AIMI. Compare e poupe milhares de euros em impostos.",
    url: "https://senhorio.vercel.app/planeador-fiscal-2026",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    offers: {
      price: "0",
      priceCurrency: "EUR"
    }
  };

  return (
    <>
      <StructuredData webAppData={webAppData} faqData={[]} />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              NOVO 2026
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Planeador Fiscal 2026
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Descubra quanto pode poupar com os novos regimes fiscais para arrendamento
            </p>
            <p className="text-gray-500">
              Simule o regime de 10%, RSAA 0% e isenção AIMI numa única ferramenta
            </p>
          </div>

          {/* Calculator Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Dados da Propriedade
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Renda Mensal (€)
                </label>
                <input
                  type="number"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Concelho
                </label>
                <select
                  value={municipality}
                  onChange={(e) => setMunicipality(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {MUNICIPALITIES.map(m => (
                    <option key={m.code} value={m.code}>
                      {m.name} ({m.region})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Propriedades
                </label>
                <select
                  value={propertyCount}
                  onChange={(e) => setPropertyCount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <option key={n} value={n}>{n} propriedade{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Residência Fiscal
                </label>
                <select
                  value={residency}
                  onChange={(e) => setResidency(e.target.value as "resident" | "non-resident")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="resident">Residente em Portugal</option>
                  <option value="non-resident">Não residente</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor Patrimonial da Propriedade (€)
                </label>
                <input
                  type="number"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="300000"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Para verificação da isenção AIMI (até €600.000)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Contrato
                </label>
                <select
                  value={contractType}
                  onChange={(e) => setContractType(e.target.value as "existing" | "new")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="existing">Contrato existente</option>
                  <option value="new">Contrato novo (2026+)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          {taxScenarios.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Cenários Fiscais Disponíveis
              </h2>

              {bestScenario && maxSavings > 0 && (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-green-900">
                        Melhor Opção: {bestScenario.name}
                      </h3>
                      <p className="text-green-700">
                        Poupe até €{maxSavings.toLocaleString('pt-PT')} por ano
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid gap-6">
                {taxScenarios.map((scenario, index) => (
                  <div
                    key={index}
                    className={`border-2 rounded-xl p-6 ${
                      scenario.totalSavings > 0
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {scenario.name}
                          </h3>
                          {scenario.badge && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                              {scenario.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600">
                          {scenario.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gray-900">
                          {scenario.irsRate}%
                        </div>
                        <div className="text-sm text-gray-500">
                          IRS
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-white p-4 rounded-lg">
                        <div className="text-sm text-gray-500">Imposto Mensal</div>
                        <div className="text-2xl font-bold text-gray-900">
                          €{scenario.monthlyTax.toLocaleString('pt-PT')}
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <div className="text-sm text-gray-500">Imposto Anual</div>
                        <div className="text-2xl font-bold text-gray-900">
                          €{scenario.annualTax.toLocaleString('pt-PT')}
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <div className="text-sm text-gray-500">Poupança Anual</div>
                        <div className={`text-2xl font-bold ${
                          scenario.totalSavings > 0 ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          {scenario.totalSavings > 0
                            ? `+€${scenario.totalSavings.toLocaleString('pt-PT')}`
                            : '—'
                          }
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Requisitos:</h4>
                      <ul className="space-y-1">
                        {scenario.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {scenario.aimiExempt && (
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-2 text-blue-800">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-medium">Isenção AIMI incluída</span>
                        </div>
                        <p className="text-sm text-blue-700 mt-1">
                          Propriedades até €600.000 ficam isentas de AIMI
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Email Capture */}
              {maxSavings > 0 && !emailSubmitted && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-8">
                  <div className="max-w-2xl mx-auto text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Quer maximizar as suas poupanças fiscais?
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Registe-se para receber um guia personalizado sobre como implementar
                      o melhor regime fiscal para as suas propriedades.
                    </p>

                    <form onSubmit={handleSubmitEmail} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="O seu email"
                        required
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome (opcional)"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="submit"
                        disabled={emailLoading}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                      >
                        {emailLoading ? "..." : "Receber Guia"}
                      </button>
                    </form>

                    <p className="text-xs text-gray-500 mt-4">
                      Poupança estimada: €{maxSavings.toLocaleString('pt-PT')}/ano
                    </p>
                  </div>
                </div>
              )}

              {emailSubmitted && (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-900 mb-2">
                    Obrigado pelo seu registo!
                  </h3>
                  <p className="text-green-700">
                    Em breve receberá o guia personalizado com estratégias para maximizar
                    as suas poupanças fiscais.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Additional Info */}
          <div className="bg-gray-50 rounded-xl p-8 mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Principais Alterações Fiscais 2026
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-2">10%</div>
                <h4 className="font-semibold text-gray-900 mb-2">Renda Moderada</h4>
                <p className="text-sm text-gray-600">
                  Nova taxa de IRS para rendas até €2.300/mês, válida até 2029
                </p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 mb-2">0%</div>
                <h4 className="font-semibold text-gray-900 mb-2">RSAA</h4>
                <p className="text-sm text-gray-600">
                  Isenção total de IRS para rendas abaixo de 80% da mediana local
                </p>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 mb-2">€600k</div>
                <h4 className="font-semibold text-gray-900 mb-2">Isenção AIMI</h4>
                <p className="text-sm text-gray-600">
                  Propriedades até €600.000 ficam isentas de AIMI
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Voltar à página inicial
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}