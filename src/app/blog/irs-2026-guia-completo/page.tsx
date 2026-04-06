import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IRS 2026 Guia Completo: Nova Taxa 10%, RSAA 0% e Regime Geral | Senhorio",
  description: "Guia completo IRS 2026 para senhorios: nova taxa 10% para rendas ≤€2.300, regime RSAA 0%, comparação de todos os regimes fiscais. Simulador incluído para maximizar poupanças.",
  keywords: [
    "IRS 2026 guia completo",
    "taxa IRS 10% rendas 2026",
    "regime RSAA 0% senhorios",
    "IRS arrendamento 2026",
    "simulador IRS rendas",
    "regime fiscal senhorios 2026",
    "declaração IRS arrendamento",
    "poupança fiscal rendas 2026",
    "não residentes IRS 28%",
    "englobamento vs taxa liberatória",
    "anexo F IRS 2026",
    "despesas dedutíveis arrendamento",
    "otimização fiscal senhorios",
    "calculadora IRS Portugal",
    "imposto rendas Portugal 2026"
  ],
  openGraph: {
    title: "IRS 2026 Guia Completo: Nova Taxa 10% e Regime RSAA 0%",
    description: "O guia mais completo sobre IRS para senhorios em 2026. Nova taxa 10%, regime RSAA 0% e todas as alterações fiscais explicadas.",
    type: "article",
    publishedTime: "2026-04-06T10:00:00.000Z",
    authors: ["Senhorio"],
    tags: ["IRS 2026", "Taxa 10%", "RSAA", "Senhorios", "Guia Fiscal"],
  },
  alternates: {
    canonical: "https://senhorio.vercel.app/blog/irs-2026-guia-completo",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "IRS 2026 Guia Completo: Nova Taxa 10%, RSAA 0% e Regime Geral",
  "description": "Guia completo sobre as mudanças fiscais de 2026 para proprietários de imóveis. Nova taxa 10%, regime RSAA 0% e comparação de todos os regimes.",
  "author": {
    "@type": "Organization",
    "name": "Senhorio",
    "url": "https://senhorio.vercel.app"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Senhorio",
    "logo": {
      "@type": "ImageObject",
      "url": "https://senhorio.vercel.app/logo.png"
    }
  },
  "datePublished": "2026-04-06T10:00:00.000Z",
  "dateModified": "2026-04-06T10:00:00.000Z",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://senhorio.vercel.app/blog/irs-2026-guia-completo"
  },
  "keywords": "IRS 2026, taxa 10% rendas, regime RSAA 0%, senhorios, arrendamento",
  "articleSection": "Tax Guide",
  "wordCount": 2800,
  "timeRequired": "PT12M"
};

