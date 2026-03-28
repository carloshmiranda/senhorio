"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import { CALCULATOR_STRUCTURED_DATA } from "@/lib/structured-data";

// Portuguese municipalities with their tax rates (simplified for example)
const MUNICIPALITIES = [
  { name: "Lisboa", code: "lisboa", derrama: 0.015 },
  { name: "Porto", code: "porto", derrama: 0.015 },
  { name: "Braga", code: "braga", derrama: 0.015 },
  { name: "Coimbra", code: "coimbra", derrama: 0.015 },
  { name: "Aveiro", code: "aveiro", derrama: 0.015 },
  { name: "Faro", code: "faro", derrama: 0.015 },
  { name: "Setúbal", code: "setubal", derrama: 0.015 },
  { name: "Viseu", code: "viseu", derrama: 0.015 },
  { name: "Leiria", code: "leiria", derrama: 0.015 },
  { name: "Vila Nova de Gaia", code: "vng", derrama: 0.015 },
];

interface TaxRegime {
  name: string;
  rate: number;
  annualTax: number;
  eligible: boolean;
  description: string;
  requirements: string[];
  savings?: number;
}

export default function TaxCalculatorPage() {
  const [monthlyRent, setMonthlyRent] = useState<string>("1000");
  const [municipality, setMunicipality] = useState<string>("lisboa");
  const [propertyCount, setPropertyCount] = useState<string>("1");
  const [residency, setResidency] = useState<"resident" | "non-resident">("resident");
  const [email, setEmail] = useState<string>("");
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);
  const [emailLoading, setEmailLoading] = useState<boolean>(false);

  const selectedMunicipality = MUNICIPALITIES.find(m => m.code === municipality) || MUNICIPALITIES[0];

  const taxRegimes = useMemo((): TaxRegime[] => {
    const rent = parseFloat(monthlyRent) || 0;
    const annualRent = rent * 12;
    const properties = parseInt(propertyCount) || 1;
    const totalAnnualRent = annualRent * properties;

    // Standard regime (25%)
    const standardTax = totalAnnualRent * 0.25;

    // Reduced regime (10%) - eligible if monthly rent ≤ €2,300
    const reducedEligible = rent <= 2300;
    const reducedTax = reducedEligible ? totalAnnualRent * 0.10 : 0;

    // RSAA regime (0%) - simplified criteria (below median income threshold)
    const rsaaEligible = totalAnnualRent <= 30000; // Simplified threshold
    const rsaaTax = rsaaEligible ? 0 : 0;

    // Non-resident regime (28%)
    const nonResidentTax = totalAnnualRent * 0.28;

    const regimes: TaxRegime[] = [
      {
        name: "Regime Geral",
        rate: 25,
        annualTax: standardTax,
        eligible: true,
        description: "Regime padrão para rendas",
        requirements: ["Todas as propriedades são elegíveis"],
      },
      {
        name: "Nova Taxa 10% (2026)",
        rate: 10,
        annualTax: reducedTax,
        eligible: reducedEligible,
        description: "Novo regime 2026 para rendas moderadas",
        requirements: [
          "Renda mensal ≤ €2.300",
          "Contratos de arrendamento habitacional",
          "Válido a partir de 2026"
        ],
      },
      {
        name: "RSAA (0%)",
        rate: 0,
        annualTax: rsaaTax,
        eligible: rsaaEligible,
        description: "Isenção total para rendimentos baixos",
        requirements: [
          "Rendimento anual total ≤ €30.000",
          "Primeira habitação própria"
        ],
      },
    ];

    // Add non-resident regime only for non-residents
    if (residency === "non-resident") {
      regimes.push({
        name: "Não Residentes",
        rate: 28,
        annualTax: nonResidentTax,
        eligible: true,
        description: "Regime especial para não residentes",
        requirements: ["Aplicável a proprietários não residentes em Portugal"],
      });
    }

    // Calculate savings relative to standard regime
    const lowestTax = Math.min(...regimes.filter(r => r.eligible).map(r => r.annualTax));
    regimes.forEach(regime => {
      if (regime.eligible) {
        regime.savings = standardTax - regime.annualTax;
      }
    });

    return regimes.sort((a, b) => {
      if (!a.eligible && b.eligible) return 1;
      if (a.eligible && !b.eligible) return -1;
      return a.annualTax - b.annualTax;
    });
  }, [monthlyRent, municipality, propertyCount, residency]);

  const bestRegime = taxRegimes.find(r => r.eligible) || taxRegimes[0];
  const totalAnnualRent = (parseFloat(monthlyRent) || 0) * 12 * (parseInt(propertyCount) || 1);

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
        }),
      });

      const data = await response.json();
      if (data.ok) {
        setEmailSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting email:', error);
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData
        webAppData={CALCULATOR_STRUCTURED_DATA.taxCalculator.webApp}
        faqData={CALCULATOR_STRUCTURED_DATA.taxCalculator.faqs}
      />
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition">
            ← Voltar ao início
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">
            Calculadora IRS 2026 - Nova Taxa 10% para Rendas Moderadas
          </h1>
          <p className="text-gray-600 mt-1">
            Compare a nova taxa de 10% (≤€2.300) com outros regimes fiscais e descubra o incentivo perverso
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* 2026 Update Highlight */}
        <div className="bg-blue-600 text-white rounded-xl p-6 mb-8">
          <div className="flex items-start">
            <div className="text-3xl mr-4">🆕</div>
            <div>
              <h2 className="text-xl font-bold mb-2">Nova Lei IRS 2026: Taxa Especial 10%</h2>
              <p className="text-blue-100 mb-3">
                A partir de 2026, rendas até €2.300/mês beneficiam de uma taxa reduzida de apenas 10%,
                em vez dos habituais 25%.
              </p>
              <div className="bg-blue-500/30 rounded-lg p-3">
                <p className="text-sm font-medium">
                  ⚠️ <strong>Atenção:</strong> Esta medida cria um incentivo perverso -
                  rendas de €2.300 podem gerar mais lucro líquido que rendas de €2.600!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Dados do Seu Arrendamento
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
                  placeholder="1000"
                  min="0"
                  step="50"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Concelho
                </label>
                <select
                  value={municipality}
                  onChange={(e) => setMunicipality(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {MUNICIPALITIES.map((muni) => (
                    <option key={muni.code} value={muni.code}>
                      {muni.name}
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1,2,3,4,5].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'propriedade' : 'propriedades'}
                    </option>
                  ))}
                </select>
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
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Residente
                  </button>
                  <button
                    onClick={() => setResidency("non-resident")}
                    className={`px-4 py-3 border rounded-lg font-medium transition ${
                      residency === "non-resident"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Não Residente
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Resumo dos Seus Dados
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Renda mensal total:</span>
                <span className="font-semibold">€{parseFloat(monthlyRent || "0").toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Renda anual total:</span>
                <span className="font-semibold">€{totalAnnualRent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Concelho:</span>
                <span className="font-semibold">{selectedMunicipality.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Propriedades:</span>
                <span className="font-semibold">{propertyCount}</span>
              </div>

              {bestRegime && (
                <div className="border-t pt-4 mt-6">
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-green-700 font-medium mb-1">
                      Melhor Regime para Si
                    </p>
                    <p className="text-lg font-bold text-green-800">
                      {bestRegime.name}
                    </p>
                    <p className="text-sm text-green-600">
                      Imposto anual: €{bestRegime.annualTax.toLocaleString()}
                    </p>
                    {bestRegime.savings && bestRegime.savings > 0 && (
                      <p className="text-sm text-green-600">
                        Poupança: €{bestRegime.savings.toLocaleString()}/ano
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Email Capture for Tax Report */}
        {bestRegime && bestRegime.savings && bestRegime.savings > 0 && !emailSubmitted && (
          <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 p-6">
            <div className="text-center">
              <div className="text-2xl mb-2">📧</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Receba o seu relatório fiscal personalizado
              </h3>
              <p className="text-gray-700 mb-4">
                Acabou de poupar <strong>€{bestRegime.savings.toLocaleString()}</strong> por ano!
                Receba um resumo detalhado com as suas poupanças fiscais e dicas para maximizar os benefícios.
              </p>

              <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="o-seu-email@exemplo.com"
                    required
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={emailLoading || !email}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {emailLoading ? 'A enviar...' : 'Receber Relatório'}
                  </button>
                </div>
              </form>

              <p className="text-xs text-gray-500 mt-3">
                💡 Também receberá dicas fiscais exclusivas e atualizações sobre novas ferramentas para senhorios
              </p>
            </div>
          </div>
        )}

        {/* Email Submitted Confirmation */}
        {emailSubmitted && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Relatório enviado com sucesso!
            </h3>
            <p className="text-green-700">
              Enviámos o seu relatório fiscal personalizado para <strong>{email}</strong>.
              Verifique a sua caixa de entrada (e pasta de spam) nos próximos minutos.
            </p>
          </div>
        )}

        {/* Tax Regime Cards */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Comparação de Regimes Fiscais
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {taxRegimes.map((regime, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-sm p-6 border-2 transition ${
                  regime === bestRegime && regime.eligible
                    ? "border-green-400 bg-green-50"
                    : regime.eligible
                    ? "border-gray-200 hover:border-blue-300"
                    : "border-gray-200 bg-gray-50 opacity-75"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {regime.name}
                  </h3>
                  {regime === bestRegime && regime.eligible && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Recomendado
                    </span>
                  )}
                  {!regime.eligible && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">
                      Não Elegível
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {regime.rate}%
                  </div>
                  <div className="text-sm text-gray-500">Taxa de imposto</div>
                </div>

                {regime.eligible && (
                  <div className="mb-4">
                    <div className="text-xl font-semibold text-gray-900">
                      €{regime.annualTax.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Imposto anual</div>

                    {regime.savings && regime.savings > 0 && (
                      <div className="mt-2">
                        <div className="text-sm font-medium text-green-600">
                          Poupança: €{regime.savings.toLocaleString()}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    {regime.description}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-700 mb-2">
                    Requisitos:
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {regime.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start">
                        <span className="text-gray-400 mr-1">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Perverse Incentive Demo */}
        <div className="mt-8 bg-orange-50 border border-orange-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            ⚠️ O Incentivo Perverso da Taxa 10%
          </h2>
          <p className="text-gray-700 mb-6">
            A nova taxa de 10% cria uma situação paradoxal: rendas mais baixas podem gerar mais lucro líquido que rendas mais altas.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* €2,300 rent */}
            <div className="bg-white rounded-lg border border-green-300 p-5">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">✅</span>
                <h3 className="text-lg font-semibold text-green-800">Renda €2.300/mês</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Renda anual:</span>
                  <span className="font-medium">€27.600</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxa aplicável:</span>
                  <span className="font-medium text-green-600">10%</span>
                </div>
                <div className="flex justify-between">
                  <span>Imposto:</span>
                  <span className="font-medium">€2.760</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold">Lucro líquido:</span>
                  <span className="font-bold text-green-600">€24.840</span>
                </div>
              </div>
            </div>

            {/* €2,600 rent */}
            <div className="bg-white rounded-lg border border-red-300 p-5">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">❌</span>
                <h3 className="text-lg font-semibold text-red-800">Renda €2.600/mês</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Renda anual:</span>
                  <span className="font-medium">€31.200</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxa aplicável:</span>
                  <span className="font-medium text-red-600">25%</span>
                </div>
                <div className="flex justify-between">
                  <span>Imposto:</span>
                  <span className="font-medium">€7.800</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold">Lucro líquido:</span>
                  <span className="font-bold text-red-600">€23.400</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-orange-100 rounded-lg p-4 text-center">
            <p className="text-orange-800 font-semibold text-lg">
              Resultado: €2.300/mês rende €1.440 mais por ano que €2.600/mês!
            </p>
            <p className="text-orange-700 text-sm mt-2">
              Esta diferença incentiva proprietários a manter rendas artificialmente baixas no limite de €2.300,
              reduzindo a oferta de habitação em faixas de preço intermédias.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Nota:</strong> Esta calculadora fornece uma estimativa baseada nos dados inseridos.
            Os valores reais podem variar dependendo de fatores específicos da sua situação fiscal.
            Consulte sempre um contabilista ou técnico oficial de contas para aconselhamento personalizado.
          </p>
        </div>

        {/* Other calculators */}
        <div className="mt-8 bg-green-50 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            Outras Calculadoras Úteis
          </h3>
          <p className="text-green-700 mb-4">
            Explore as nossas outras ferramentas fiscais especializadas para senhorios portugueses.
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
        <div className="mt-8 bg-blue-50 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Quer gerir as suas propriedades de forma mais eficiente?
          </h3>
          <p className="text-blue-700 mb-4">
            Junte-se à nossa lista de espera para ter acesso antecipado à plataforma completa Senhorio.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Juntar à Lista de Espera
          </Link>
        </div>
      </div>
    </div>
  );
}