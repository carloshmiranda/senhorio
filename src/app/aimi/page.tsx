"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import { CALCULATOR_STRUCTURED_DATA } from "@/lib/structured-data";

// Portuguese municipalities (mainland districts + islands)
const MUNICIPALITIES = [
  // Mainland Districts
  { name: "Aveiro", code: "aveiro", district: "Aveiro" },
  { name: "Águeda", code: "agueda", district: "Aveiro" },
  { name: "Beja", code: "beja", district: "Beja" },
  { name: "Braga", code: "braga", district: "Braga" },
  { name: "Bragança", code: "braganca", district: "Bragança" },
  { name: "Castelo Branco", code: "castelo-branco", district: "Castelo Branco" },
  { name: "Coimbra", code: "coimbra", district: "Coimbra" },
  { name: "Évora", code: "evora", district: "Évora" },
  { name: "Faro", code: "faro", district: "Faro" },
  { name: "Guarda", code: "guarda", district: "Guarda" },
  { name: "Leiria", code: "leiria", district: "Leiria" },
  { name: "Lisboa", code: "lisboa", district: "Lisboa" },
  { name: "Cascais", code: "cascais", district: "Lisboa" },
  { name: "Oeiras", code: "oeiras", district: "Lisboa" },
  { name: "Sintra", code: "sintra", district: "Lisboa" },
  { name: "Amadora", code: "amadora", district: "Lisboa" },
  { name: "Loures", code: "loures", district: "Lisboa" },
  { name: "Portalegre", code: "portalegre", district: "Portalegre" },
  { name: "Porto", code: "porto", district: "Porto" },
  { name: "Vila Nova de Gaia", code: "vila-nova-de-gaia", district: "Porto" },
  { name: "Matosinhos", code: "matosinhos", district: "Porto" },
  { name: "Maia", code: "maia", district: "Porto" },
  { name: "Santarém", code: "santarem", district: "Santarém" },
  { name: "Setúbal", code: "setubal", district: "Setúbal" },
  { name: "Almada", code: "almada", district: "Setúbal" },
  { name: "Viana do Castelo", code: "viana-do-castelo", district: "Viana do Castelo" },
  { name: "Vila Real", code: "vila-real", district: "Vila Real" },
  { name: "Viseu", code: "viseu", district: "Viseu" },
  // Azores
  { name: "Angra do Heroísmo", code: "angra-heroismo", district: "Açores" },
  { name: "Horta", code: "horta", district: "Açores" },
  { name: "Ponta Delgada", code: "ponta-delgada", district: "Açores" },
  { name: "Praia da Vitória", code: "praia-vitoria", district: "Açores" },
  { name: "Ribeira Grande", code: "ribeira-grande", district: "Açores" },
  { name: "Santa Cruz da Graciosa", code: "santa-cruz-graciosa", district: "Açores" },
  { name: "Vila do Porto", code: "vila-porto", district: "Açores" },
  // Madeira
  { name: "Funchal", code: "funchal", district: "Madeira" },
  { name: "Machico", code: "machico", district: "Madeira" },
  { name: "Santa Cruz", code: "santa-cruz", district: "Madeira" },
].sort((a, b) => a.name.localeCompare(b.name, 'pt'));

interface AIMIResult {
  exempt: boolean;
  annualSavings: number;
  reason: string;
  explanation: string;
}

interface Language {
  code: 'pt' | 'en';
  name: string;
  flag: string;
}