export default function IRS2026GuiaCompleto() {
  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-700 transition">
            ← Voltar ao Blog
          </Link>
        </div>
      </header>

      {/* Article */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <article>
          {/* Alert Banner */}
          <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  🎉 Alterações Fiscais 2026 em Vigor
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    As novas regras fiscais de 2026 já estão em vigor! Nova taxa de 10% para rendas até €2.300
                    pode poupar-lhe entre €1.080 e €4.140 por ano.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-4">
              🆕 IRS 2026 - Guia Atualizado
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              IRS 2026: Guia Completo para Senhorios
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Tudo o que precisa de saber sobre a nova taxa de 10%, regime RSAA 0%
              e como escolher o melhor regime fiscal para maximizar as suas poupanças
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/simulador-irs"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
              >
                🧮 Simular o Seu IRS 2026
              </Link>
              <Link
                href="/calculadora"
                className="border border-green-300 text-green-700 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition"
              >
                📊 Calculadora IRS
              </Link>
            </div>
          </div>

          {/* Quick Summary */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">
              📋 Resumo Executivo: O Que Mudou em 2026
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">Nova Taxa 10%</h3>
                <p className="text-sm text-blue-700">
                  Para rendas até €2.300/mês. Poupança de 60% face aos antigos 25%.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">RSAA Mantido</h3>
                <p className="text-sm text-blue-700">
                  Continua com 0% para rendimentos baixos e habitação própria.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">Não Residentes</h3>
                <p className="text-sm text-blue-700">
                  Taxa mantida nos 28% para proprietários não residentes.
                </p>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">📖 Índice</h2>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              <a href="#regime-10" className="text-blue-600 hover:text-blue-800">1. Nova Taxa 10% (2026-2029)</a>
              <a href="#regime-rsaa" className="text-blue-600 hover:text-blue-800">2. Regime RSAA (0%)</a>
              <a href="#regime-geral" className="text-blue-600 hover:text-blue-800">3. Regime Geral (25%)</a>
              <a href="#nao-residentes" className="text-blue-600 hover:text-blue-800">4. Não Residentes (28%)</a>
              <a href="#comparacao" className="text-blue-600 hover:text-blue-800">5. Comparação de Cenários</a>
              <a href="#como-escolher" className="text-blue-600 hover:text-blue-800">6. Como Escolher o Melhor</a>
              <a href="#declaracao" className="text-blue-600 hover:text-blue-800">7. Como Declarar</a>
              <a href="#casos-praticos" className="text-blue-600 hover:text-blue-800">8. Casos Práticos</a>
              <a href="#efeito-degrau" className="text-blue-600 hover:text-blue-800">9. Efeito Degrau: o Limiar €2.300</a>
              <a href="#deducoes-permitidas" className="text-blue-600 hover:text-blue-800">10. Deduções Permitidas</a>
              <a href="#englobamento" className="text-blue-600 hover:text-blue-800">11. Englobamento vs Taxa Autónoma</a>
              <a href="#isencao-mais-valias" className="text-blue-600 hover:text-blue-800">12. Isenção de Mais-Valias</a>
              <a href="#prazos-obrigacoes" className="text-blue-600 hover:text-blue-800">13. Prazos e Obrigações</a>
              <a href="#faq" className="text-blue-600 hover:text-blue-800">14. FAQ</a>
            </div>
          </div>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none">
            {/* Section 1: Nova Taxa 10% */}
            <section id="regime-10" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-green-200 pb-2">
                1. Nova Taxa 10% (2026-2029): A Revolução Fiscal
              </h2>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-green-800 mb-3">
                  🎯 O Que É a Nova Taxa 10%?
                </h3>
                <p className="text-green-700 mb-4">
                  A nova taxa de 10% é uma medida fiscal revolucionária introduzida em 2026 para incentivar
                  o arrendamento a preços moderados. Aplica-se exclusivamente a rendas até €2.300 mensais
                  e representa uma redução de 60% face à taxa padrão de 25%.
                </p>
                <div className="bg-white border border-green-300 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 mb-2">Critérios de Elegibilidade:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>✅ Renda mensal máxima: €2.300</li>
                    <li>✅ Contratos de arrendamento habitacional</li>
                    <li>✅ Aplicável a contratos novos e existentes</li>
                    <li>✅ Válido de 2026 a 2029 (4 anos garantidos)</li>
                    <li>✅ Compatível com deduções de despesas</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Impacto Financeiro da Taxa 10%
              </h3>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Renda Mensal</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Renda Anual</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IRS 10%</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IRS 25% (Anterior)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Poupança Anual</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900">€1.000</td>
                      <td className="px-6 py-4 text-sm text-gray-900">€12.000</td>
                      <td className="px-6 py-4 text-sm text-green-600 font-medium">€1.200</td>
                      <td className="px-6 py-4 text-sm text-gray-500">€3.000</td>
                      <td className="px-6 py-4 text-sm text-green-600 font-bold">€1.800</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">€1.500</td>
                      <td className="px-6 py-4 text-sm text-gray-900">€18.000</td>
                      <td className="px-6 py-4 text-sm text-green-600 font-medium">€1.800</td>
                      <td className="px-6 py-4 text-sm text-gray-500">€4.500</td>
                      <td className="px-6 py-4 text-sm text-green-600 font-bold">€2.700</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900">€2.300</td>
                      <td className="px-6 py-4 text-sm text-gray-900">€27.600</td>
                      <td className="px-6 py-4 text-sm text-green-600 font-medium">€2.760</td>
                      <td className="px-6 py-4 text-sm text-gray-500">€6.900</td>
                      <td className="px-6 py-4 text-sm text-green-600 font-bold">€4.140</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="text-lg font-medium text-yellow-800 mb-3">
                  ⚠️ O Incentivo Perverso dos €2.300
                </h4>
                <p className="text-yellow-700 mb-4">
                  A nova lei cria uma situação paradoxal: rendas de €2.300/mês podem gerar mais
                  lucro líquido que rendas superiores. Isto acontece porque ultrapassar os €2.300
                  faz perder o benefício da taxa 10%, voltando aos 25%.
                </p>
                <div className="bg-white border border-yellow-300 rounded-lg p-4">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-yellow-800">Renda €2.300/mês:</p>
                      <p>Lucro líquido: €24.840/ano</p>
                    </div>
                    <div>
                      <p className="font-medium text-yellow-800">Renda €2.600/mês:</p>
                      <p>Lucro líquido: €23.400/ano</p>
                    </div>
                  </div>
                  <p className="text-yellow-600 mt-2 font-medium">
                    Diferença: €2.300/mês rende €1.440 mais por ano!
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Regime RSAA */}
            <section id="regime-rsaa" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">
                2. Regime RSAA (0%): Isenção Total Para Habitação Social
              </h2>

              <p className="text-gray-700 mb-6">
                O Regime de Apoio ao Arrendamento Acessível (RSAA) continua a oferecer isenção total
                de IRS para proprietários que arrendem a preços acessíveis, contribuindo para resolver
                a crise habitacional.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">
                  🏠 Requisitos do Regime RSAA
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-blue-700 mb-2">Critérios Obrigatórios:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>✅ Arrendamento para habitação própria</li>
                      <li>✅ Renda abaixo de 80% da mediana municipal</li>
                      <li>✅ Contrato de arrendamento mínimo 5 anos</li>
                      <li>✅ Inquilino com rendimento limitado</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-700 mb-2">Benefícios Fiscais:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>🎯 IRS: 0% (isenção total)</li>
                      <li>🎯 IMI: Redução até 50%</li>
                      <li>🎯 Dedução total despesas</li>
                      <li>🎯 Sem limite temporal</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Limites de Renda RSAA por Distrito (2026)
              </h3>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Distrito/Concelho</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Limite T2</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Limite T3</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Poupança Máxima/ano</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900">Lisboa</td>
                      <td className="px-6 py-4 text-sm text-gray-900">€760</td>
                      <td className="px-6 py-4 text-sm text-gray-900">€950</td>
                      <td className="px-6 py-4 text-sm text-green-600 font-medium">€2.850</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">Porto</td>
                      <td className="px-6 py-4 text-sm text-gray-900">€650</td>
                      <td className="px-6 py-4 text-sm text-gray-900">€800</td>
                      <td className="px-6 py-4 text-sm text-green-600 font-medium">€2.400</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900">Braga</td>
                      <td className="px-6 py-4 text-sm text-gray-900">€500</td>
                      <td className="px-6 py-4 text-sm text-gray-900">€600</td>
                      <td className="px-6 py-4 text-sm text-green-600 font-medium">€1.800</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="text-lg font-medium text-green-800 mb-3">
                  💡 Estratégia RSAA vs Taxa 10%
                </h4>
                <p className="text-green-700 mb-4">
                  Para decidir entre RSAA e a nova taxa 10%, compare o limite RSAA da sua região
                  com os €2.300 da taxa 10%. Se pode arrendar acima do limite RSAA mas abaixo
                  dos €2.300, a taxa 10% será mais vantajosa.
                </p>
                <p className="text-green-700 text-sm">
                  <strong>Exemplo:</strong> Em Lisboa, se conseguir €1.500/mês (acima do RSAA mas dentro da taxa 10%),
                  pagará apenas €1.800/ano de IRS em vez de €3.750 no regime geral.
                </p>
              </div>
            </section>

            {/* Section 3: Regime Geral */}
            <section id="regime-geral" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-orange-200 pb-2">
                3. Regime Geral (25%): Quando Aplicar
              </h2>

              <p className="text-gray-700 mb-6">
                O regime geral continua a ser a opção padrão para propriedades que não se qualificam
                para os regimes especiais. Aplica-se principalmente a rendas superiores a €2.300 mensais
                ou situações que não cumprem os critérios RSAA.
              </p>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-orange-800 mb-3">
                  📊 Características do Regime Geral
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-orange-700 mb-2">Aplicação:</h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• Rendas &gt; €2.300/mês</li>
                      <li>• Propriedades não elegíveis RSAA</li>
                      <li>• Múltiplas propriedades</li>
                      <li>• Arrendamento comercial</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-orange-700 mb-2">Benefícios:</h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• Dedução despesas comprovadas</li>
                      <li>• Sem limites de renda</li>
                      <li>• Flexibilidade contratual</li>
                      <li>• Englobamento opcional</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Deduções Permitidas no Regime Geral
              </h3>

              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Despesas Dedutíveis:</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span>Obras de conservação e manutenção</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span>Comissões de mediação imobiliária</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span>Seguros da habitação</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span>Juros de empréstimos bancários</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span>Despesas de condomínio</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Limites e Condições:</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">ⓘ</span>
                        <span>Máximo 15% do rendimento bruto</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">ⓘ</span>
                        <span>Documentos comprovativos obrigatórios</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">ⓘ</span>
                        <span>Despesas relacionadas com o imóvel</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">ⓘ</span>
                        <span>Obras de melhoria limitadas</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Não Residentes */}
            <section id="nao-residentes" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-purple-200 pb-2">
                4. Regime Não Residentes (28%): Regras Especiais
              </h2>

              <p className="text-gray-700 mb-6">
                Proprietários não residentes fiscais em Portugal estão sujeitos a regras específicas,
                com uma taxa fixa de 28% e limitações nas deduções. Este regime mantém-se inalterado em 2026.
              </p>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">
                  🌍 Características Não Residentes
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-purple-700 mb-2">Aplicação:</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Residência fiscal fora de Portugal</li>
                      <li>• Permanência &lt; 183 dias/ano</li>
                      <li>• Centro de interesses noutro país</li>
                      <li>• Taxa fixa 28%</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-700 mb-2">Limitações:</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Sem dedução de despesas</li>
                      <li>• Não elegível taxa 10%</li>
                      <li>• Sem englobamento</li>
                      <li>• Retenção na fonte obrigatória</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Comparação Não Residentes vs Residentes
              </h3>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Renda Anual</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Não Residentes (28%)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Residentes (10%)*</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Diferença</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900">€12.000</td>
                      <td className="px-6 py-4 text-sm text-purple-600">€3.360</td>
                      <td className="px-6 py-4 text-sm text-green-600">€1.200</td>
                      <td className="px-6 py-4 text-sm text-red-600 font-medium">€2.160 mais</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">€18.000</td>
                      <td className="px-6 py-4 text-sm text-purple-600">€5.040</td>
                      <td className="px-6 py-4 text-sm text-green-600">€1.800</td>
                      <td className="px-6 py-4 text-sm text-red-600 font-medium">€3.240 mais</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900">€27.600</td>
                      <td className="px-6 py-4 text-sm text-purple-600">€7.728</td>
                      <td className="px-6 py-4 text-sm text-green-600">€2.760</td>
                      <td className="px-6 py-4 text-sm text-red-600 font-medium">€4.968 mais</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-gray-500 p-4">* Para rendas ≤ €2.300/mês</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="text-lg font-medium text-blue-800 mb-3">
                  💡 Estratégia para Não Residentes
                </h4>
                <p className="text-blue-700 mb-4">
                  Se é proprietário não residente, considere estabelecer residência fiscal em Portugal
                  para beneficiar da nova taxa 10%. A diferença pode justificar largamente a mudança,
                  especialmente para múltiplas propriedades.
                </p>
                <div className="bg-white border border-blue-300 rounded-lg p-4">
                  <p className="text-blue-700 text-sm">
                    <strong>Exemplo:</strong> Com €50.000/ano em rendas, um não residente paga €14.000 de IRS.
                    Como residente com taxa 10%, pagaria apenas €5.000 - poupança de €9.000/ano.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: Comparação de Cenários */}
            <section id="comparacao" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-green-200 pb-2">
                5. Comparação de Cenários: Qual o Melhor para Si?
              </h2>

              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">
                    🏆 Cenário Vencedor: Taxa 10%
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white border border-green-300 rounded-lg p-4">
                      <h4 className="font-medium text-green-700 mb-2">Perfil Ideal:</h4>
                      <ul className="text-sm text-green-600 space-y-1">
                        <li>• Renda entre €1.000-€2.300/mês</li>
                        <li>• Proprietário residente fiscal</li>
                        <li>• Arrendamento habitacional</li>
                        <li>• Flexibilidade de preços</li>
                      </ul>
                    </div>
                    <p className="text-green-700 text-sm">
                      <strong>Poupança típica:</strong> €1.800-€4.140/ano face ao regime geral
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">
                    🎯 Cenário Especial: RSAA 0%
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white border border-blue-300 rounded-lg p-4">
                      <h4 className="font-medium text-blue-700 mb-2">Perfil Ideal:</h4>
                      <ul className="text-sm text-blue-600 space-y-1">
                        <li>• Imóvel em zona carenciada</li>
                        <li>• Compromisso social habitacional</li>
                        <li>• Rendas abaixo mediana municipal</li>
                        <li>• Contratos longos (5+ anos)</li>
                      </ul>
                    </div>
                    <p className="text-blue-700 text-sm">
                      <strong>Benefício:</strong> Isenção total + redução IMI até 50%
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  📊 Simulação Comparativa (Propriedade em Lisboa)
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Renda Mensal</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">RSAA (0%)</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Taxa 10%</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Geral (25%)</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Não Res. (28%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-4 text-sm text-gray-900">€750</td>
                        <td className="px-4 py-4 text-sm text-green-600 font-bold">€0 ✓</td>
                        <td className="px-4 py-4 text-sm text-gray-400">N/A</td>
                        <td className="px-4 py-4 text-sm text-gray-600">€2.250</td>
                        <td className="px-4 py-4 text-sm text-gray-600">€2.520</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">€1.500</td>
                        <td className="px-4 py-4 text-sm text-red-500">Não elegível</td>
                        <td className="px-4 py-4 text-sm text-green-600 font-bold">€1.800 ✓</td>
                        <td className="px-4 py-4 text-sm text-gray-600">€4.500</td>
                        <td className="px-4 py-4 text-sm text-gray-600">€5.040</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4 text-sm text-gray-900">€2.300</td>
                        <td className="px-4 py-4 text-sm text-red-500">Não elegível</td>
                        <td className="px-4 py-4 text-sm text-green-600 font-bold">€2.760 ✓</td>
                        <td className="px-4 py-4 text-sm text-gray-600">€6.900</td>
                        <td className="px-4 py-4 text-sm text-gray-600">€7.728</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">€3.000</td>
                        <td className="px-4 py-4 text-sm text-red-500">Não elegível</td>
                        <td className="px-4 py-4 text-sm text-red-500">Não elegível</td>
                        <td className="px-4 py-4 text-sm text-orange-600 font-bold">€9.000 ✓</td>
                        <td className="px-4 py-4 text-sm text-gray-600">€10.080</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Section 6: Como Escolher */}
            <section id="como-escolher" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">
                6. Como Escolher o Melhor Regime Para o Seu Caso
              </h2>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-8 mb-8 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  🧮 Use o Nosso Simulador
                </h3>
                <p className="text-gray-700 mb-6">
                  A forma mais rápida de descobrir qual o melhor regime para si é usar o nosso
                  simulador gratuito. Insira os dados da sua propriedade e veja instantaneamente
                  qual o regime que maximiza as suas poupanças.
                </p>
                <Link
                  href="/simulador-irs"
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition inline-block"
                >
                  🚀 Simular o Meu Caso Agora
                </Link>
              </div>

              <div className="space-y-6">
                <div className="bg-white border-l-4 border-green-400 p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">
                    ✅ Passo 1: Verificar Elegibilidade
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Para Taxa 10%:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Renda ≤ €2.300/mês</li>
                        <li>• Residente fiscal português</li>
                        <li>• Arrendamento habitacional</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Para RSAA 0%:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Renda abaixo mediana municipal</li>
                        <li>• Arrendamento habitação própria</li>
                        <li>• Contrato mínimo 5 anos</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-l-4 border-blue-400 p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">
                    🔍 Passo 2: Calcular Cenários
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Compare o imposto que pagará em cada regime elegível. Não esqueça de considerar:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Deduções de despesas (onde aplicável)</li>
                    <li>• Reduções IMI (regime RSAA)</li>
                    <li>• Compromissos contratuais (prazos mínimos)</li>
                    <li>• Flexibilidade futura (alterações de renda)</li>
                  </ul>
                </div>

                <div className="bg-white border-l-4 border-orange-400 p-6">
                  <h3 className="text-lg font-semibold text-orange-800 mb-3">
                    ⚖️ Passo 3: Avaliar Fatores Não Fiscais
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Considere também:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Estabilidade do inquilino</li>
                        <li>• Procura no seu mercado local</li>
                        <li>• Custos de gestão</li>
                        <li>• Objetivos de investimento</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Flexibilidade futura:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Possibilidade de venda</li>
                        <li>• Alterações legislativas</li>
                        <li>• Mudanças pessoais</li>
                        <li>• Diversificação do portfólio</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7: Como Declarar */}
            <section id="declaracao" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-purple-200 pb-2">
                7. Como Declarar no IRS 2026: Passo a Passo
              </h2>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-red-800 mb-3">
                  📅 Prazos IRS 2026
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white border border-red-300 rounded-lg p-4">
                    <h4 className="font-medium text-red-700 mb-1">Abertura</h4>
                    <p className="text-red-600">1 de abril 2027</p>
                  </div>
                  <div className="bg-white border border-red-300 rounded-lg p-4">
                    <h4 className="font-medium text-red-700 mb-1">Fim (online)</h4>
                    <p className="text-red-600">30 de junho 2027</p>
                  </div>
                  <div className="bg-white border border-red-300 rounded-lg p-4">
                    <h4 className="font-medium text-red-700 mb-1">Fim (papel)</h4>
                    <p className="text-red-600">31 de maio 2027</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    📋 Anexo F: Rendimentos Prediais
                  </h3>

                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-2">Campo 401 - Rendimentos:</h4>
                      <p className="text-sm text-gray-700">
                        Declare o total das rendas recebidas em 2026, incluindo rendas em atraso
                        recebidas durante o ano, mesmo que se refiram a períodos anteriores.
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-2">Campo 402 - Regime Especial (Taxa 10%):</h4>
                      <p className="text-sm text-gray-700 mb-2">
                        Para rendas elegíveis à taxa 10%, indique aqui apenas os rendimentos
                        que cumprem os critérios (≤ €2.300/mês por propriedade).
                      </p>
                      <div className="bg-green-50 border border-green-200 rounded p-3">
                        <p className="text-xs text-green-700">
                          <strong>Importante:</strong> O sistema calculará automaticamente a taxa 10%
                          sobre os valores inseridos neste campo.
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-2">Campo 403 - RSAA (0%):</h4>
                      <p className="text-sm text-gray-700">
                        Rendimentos abrangidos pelo regime RSAA ficam isentos. Declare aqui
                        apenas se tiver certificação RSAA válida.
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-2">Campo 404 - Despesas:</h4>
                      <p className="text-sm text-gray-700 mb-2">
                        Despesas dedutíveis comprovadas, limitadas a 15% do rendimento bruto:
                      </p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Conservação e manutenção</li>
                        <li>• Seguros obrigatórios</li>
                        <li>• Juros de empréstimos</li>
                        <li>• Comissões de mediação</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">
                    💡 Dicas Para Maximizar Deduções
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-blue-700 mb-2">Documentação obrigatória:</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Faturas em nome do proprietário</li>
                        <li>• Recibos com NIF da empresa</li>
                        <li>• Declaração IVA quando aplicável</li>
                        <li>• Comprovativo de pagamento</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-700 mb-2">Organização recomendada:</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Pasta digital por propriedade</li>
                        <li>• Arquivo mensal de despesas</li>
                        <li>• Backup de documentos</li>
                        <li>• Registo de quilómetros (vistorias)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8: Casos Práticos */}
            <section id="casos-praticos" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-green-200 pb-2">
                8. Casos Práticos: Exemplos Reais de Otimização
              </h2>

              <div className="space-y-8">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                    📊 Caso 1: João - 2 Propriedades em Lisboa
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-5">
                      <h4 className="font-semibold text-gray-800 mb-3">Situação:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• T2 no Príncipe Real: €2.200/mês</li>
                        <li>• T3 em Alvalade: €1.800/mês</li>
                        <li>• Residente fiscal português</li>
                        <li>• Despesas anuais: €1.200</li>
                      </ul>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-5">
                      <h4 className="font-semibold text-gray-800 mb-3">Estratégia Otimizada:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>✅ Ambas elegíveis taxa 10%</li>
                        <li>✅ Rendimento total: €48.000/ano</li>
                        <li>✅ IRS com taxa 10%: €4.800</li>
                        <li>✅ Poupança vs 25%: €7.200/ano</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white border border-green-300 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2 text-center">
                      Resultado: Poupança de €7.200/ano (€28.800 em 4 anos)
                    </h4>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                    ⚖️ Caso 2: Maria - Dilema €2.300 vs €2.600
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white border border-orange-300 rounded-lg p-5">
                      <h4 className="font-semibold text-orange-800 mb-3">Opção A: €2.300/mês</h4>
                      <ul className="text-sm text-orange-700 space-y-1">
                        <li>• Rendimento anual: €27.600</li>
                        <li>• Taxa aplicável: 10%</li>
                        <li>• IRS anual: €2.760</li>
                        <li>• <strong>Lucro líquido: €24.840</strong></li>
                      </ul>
                    </div>
                    <div className="bg-white border border-red-300 rounded-lg p-5">
                      <h4 className="font-semibold text-red-800 mb-3">Opção B: €2.600/mês</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Rendimento anual: €31.200</li>
                        <li>• Taxa aplicável: 25%</li>
                        <li>• IRS anual: €7.800</li>
                        <li>• <strong>Lucro líquido: €23.400</strong></li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white border border-orange-300 rounded-lg p-4">
                    <h4 className="font-medium text-orange-800 mb-2 text-center">
                      Conclusão: €2.300/mês gera €1.440 mais lucro líquido anual!
                    </h4>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                    🌍 Caso 3: Peter - Não Residente vs Mudança Fiscal
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white border border-purple-300 rounded-lg p-5">
                      <h4 className="font-semibold text-purple-800 mb-3">Como Não Residente:</h4>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• 3 propriedades: €1.500/mês cada</li>
                        <li>• Rendimento total: €54.000/ano</li>
                        <li>• IRS 28%: €15.120/ano</li>
                        <li>• Sem deduções de despesas</li>
                      </ul>
                    </div>
                    <div className="bg-white border border-green-300 rounded-lg p-5">
                      <h4 className="font-semibold text-green-800 mb-3">Como Residente (Taxa 10%):</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Mesmo rendimento: €54.000/ano</li>
                        <li>• IRS 10%: €5.400/ano</li>
                        <li>• Deduções possíveis: €2.000</li>
                        <li>• <strong>IRS líquido: €3.400</strong></li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white border border-green-300 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2 text-center">
                      Poupança com mudança de residência fiscal: €11.720/ano (€46.880 em 4 anos)
                    </h4>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Section 9: Efeito Degrau */}
          <section id="efeito-degrau" className="mb-12 prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-yellow-300 pb-2">
              9. Efeito Degrau: Por Que Cobrar €2.400 Pode Render Menos Que €2.300
            </h2>
            <p className="text-gray-700 mb-6">
              O limiar dos €2.300 mensais cria um <strong>efeito degrau fiscal</strong>: ao ultrapassar
              este valor, a taxa aplicável salta de 10% para 25% sobre o total da renda anual. O resultado
              é que rendas ligeiramente acima de €2.300 geram menos lucro líquido do que rendas de exatamente
              €2.300.
            </p>
            <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-4">⚠️ Simulação do Efeito Degrau</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-yellow-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-yellow-700 uppercase">Renda Mensal</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-yellow-700 uppercase">Renda Anual</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-yellow-700 uppercase">Taxa IRS</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-yellow-700 uppercase">IRS Anual</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-yellow-700 uppercase">Lucro Líquido</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-yellow-100">
                    <tr className="bg-green-50">
                      <td className="px-4 py-3 font-semibold text-green-800">€2.300 ✅</td>
                      <td className="px-4 py-3 text-gray-700">€27.600</td>
                      <td className="px-4 py-3 text-green-700 font-bold">10%</td>
                      <td className="px-4 py-3 text-green-700">€2.760</td>
                      <td className="px-4 py-3 text-green-700 font-bold">€24.840</td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="px-4 py-3 font-semibold text-red-700">€2.400 ❌</td>
                      <td className="px-4 py-3 text-gray-700">€28.800</td>
                      <td className="px-4 py-3 text-red-700 font-bold">25%</td>
                      <td className="px-4 py-3 text-red-700">€7.200</td>
                      <td className="px-4 py-3 text-red-700 font-bold">€21.600</td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="px-4 py-3 font-semibold text-red-700">€2.600 ❌</td>
                      <td className="px-4 py-3 text-gray-700">€31.200</td>
                      <td className="px-4 py-3 text-red-700 font-bold">25%</td>
                      <td className="px-4 py-3 text-red-700">€7.800</td>
                      <td className="px-4 py-3 text-red-700 font-bold">€23.400</td>
                    </tr>
                    <tr className="bg-orange-50">
                      <td className="px-4 py-3 font-semibold text-orange-700">€3.000 ↑</td>
                      <td className="px-4 py-3 text-gray-700">€36.000</td>
                      <td className="px-4 py-3 text-orange-700 font-bold">25%</td>
                      <td className="px-4 py-3 text-orange-700">€9.000</td>
                      <td className="px-4 py-3 text-orange-700 font-bold">€27.000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-yellow-700 text-sm mt-4">
                <strong>Conclusão:</strong> Para recuperar o lucro líquido de €2.300/mês (€24.840/ano), é necessário
                cobrar pelo menos €2.760/mês — uma diferença de €460. A &quot;zona morta&quot; vai de €2.301 a €2.760/mês.
              </p>
            </div>
            <p className="text-gray-700">
              Use o{" "}
              <Link href="/simulador-irs" className="text-green-700 underline hover:text-green-900">
                simulador IRS
              </Link>{" "}
              para calcular exatamente o limiar no seu caso, considerando as suas despesas dedutíveis.
            </p>
          </section>

          {/* Section 10: Deduções Permitidas */}
          <section id="deducoes-permitidas" className="mb-12 prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">
              10. Deduções Permitidas no Arrendamento 2026
            </h2>
            <p className="text-gray-700 mb-6">
              As deduções reduzem o rendimento tributável antes de aplicar a taxa. No regime geral (25%),
              as despesas comprovadas são dedutíveis até ao limite de 15% do rendimento bruto.
              Nos regimes especiais (10% e RSAA) a dedução de despesas é condicionada — confirme na AT.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <h3 className="text-base font-semibold text-green-800 mb-3">✅ Despesas Elegíveis</h3>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>• <strong>Obras de conservação e manutenção</strong> (não inclui benfeitorias)</li>
                  <li>• <strong>Juros de empréstimos</strong> associados ao imóvel arrendado</li>
                  <li>• <strong>Seguros</strong> de incêndio, multirriscos ou vida ligados ao crédito</li>
                  <li>• <strong>Condomínio</strong> e despesas administrativas do imóvel</li>
                  <li>• <strong>Comissões de mediação imobiliária</strong> (com fatura)</li>
                  <li>• <strong>IMI</strong> pago durante o ano fiscal</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <h3 className="text-base font-semibold text-red-800 mb-3">❌ Despesas Não Elegíveis</h3>
                <ul className="text-sm text-red-700 space-y-2">
                  <li>• Amortizações de capital do empréstimo</li>
                  <li>• Obras de ampliação ou melhoria (revalorizações)</li>
                  <li>• Despesas pessoais do proprietário</li>
                  <li>• Mobiliário (salvo casos específicos)</li>
                  <li>• Despesas sem fatura emitida em nome do proprietário</li>
                  <li>• Custos de gestão de outros imóveis</li>
                </ul>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <p className="text-blue-800 text-sm">
                <strong>Limite prático:</strong> Para um rendimento bruto de €18.000/ano (€1.500/mês),
                o limite de 15% equivale a €2.700 de despesas dedutíveis. Se tiver mais, o excesso não é deduzido.
                Guarde <em>todas</em> as faturas com o seu NIF — a AT pode pedir comprovação.
              </p>
            </div>
          </section>

          {/* Section 11: Englobamento vs Taxa Autónoma */}
          <section id="englobamento" className="mb-12 prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-purple-200 pb-2">
              11. Englobamento vs Tributação Autónoma: Quando Escolher Cada Opção
            </h2>
            <p className="text-gray-700 mb-6">
              Por defeito, os rendimentos prediais são tributados autonomamente (taxa fixa sobre a categoria F).
              O <strong>englobamento</strong> é uma opção que adiciona os rendimentos de arrendamento ao
              rendimento global do contribuinte, aplicando as taxas progressivas do IRS (de 13,25% a 53%).
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
                <h3 className="text-base font-semibold text-purple-800 mb-3">📊 Tributação Autónoma (padrão)</h3>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>✅ Taxa fixa e previsível (10% ou 25%)</li>
                  <li>✅ Não afeta o escalão dos outros rendimentos</li>
                  <li>✅ Simples de calcular e declarar</li>
                  <li>❌ Não aproveita deduções pessoais</li>
                </ul>
                <p className="text-purple-700 text-xs mt-3">
                  <strong>Ideal para:</strong> rendimentos médios/altos com outros rendimentos significativos
                </p>
              </div>
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
                <h3 className="text-base font-semibold text-indigo-800 mb-3">📋 Englobamento (opcional)</h3>
                <ul className="text-sm text-indigo-700 space-y-1">
                  <li>✅ Pode ser vantajoso com rendimentos totais baixos</li>
                  <li>✅ Aproveita deduções à coleta (saúde, educação)</li>
                  <li>❌ Pode elevar o escalão dos restantes rendimentos</li>
                  <li>❌ Mais complexo de calcular</li>
                </ul>
                <p className="text-indigo-700 text-xs mt-3">
                  <strong>Ideal para:</strong> contribuintes em escalão baixo (até ~€25.000 de rendimento total)
                </p>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4">
              <h3 className="text-base font-semibold text-gray-800 mb-3">Exemplo Comparativo</h3>
              <p className="text-sm text-gray-700 mb-2">
                Proprietário com salário de €12.000/ano e rendas de €6.000/ano:
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>Sem englobamento:</strong> rendas tributadas a 10% = €600 de IRS sobre rendas</li>
                <li>• <strong>Com englobamento:</strong> total €18.000, escalão ~26,5% → IRS sobre rendas ~€1.590</li>
              </ul>
              <p className="text-sm text-green-700 mt-2 font-medium">
                → Neste caso, tributação autónoma é €990 mais barata. O englobamento raramente compensa
                para quem tem salário médio ou alto.
              </p>
            </div>
            <p className="text-gray-600 text-sm">
              <strong>Nota:</strong> A opção pelo englobamento aplica-se ao conjunto dos rendimentos
              da categoria F e é irrevogável para o ano em que é exercida. Simule sempre os dois cenários
              antes de escolher.
            </p>
          </section>

          {/* Section 12: Isenção Mais-Valias */}
          <section id="isencao-mais-valias" className="mb-12 prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-green-200 pb-2">
              12. Isenção de Mais-Valias em Imóveis Arrendados (2026)
            </h2>
            <p className="text-gray-700 mb-6">
              A isenção de mais-valias é um benefício fiscal relevante para senhorios que vendam imóveis
              que tenham estado arrendados sob regimes elegíveis. Em 2026, as regras foram clarificadas
              com incentivos adicionais para proprietários que participem no arrendamento acessível.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
              <h3 className="text-base font-semibold text-green-800 mb-4">🏠 Condições de Isenção</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-green-700 mb-2">Isenção Total (RSAA):</h4>
                  <ul className="text-sm text-green-600 space-y-1">
                    <li>✅ Imóvel arrendado sob regime RSAA</li>
                    <li>✅ Contrato ativo há pelo menos 3 anos</li>
                    <li>✅ Venda para o próprio inquilino ou habitação pública</li>
                    <li>✅ Reinvestimento em habitação acessível</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-700 mb-2">Redução Parcial:</h4>
                  <ul className="text-sm text-green-600 space-y-1">
                    <li>• Coeficiente de desvalorização monetária aplicado</li>
                    <li>• Exclusão de tributação até 50% se reinvestido em fundos de habitação acessível</li>
                    <li>• Imóvel com mais de 2 anos de arrendamento ativo: taxa reduzida para 25% sobre a mais-valia</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
              <h3 className="text-base font-semibold text-yellow-800 mb-2">⚠️ Regime Geral das Mais-Valias</h3>
              <p className="text-sm text-yellow-700 mb-2">
                Fora dos casos de isenção, as mais-valias imobiliárias são tributadas a 50% da mais-valia
                (após aplicar coeficiente de desvalorização), integradas no englobamento e sujeitas às taxas
                progressivas do IRS. Para imóveis adquiridos antes de 1989 existe isenção total.
              </p>
              <p className="text-sm text-yellow-700">
                <strong>Recomendação:</strong> Antes de qualquer venda, consulte um contabilista para calcular
                a mais-valia real e avaliar opções de reinvestimento em habitação própria permanente (artigo 10.º CIRS).
              </p>
            </div>
          </section>

          {/* Section 13: Prazos e Obrigações */}
          <section id="prazos-obrigacoes" className="mb-12 prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-red-200 pb-2">
              13. Prazos e Obrigações Fiscais do Senhorio em 2026
            </h2>
            <p className="text-gray-700 mb-6">
              Para além da declaração anual de IRS, os senhorios têm obrigações contínuas ao longo do ano.
              O incumprimento pode resultar em coimas e perda de benefícios fiscais.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <h3 className="text-base font-semibold text-red-800 mb-3">📅 Prazos Anuais</h3>
                <ul className="text-sm text-red-700 space-y-2">
                  <li><strong>Fevereiro:</strong> Entrega do Modelo 44 (recibos de renda eletrónicos até 31 jan)</li>
                  <li><strong>Março:</strong> Mapa de Rendas — Modelo 2 na AT (31 de março)</li>
                  <li><strong>Abril–Junho:</strong> Declaração de IRS (rendimentos do ano anterior)</li>
                  <li><strong>Setembro–Outubro:</strong> Pagamento do IMI (2.ª prestação)</li>
                  <li><strong>Dezembro:</strong> Renovação de seguros obrigatórios</li>
                </ul>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                <h3 className="text-base font-semibold text-orange-800 mb-3">📋 Obrigações Contínuas</h3>
                <ul className="text-sm text-orange-700 space-y-2">
                  <li>• Emitir <strong>recibo de renda eletrónico</strong> até ao 8.º dia do mês seguinte</li>
                  <li>• Registar contratos na AT em 30 dias após celebração</li>
                  <li>• Comunicar rendimentos de sub-arrendamento ao senhorio</li>
                  <li>• Atualizar dados bancários na AT para reembolsos</li>
                  <li>• Conservar documentos de despesas por 4 anos</li>
                </ul>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <p className="text-sm text-blue-800">
                <strong>Coimas por incumprimento:</strong> Falta de emissão de recibo de renda: €150–€3.750.
                Não registo de contrato: €250–€3.750. Declaração de IRS fora de prazo: coima mínima de €200.
                Use o{" "}
                <Link href="/calculadora" className="text-blue-700 underline hover:text-blue-900">
                  calendário fiscal do Senhorio
                </Link>{" "}
                para não perder nenhum prazo.
              </p>
            </div>
          </section>

          {/* Section 14: FAQ */}
          <section id="faq" className="mb-12 prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-300 pb-2">
              14. FAQ — Perguntas Frequentes sobre IRS 2026
            </h2>
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  Os contratos antigos (antes de 2026) também beneficiam da taxa 10%?
                </h3>
                <p className="text-sm text-gray-700">
                  Sim. A taxa de 10% aplica-se a <strong>todos</strong> os contratos de arrendamento habitacional
                  com renda mensal até €2.300, independentemente da data de celebração. Não é necessário
                  renegociar o contrato — basta que a renda atual seja ≤ €2.300/mês.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  O alojamento local (AL) está excluído da taxa 10%?
                </h3>
                <p className="text-sm text-gray-700">
                  Sim. A taxa de 10% aplica-se exclusivamente a arrendamento habitacional (categoria F).
                  Os rendimentos de alojamento local são enquadrados na categoria B (atividade empresarial)
                  e não beneficiam desta redução fiscal. Para AL, as regras são distintas.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  Se tiver múltiplas propriedades, a taxa 10% aplica-se a cada uma individualmente?
                </h3>
                <p className="text-sm text-gray-700">
                  Sim. O limiar de €2.300 é avaliado <strong>por contrato/propriedade</strong>, não pelo
                  total dos rendimentos. Se tiver 3 imóveis com €1.500/mês cada, todos beneficiam
                  da taxa 10%, mesmo que o total anual seja €54.000.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  Posso acumular o benefício IRS Jovem com a taxa 10% de arrendamento?
                </h3>
                <p className="text-sm text-gray-700">
                  O IRS Jovem aplica-se a rendimentos da categoria A (trabalho dependente) e categoria B
                  (trabalho independente) — não à categoria F (rendimentos prediais). Por isso, são regimes
                  independentes: um jovem pode beneficiar do IRS Jovem nos seus rendimentos de trabalho
                  e a taxa 10% nos rendimentos de arrendamento em simultâneo.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  Como declarar a taxa 10% no Portal das Finanças?
                </h3>
                <p className="text-sm text-gray-700">
                  Na declaração de IRS (Modelo 3), preencha o <strong>Anexo F</strong>. Indique os
                  rendimentos elegíveis à taxa 10% no campo correspondente ao regime especial.
                  O sistema da AT calcula automaticamente o imposto. Não é necessário fazer qualquer
                  comunicação prévia — basta preencher corretamente o Anexo F.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  A taxa 10% está garantida até quando?
                </h3>
                <p className="text-sm text-gray-700">
                  A legislação atual garante a taxa de 10% para os anos fiscais de <strong>2026 a 2029</strong>
                  (4 anos). Contratos celebrados durante este período podem beneficiar de uma extensão
                  adicional, desde que a renda se mantenha no limite elegível. Qualquer alteração
                  legislativa deverá ser acompanhada no Portal das Finanças.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              ✅ Pronto Para Otimizar o Seu IRS 2026?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Use as nossas ferramentas gratuitas para simular o seu caso específico
              e descobrir exatamente quanto pode poupar com as novas regras fiscais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/simulador-irs"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                🧮 Simulador IRS 2026
              </Link>
              <Link
                href="/calculadora"
                className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-400 transition border-2 border-white"
              >
                📊 Calculadora Completa
              </Link>
            </div>
            <p className="text-sm mt-4 opacity-75">
              ✨ Simulação gratuita • Resultados instantâneos • Sem registo necessário
            </p>
          </div>

          {/* Footer disclaimer */}
          <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <p className="text-sm text-yellow-800">
              <strong>Disclaimer:</strong> Este guia baseia-se na legislação fiscal portuguesa
              conhecida até abril de 2026. As simulações são indicativas e podem variar conforme
              a situação específica de cada contribuinte. Para aconselhamento personalizado,
              consulte um contabilista certificado ou técnico oficial de contas.
            </p>
            <p className="text-xs text-yellow-700 mt-2">
              Última atualização: 6 de abril de 2026
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}