const LANGUAGES: Language[] = [
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

// Text content in both languages
const TEXTS = {
  pt: {
    pageTitle: "Calculadora de Isenção AIMI 2026",
    pageDescription: "Verifique se qualifica para a isenção AIMI sob as novas regras de 2026",
    backToHome: "← Voltar ao início",
    propertyDataTitle: "Dados das Suas Propriedades",
    municipality: "Concelho",
    municipalityPlaceholder: "Selecione o concelho",
    monthlyRent: "Renda Mensal (€)",
    properties: "Número de Propriedades",
    property: "propriedade",
    properties_plural: "propriedades",
    resultTitle: "Resultado da Análise AIMI",
    totalMonthlyRent: "Renda mensal total:",
    totalAnnualRent: "Renda anual total:",
    selectedMunicipality: "Concelho:",
    exemptTitle: "✅ Isento de AIMI",
    notExemptTitle: "❌ Não Isento de AIMI",
    exemptDescription: "Qualifica para a isenção AIMI de 2026",
    notExemptDescription: "Não qualifica para a isenção AIMI",
    annualSavings: "Poupança anual:",
    reason: "Motivo:",
    about2026Rules: "Sobre as Regras AIMI 2026",
    aimiExplanationTitle: "O que é o AIMI?",
    aimiExplanation: "O Adicional ao Imposto Municipal sobre Imóveis (AIMI) é um imposto adicional sobre imóveis de elevado valor. Em 2026, foram introduzidas novas isenções para promover habitação a preços acessíveis.",
    exemptionCriteriaTitle: "Critérios de Isenção 2026",
    exemptionCriteria: [
      "Renda mensal por propriedade ≤ €2.300",
      "Imóvel destinado a arrendamento habitacional",
      "Contribuição para habitação a preços acessíveis",
      "Cumprir requisitos de registo e comunicação"
    ],
    whatIsAIMI: "O AIMI aplica-se a imóveis com valor patrimonial elevado. A taxa base é de 0,4% para pessoas singulares, mas existem várias isenções, incluindo a nova isenção de 2026 para arrendamento acessível.",
    importantNotes: "Notas Importantes",
    notesList: [
      "Esta calculadora fornece uma estimativa baseada nas regras de 2026",
      "A isenção aplica-se apenas a arrendamento habitacional",
      "É necessário cumprir obrigações de comunicação às Finanças",
      "Consulte sempre um contabilista para situações específicas"
    ],
    disclaimer: "Aviso: Esta calculadora é informativa. Os valores reais podem variar dependendo de fatores específicos. Consulte sempre um técnico oficial de contas.",
    ctaTitle: "Precisa de mais ferramentas fiscais?",
    ctaDescription: "Explore as nossas outras calculadoras e junte-se à lista de espera para acesso antecipado à plataforma completa.",
    joinWaitlist: "Juntar à Lista de Espera",
    // Results
    exemptLowRent: "Todas as rendas estão abaixo do limite de €2.300/mês",
    notExemptHighRent: "Uma ou mais rendas excedem €2.300/mês",
    savingsEstimate: "Estimativa baseada na taxa AIMI de 0,4%",
    // Email capture
    emailCaptureTitle: "Receba o seu relatório AIMI personalizado",
    emailCaptureDescription: "Qualifica para a isenção AIMI! Receba um resumo detalhado com as suas poupanças e dicas para maximizar os benefícios fiscais.",
    emailPlaceholder: "o-seu-email@exemplo.com",
    receiveReport: "Receber Relatório",
    sending: "A enviar...",
    emailSuccessTitle: "Relatório enviado com sucesso!",
    emailSuccessDescription: "Enviámos o seu relatório AIMI personalizado para",
    emailSuccessNote: "Verifique a sua caixa de entrada (e pasta de spam) nos próximos minutos.",
    emailFooterNote: "💡 Também receberá dicas fiscais exclusivas e atualizações sobre ferramentas para senhorios"
  },
  en: {
    pageTitle: "AIMI Exemption Calculator 2026",
    pageDescription: "Check if you qualify for AIMI exemption under the new 2026 rules",
    backToHome: "← Back to home",
    propertyDataTitle: "Your Property Data",
    municipality: "Municipality",
    municipalityPlaceholder: "Select municipality",
    monthlyRent: "Monthly Rent (€)",
    properties: "Number of Properties",
    property: "property",
    properties_plural: "properties",
    resultTitle: "AIMI Analysis Result",
    totalMonthlyRent: "Total monthly rent:",
    totalAnnualRent: "Total annual rent:",
    selectedMunicipality: "Municipality:",
    exemptTitle: "✅ AIMI Exempt",
    notExemptTitle: "❌ Not AIMI Exempt",
    exemptDescription: "You qualify for the 2026 AIMI exemption",
    notExemptDescription: "You don't qualify for AIMI exemption",
    annualSavings: "Annual savings:",
    reason: "Reason:",
    about2026Rules: "About AIMI 2026 Rules",
    aimiExplanationTitle: "What is AIMI?",
    aimiExplanation: "The Additional Tax on Real Estate (AIMI) is an additional tax on high-value properties. In 2026, new exemptions were introduced to promote affordable housing.",
    exemptionCriteriaTitle: "2026 Exemption Criteria",
    exemptionCriteria: [
      "Monthly rent per property ≤ €2,300",
      "Property used for residential rental",
      "Contributing to affordable housing",
      "Meet registration and reporting requirements"
    ],
    whatIsAIMI: "AIMI applies to properties with high patrimonial value. The base rate is 0.4% for individuals, but there are several exemptions, including the new 2026 exemption for affordable rental.",
    importantNotes: "Important Notes",
    notesList: [
      "This calculator provides an estimate based on 2026 rules",
      "The exemption applies only to residential rental",
      "You must comply with reporting obligations to Tax Authority",
      "Always consult an accountant for specific situations"
    ],
    disclaimer: "Disclaimer: This calculator is informative. Actual values may vary depending on specific factors. Always consult a certified public accountant.",
    ctaTitle: "Need more tax tools?",
    ctaDescription: "Explore our other calculators and join the waitlist for early access to the complete platform.",
    joinWaitlist: "Join Waitlist",
    // Results
    exemptLowRent: "All rents are below the €2,300/month threshold",
    notExemptHighRent: "One or more rents exceed €2,300/month",
    savingsEstimate: "Estimate based on 0.4% AIMI rate",
    // Email capture
    emailCaptureTitle: "Receive your personalized AIMI report",
    emailCaptureDescription: "You qualify for AIMI exemption! Receive a detailed summary with your savings and tips to maximize tax benefits.",
    emailPlaceholder: "your-email@example.com",
    receiveReport: "Get Report",
    sending: "Sending...",
    emailSuccessTitle: "Report sent successfully!",
    emailSuccessDescription: "We've sent your personalized AIMI report to",
    emailSuccessNote: "Check your inbox (and spam folder) in the next few minutes.",
    emailFooterNote: "💡 You'll also receive exclusive tax tips and updates on landlord tools"
  }
};

export default function AIMICalculatorPage() {
  const [monthlyRent, setMonthlyRent] = useState<string>("1500");
  const [municipality, setMunicipality] = useState<string>("lisboa");
  const [propertyCount, setPropertyCount] = useState<string>("1");
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');
  const [email, setEmail] = useState<string>("");
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);
  const [emailLoading, setEmailLoading] = useState<boolean>(false);

  const t = TEXTS[language];
  const selectedMunicipality = MUNICIPALITIES.find(m => m.code === municipality) || MUNICIPALITIES[0];

  const result = useMemo((): AIMIResult => {
    const rent = parseFloat(monthlyRent) || 0;
    const properties = parseInt(propertyCount) || 1;
    const rentPerProperty = rent / properties;

    // AIMI 2026 exemption: rent per property must be ≤ €2,300/month
    const exempt = rentPerProperty <= 2300;

    // Estimate AIMI savings (simplified calculation)
    // AIMI is typically 0.4% of property value above threshold
    // We'll estimate based on rent (very rough approximation)
    const estimatedPropertyValue = rent * 12 * 20; // 20x annual rent rule of thumb
    const aimiRate = 0.004; // 0.4%
    const estimatedAIMI = estimatedPropertyValue * aimiRate * properties;

    return {
      exempt,
      annualSavings: exempt ? estimatedAIMI : 0,
      reason: exempt ? t.exemptLowRent : t.notExemptHighRent,
      explanation: t.savingsEstimate
    };
  }, [monthlyRent, propertyCount, t]);

  const totalAnnualRent = (parseFloat(monthlyRent) || 0) * 12;

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
          source: 'aimi_calculator',
          metadata: {
            monthlyRent: parseFloat(monthlyRent),
            municipality,
            propertyCount: parseInt(propertyCount),
            language,
            aimiExempt: result.exempt,
            annualSavings: result.annualSavings,
            reason: result.reason
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
    <div className="min-h-screen bg-gray-50">
      <StructuredData
        webAppData={CALCULATOR_STRUCTURED_DATA.aimiCalculator.webApp}
        faqData={CALCULATOR_STRUCTURED_DATA.aimiCalculator.faqs}
      />
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-start">
            <div>
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition">
                {t.backToHome}
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 mt-2">
                {t.pageTitle}
              </h1>
              <p className="text-gray-600 mt-1">
                {t.pageDescription}
              </p>
            </div>

            {/* Language Toggle */}
            <div className="flex space-x-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    language === lang.code
                      ? "bg-brand-100 text-brand-700 border border-brand-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {lang.flag} {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              {t.propertyDataTitle}
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.monthlyRent}
                </label>
                <input
                  type="number"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(e.target.value)}
                  placeholder="1500"
                  min="0"
                  step="100"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.municipality}
                </label>
                <select
                  value={municipality}
                  onChange={(e) => setMunicipality(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                >
                  <option value="">{t.municipalityPlaceholder}</option>
                  {MUNICIPALITIES.map((muni) => (
                    <option key={muni.code} value={muni.code}>
                      {muni.name} ({muni.district})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.properties}
                </label>
                <select
                  value={propertyCount}
                  onChange={(e) => setPropertyCount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                >
                  {[1,2,3,4,5,6,7,8,9,10].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? t.property : t.properties_plural}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              {t.resultTitle}
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">{t.totalMonthlyRent}</span>
                <span className="font-semibold">€{parseFloat(monthlyRent || "0").toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t.totalAnnualRent}</span>
                <span className="font-semibold">€{totalAnnualRent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t.selectedMunicipality}</span>
                <span className="font-semibold">{selectedMunicipality.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t.properties}:</span>
                <span className="font-semibold">{propertyCount}</span>
              </div>

              <div className="border-t pt-4 mt-6">
                <div className={`rounded-lg p-4 ${result.exempt ? 'bg-green-50' : 'bg-red-50'}`}>
                  <p className={`text-lg font-bold mb-1 ${result.exempt ? 'text-green-800' : 'text-red-800'}`}>
                    {result.exempt ? t.exemptTitle : t.notExemptTitle}
                  </p>
                  <p className={`text-sm mb-2 ${result.exempt ? 'text-green-700' : 'text-red-700'}`}>
                    {result.exempt ? t.exemptDescription : t.notExemptDescription}
                  </p>
                  <p className={`text-sm ${result.exempt ? 'text-green-600' : 'text-red-600'}`}>
                    <strong>{t.reason}</strong> {result.reason}
                  </p>
                  {result.exempt && result.annualSavings > 0 && (
                    <div className="mt-3 pt-3 border-t border-green-200">
                      <p className="text-sm text-green-600">
                        <strong>{t.annualSavings}</strong> €{result.annualSavings.toLocaleString()}
                      </p>
                      <p className="text-xs text-green-500 mt-1">
                        {result.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {t.about2026Rules}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t.aimiExplanationTitle}
              </h3>
              <p className="text-gray-600 mb-4">
                {t.aimiExplanation}
              </p>
              <p className="text-gray-600 text-sm">
                {t.whatIsAIMI}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t.exemptionCriteriaTitle}
              </h3>
              <ul className="space-y-2">
                {t.exemptionCriteria.map((criteria, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-600">
                    <span className="text-green-500 mr-2 mt-0.5">✓</span>
                    {criteria}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Email Capture for AIMI Report */}
        {result.exempt && result.annualSavings > 0 && !emailSubmitted && (
          <div className="mt-8 bg-gradient-to-r from-green-50 to-brand-50 rounded-xl border border-green-200 p-6">
            <div className="text-center">
              <div className="text-2xl mb-2">📧</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t.emailCaptureTitle}
              </h3>
              <p className="text-gray-700 mb-4">
                {t.emailCaptureDescription}
              </p>

              <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    required
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={emailLoading || !email}
                    className="px-6 py-3 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {emailLoading ? t.sending : t.receiveReport}
                  </button>
                </div>
              </form>

              <p className="text-xs text-gray-500 mt-3">
                {t.emailFooterNote}
              </p>
            </div>
          </div>
        )}

        {/* Email Submitted Confirmation */}
        {emailSubmitted && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              {t.emailSuccessTitle}
            </h3>
            <p className="text-green-700">
              {t.emailSuccessDescription} <strong>{email}</strong>.
              {" " + t.emailSuccessNote}
            </p>
          </div>
        )}

        {/* Important Notes */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-800 mb-3">
            {t.importantNotes}
          </h3>
          <ul className="space-y-2">
            {t.notesList.map((note, index) => (
              <li key={index} className="text-sm text-yellow-700 flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                {note}
              </li>
            ))}
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-gray-100 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>{language === 'pt' ? 'Aviso' : 'Disclaimer'}:</strong> {t.disclaimer}
          </p>
        </div>

        {/* CTA to other calculators */}
        <div className="mt-8 bg-brand-50 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-brand-900 mb-2">
            {t.ctaTitle}
          </h3>
          <p className="text-brand-700 mb-4">
            {t.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/calculadora"
              className="px-6 py-3 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition"
            >
              {language === 'pt' ? 'Simulador Fiscal' : 'Tax Calculator'}
            </Link>
            <Link
              href="/calculadora-rendas"
              className="px-6 py-3 border border-brand-300 text-brand-700 rounded-lg font-medium hover:bg-brand-50 transition"
            >
              {language === 'pt' ? 'Calculadora de Rendas' : 'Rent Calculator'}
            </Link>
            <Link
              href="/#waitlist"
              className="px-6 py-3 border border-brand-300 text-brand-700 rounded-lg font-medium hover:bg-brand-50 transition"
            >
              {t.joinWaitlist}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}