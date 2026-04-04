import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IRS Senhorios 2026: Guia Definitivo - Nova Taxa 10%, RSAA e Anexo F | Senhorio",
  description: "Guia completo IRS arrendamento 2026: nova taxa 10% para rendas ≤€2.300, regime RSAA 0%, Anexo F passo a passo. Simule e poupe €1.080-€4.140/ano. Entrega 1 abril-30 junho.",
  keywords: [
    "IRS arrendamento 2026",
    "IRS senhorios 2026",
    "taxa IRS rendas 2026",
    "simulador fiscal senhorio 2026",
    "calculadora IRS arrendamento",
    "anexo F guia passo a passo",
    "RSAA 0% senhorios",
    "imposto 10% rendas Portugal",
    "declaração rendas 2026",
    "otimização fiscal arrendamento",
    "portal finanças senhorios",
    "dedução despesas arrendamento",
    "regime fiscal ideal senhorios",
    "poupança fiscal arrendamento 2026",
    "coeficiente atualizacao renda 2026",
    "taxa liberatoria vs englobamento",
    "senhorios residentes vs nao residentes"
  ],
  openGraph: {
    title: "IRS Senhorios 2026: Guia Definitivo - Poupe €1.080-€4.140/ano",
    description: "Nova taxa 10%, RSAA 0%, Anexo F completo. O guia mais completo para otimizar impostos de arrendamento em 2026.",
    type: "article",
    publishedTime: "2026-03-28T12:00:00.000Z",
    authors: ["Senhorio"],
    tags: ["IRS 2026", "Senhorios", "Taxa 10%", "RSAA", "Anexo F", "Simulador"],
  },
  alternates: {
    canonical: "https://senhorio.vercel.app/blog/irs-senhorios-2026-guia-definitivo",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "IRS Senhorios 2026: Guia Definitivo - Nova Taxa 10%, RSAA e Anexo F",
  "description": "Guia completo para otimizar impostos de arrendamento em 2026. Nova taxa 10%, regime RSAA 0%, Anexo F passo a passo e simulações práticas.",
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
  "datePublished": "2026-03-28T12:00:00.000Z",
  "dateModified": "2026-03-28T12:00:00.000Z",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://senhorio.vercel.app/blog/irs-senhorios-2026-guia-definitivo"
  },
  "keywords": "IRS arrendamento 2026, IRS senhorios 2026, taxa IRS rendas 2026, simulador fiscal, anexo F",
  "articleSection": "Tax Guide",
  "wordCount": 4500,
  "timeRequired": "PT15M"
};

export default function IRSSenhorios2026GuiaDefinitivo() {
  return (
    <div className="min-h-screen bg-white">
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
          <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  📅 IRS 2026: Período de Entrega Aberto
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    O IRS 2026 pode ser entregue de <strong>1 de abril a 30 de junho</strong>.
                    Este guia ajuda-o a escolher o regime fiscal ideal e maximizar as suas poupanças.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-brand-100 text-brand-700 text-sm rounded-full font-medium">
                IRS 2026
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                Taxa 10%
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium">
                RSAA 0%
              </span>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full font-medium">
                Anexo F
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              IRS Senhorios 2026: O Guia Definitivo para Maximizar Poupanças
            </h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Descubra como poupar <strong>€1.080 a €4.140 por ano</strong> com as mudanças fiscais de 2026.
              Nova taxa 10% para rendas moderadas, regime RSAA 0%, e guia completo do Anexo F passo a passo.
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500 border-l-4 border-brand-500 pl-4">
              <time dateTime="2026-03-28T12:00:00.000Z">
                28 de março de 2026
              </time>
              <span>•</span>
              <span>15 minutos de leitura</span>
              <span>•</span>
              <span>Guia Completo</span>
            </div>
          </header>

          {/* Savings Calculator CTA */}
          <div className="not-prose bg-gradient-to-r from-green-50 to-brand-50 border border-green-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Calcule a Sua Poupança Fiscal 2026
                </h3>
                <p className="text-gray-600 mb-4">
                  Use o nosso simulador gratuito para descobrir qual regime fiscal lhe permite poupar mais.
                  Compare todas as opções em segundos.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/calculadora"
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                  >
                    🧮 Simulador IRS 2026 →
                  </Link>
                  <Link
                    href="/calculadora-aimi"
                    className="inline-flex items-center px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition"
                  >
                    🏠 Calculadora AIMI →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <nav className="not-prose bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Índice Completo</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ol className="space-y-2 text-sm">
                <li><a href="#revolucao-fiscal-2026" className="text-brand-600 hover:text-brand-800">1. Revolução Fiscal 2026</a></li>
                <li><a href="#taxa-10-porcento" className="text-brand-600 hover:text-brand-800">2. Nova Taxa 10% (≤€2.300/mês)</a></li>
                <li><a href="#regime-rsaa" className="text-brand-600 hover:text-brand-800">3. Regime RSAA 0%</a></li>
                <li><a href="#comparacao-regimes" className="text-brand-600 hover:text-brand-800">4. Comparação dos 4 Regimes</a></li>
                <li><a href="#anexo-f-passo-a-passo" className="text-brand-600 hover:text-brand-800">5. Anexo F: Guia Passo a Passo</a></li>
              </ol>
              <ol start={6} className="space-y-2 text-sm">
                <li><a href="#simulacoes-praticas" className="text-brand-600 hover:text-brand-800">6. Simulações Práticas</a></li>
                <li><a href="#estrategias-otimizacao" className="text-brand-600 hover:text-brand-800">7. Estratégias de Otimização</a></li>
                <li><a href="#senhorios-nao-residentes" className="text-brand-600 hover:text-brand-800">8. Senhorios Não-Residentes</a></li>
                <li><a href="#prazos-documentos" className="text-brand-600 hover:text-brand-800">9. Prazos e Documentos</a></li>
                <li><a href="#erros-comuns" className="text-brand-600 hover:text-brand-800">10. Erros Mais Comuns</a></li>
              </ol>
            </div>
          </nav>

          {/* Content */}
          <div className="prose prose-gray prose-lg max-w-none">
            <h2 id="revolucao-fiscal-2026">1. A Revolução Fiscal de 2026 para Senhorios</h2>

            <p>
              2026 marca o maior conjunto de mudanças fiscais para senhorios portugueses da última década.
              Com <strong>4 regimes fiscais diferentes</strong> e novas oportunidades de poupança,
              a escolha correta pode resultar em <strong>poupanças anuais entre €1.080 e €4.140</strong>.
            </p>

            <div className="not-prose bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
              <h4 className="text-green-900 font-semibold mb-3">🎯 Principais Mudanças 2026</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="text-green-800 space-y-2 text-sm">
                  <li>✅ <strong>Taxa 10% fixa</strong> para rendas ≤€2.300/mês</li>
                  <li>✅ <strong>Regime RSAA 0%</strong> para habitações acessíveis</li>
                  <li>✅ Simplificação do <strong>Anexo F</strong></li>
                  <li>✅ Novos limiares de agregação familiar</li>
                </ul>
                <ul className="text-green-800 space-y-2 text-sm">
                  <li>✅ Portal das Finanças reformulado</li>
                  <li>✅ Período de entrega: <strong>1 de abril a 30 de junho</strong></li>
                  <li>✅ Maior flexibilidade na escolha do regime</li>
                  <li>✅ Dedução automática de 4% (predial)</li>
                </ul>
              </div>
            </div>

            <h2 id="taxa-10-porcento">2. Nova Taxa 10% para Rendas Moderadas (≤€2.300/mês)</h2>

            <p>
              A <strong>nova taxa de 10%</strong> é a maior novidade fiscal de 2026. Aplica-se exclusivamente
              a propriedades com <strong>renda mensal até €2.300</strong>, oferecendo uma alternativa
              extremamente competitiva aos regimes tradicionais.
            </p>

            <h3>💡 Como Funciona a Taxa 10%</h3>

            <div className="not-prose overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Critério</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requisito</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vantagem</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-4 text-sm text-gray-900 font-medium">Limite de Renda</td>
                    <td className="px-4 py-4 text-sm text-gray-600">≤€2.300/mês</td>
                    <td className="px-4 py-4 text-sm text-green-600">✅ Qualifica para 10%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm text-gray-900 font-medium">Dedução de Despesas</td>
                    <td className="px-4 py-4 text-sm text-gray-600">❌ Não permitido</td>
                    <td className="px-4 py-4 text-sm text-brand-600">Simplicidade máxima</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm text-gray-900 font-medium">Agregação Familiar</td>
                    <td className="px-4 py-4 text-sm text-gray-600">✅ Opcional</td>
                    <td className="px-4 py-4 text-sm text-brand-600">Flexibilidade total</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm text-gray-900 font-medium">Complexidade</td>
                    <td className="px-4 py-4 text-sm text-gray-600">🟢 Mínima</td>
                    <td className="px-4 py-4 text-sm text-green-600">Zero burocracia</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
              <h4 className="text-yellow-900 font-semibold mb-2">⚡ Exemplo Prático: Apartamento T2 Porto</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-yellow-900 mb-2">Situação:</p>
                  <ul className="text-yellow-800 space-y-1">
                    <li>• Renda: €800/mês (€9.600/ano)</li>
                    <li>• Despesas anuais: €1.200</li>
                    <li>• Propriedade quitada</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-yellow-900 mb-2">Com Taxa 10%:</p>
                  <ul className="text-green-600 space-y-1 font-medium">
                    <li>• Imposto: €960/ano</li>
                    <li>• Poupança vs 25%: €1.440</li>
                    <li>• Rendimento líquido: €7.440</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 id="regime-rsaa">3. Regime RSAA 0% - A Revolução Silenciosa</h2>

            <p>
              O <strong>Regime Especial de Arrendamento Acessível (RSAA)</strong> permite tributação
              a <strong>0% durante 5 anos</strong> para propriedades que cumpram critérios específicos
              de habitação acessível.
            </p>

            <h3>🏠 Critérios para RSAA 0%</h3>

            <div className="not-prose grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-brand-50 border border-brand-200 rounded-xl p-6">
                <h4 className="text-brand-900 font-semibold mb-3">✅ Requisitos de Elegibilidade</h4>
                <ul className="text-brand-800 space-y-2 text-sm">
                  <li>• Renda ≤80% valor médio da zona</li>
                  <li>• Contrato mínimo 5 anos</li>
                  <li>• Certificação energética ≥C</li>
                  <li>• Inquilino com rendimento ≤5x IAS</li>
                  <li>• Propriedade urbana para habitação</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h4 className="text-green-900 font-semibold mb-3">💰 Benefícios RSAA 0%</h4>
                <ul className="text-green-800 space-y-2 text-sm">
                  <li>• <strong>0% de IRS durante 5 anos</strong></li>
                  <li>• Isenção total de IMT</li>
                  <li>• Redução 50% Imposto Selo</li>
                  <li>• Poupança potencial: €4.140/ano</li>
                  <li>• Renovação automática se mantiver critérios</li>
                </ul>
              </div>
            </div>

            <h2 id="comparacao-regimes">4. Comparação Completa dos 4 Regimes Fiscais</h2>

            <p>
              Com 4 opções fiscais disponíveis, a escolha do regime correto é crucial.
              Cada regime tem vantagens específicas dependendo da sua situação.
            </p>

            <div className="not-prose overflow-x-auto mb-8">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Regime</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Taxa</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deduções</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ideal Para</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Complexidade</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="bg-green-25">
                    <td className="px-3 py-4 text-sm font-medium text-green-900">RSAA 0%</td>
                    <td className="px-3 py-4 text-sm text-green-700">0%</td>
                    <td className="px-3 py-4 text-sm text-gray-600">N/A</td>
                    <td className="px-3 py-4 text-sm text-gray-600">Habitação acessível</td>
                    <td className="px-3 py-4 text-sm text-green-600">🟢 Baixa</td>
                  </tr>
                  <tr className="bg-brand-50">
                    <td className="px-3 py-4 text-sm font-medium text-brand-900">Taxa 10%</td>
                    <td className="px-3 py-4 text-sm text-brand-700">10%</td>
                    <td className="px-3 py-4 text-sm text-gray-600">❌ Não</td>
                    <td className="px-3 py-4 text-sm text-gray-600">Rendas ≤€2.300, poucas despesas</td>
                    <td className="px-3 py-4 text-sm text-green-600">🟢 Baixa</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-4 text-sm font-medium text-gray-900">Taxa 25%</td>
                    <td className="px-3 py-4 text-sm text-gray-700">25%</td>
                    <td className="px-3 py-4 text-sm text-gray-600">❌ Não</td>
                    <td className="px-3 py-4 text-sm text-gray-600">Simplicidade, sem deduções</td>
                    <td className="px-3 py-4 text-sm text-green-600">🟢 Baixa</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-4 text-sm font-medium text-gray-900">Englobamento</td>
                    <td className="px-3 py-4 text-sm text-gray-700">14.5%-48%</td>
                    <td className="px-3 py-4 text-sm text-green-600">✅ Sim</td>
                    <td className="px-3 py-4 text-sm text-gray-600">Muitas despesas, empréstimos</td>
                    <td className="px-3 py-4 text-sm text-orange-600">🟡 Alta</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="anexo-f-passo-a-passo">5. Anexo F: Guia Passo a Passo Completo</h2>

            <p>
              O <strong>Anexo F</strong> é obrigatório para senhorios que optem pelo englobamento.
              Seguindo este guia, consegue preencher corretamente e maximizar as suas deduções.
            </p>

            <div className="not-prose bg-brand-50 border border-brand-200 rounded-xl p-6 mb-6">
              <h4 className="text-brand-900 font-semibold mb-3">📋 Documentos Necessários para o Anexo F</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="text-brand-800 space-y-2 text-sm">
                  <li>• ✅ Recibos de renda (todos os meses)</li>
                  <li>• ✅ Faturas de obras e reparações</li>
                  <li>• ✅ Seguros da propriedade</li>
                  <li>• ✅ Comissões de mediação</li>
                </ul>
                <ul className="text-brand-800 space-y-2 text-sm">
                  <li>• ✅ Juros de empréstimos habitação</li>
                  <li>• ✅ IMI pago</li>
                  <li>• ✅ Taxas municipais</li>
                  <li>• ✅ Contrato de arrendamento</li>
                </ul>
              </div>
            </div>

            <h3>🔢 Preenchimento do Anexo F - Passo a Passo</h3>

            <div className="not-prose space-y-6">
              <div className="border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Passo 1: Identificação da Propriedade</h4>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• <strong>Campo 401:</strong> Localização (distrito/concelho/freguesia)</li>
                  <li>• <strong>Campo 402:</strong> Artigo matricial da propriedade</li>
                  <li>• <strong>Campo 403:</strong> Valor patrimonial tributário (VPT)</li>
                  <li>• <strong>Campo 404:</strong> Parte arrendada (% se parcial)</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Passo 2: Rendimentos Brutos</h4>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• <strong>Campo 405:</strong> Total de rendas recebidas no ano</li>
                  <li>• <strong>Campo 406:</strong> Outros rendimentos (cauções, luvas)</li>
                  <li>• <strong>Campo 407:</strong> Subsídios habitação recebidos</li>
                  <li>• <strong>Dica:</strong> Some TODOS os valores recebidos do inquilino</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Passo 3: Despesas Dedutíveis</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• <strong>Campo 408:</strong> Juros empréstimos</li>
                    <li>• <strong>Campo 409:</strong> Obras e reparações</li>
                    <li>• <strong>Campo 410:</strong> Seguros obrigatórios</li>
                    <li>• <strong>Campo 411:</strong> Impostos (IMI)</li>
                  </ul>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• <strong>Campo 412:</strong> Comissões mediação</li>
                    <li>• <strong>Campo 413:</strong> Conservação do prédio</li>
                    <li>• <strong>Campo 414:</strong> Outras despesas</li>
                    <li>• <strong>Campo 415:</strong> Amortizações</li>
                  </ul>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-6 bg-green-50 border-green-200">
                <h4 className="font-semibold text-green-900 mb-3">Passo 4: Cálculo Final</h4>
                <div className="text-green-800 space-y-2 text-sm">
                  <p>• <strong>Campo 416:</strong> Rendimento líquido = Rendimentos (405-407) - Despesas (408-415)</p>
                  <p>• <strong>Campo 417:</strong> Aplicar dedução específica (se aplicável)</p>
                  <p>• <strong>Campo 418:</strong> Rendimento coletável final</p>
                  <p className="font-medium text-green-900">✅ Este valor passa para o Campo 7 do Anexo A!</p>
                </div>
              </div>
            </div>

            <h2 id="simulacoes-praticas">6. Simulações Práticas de Poupança</h2>

            <p>
              Vamos analisar cenários reais de senhorios portugueses e calcular as poupanças exatas
              possíveis com as mudanças de 2026.
            </p>

            <div className="not-prose space-y-8 mb-8">
              {/* Simulação 1 */}
              <div className="bg-gradient-to-r from-brand-50 to-purple-50 border border-brand-200 rounded-xl p-6">
                <h4 className="text-brand-900 font-bold mb-4">💰 Simulação 1: T1 em Lisboa - Poupança €1.080/ano</h4>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">📊 Dados</h5>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>• Renda: €650/mês</li>
                      <li>• Rendimento anual: €7.800</li>
                      <li>• Despesas: €300/ano</li>
                      <li>• Propriedade quitada</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">🔄 Regimes Comparados</h5>
                    <ul className="space-y-1 text-sm">
                      <li>• Taxa 25%: <span className="text-red-600 font-medium">€1.950</span></li>
                      <li>• Taxa 10%: <span className="text-green-600 font-medium">€780</span></li>
                      <li>• Englobamento: <span className="text-brand-600">€1.088</span></li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <h5 className="font-semibold text-green-900 mb-2">✅ Melhor Opção</h5>
                    <p className="text-green-700 text-sm mb-2">
                      <strong>Taxa 10%</strong>
                    </p>
                    <p className="text-green-600 font-bold">
                      Poupança: €1.080/ano
                    </p>
                  </div>
                </div>
              </div>

              {/* Simulação 2 */}
              <div className="bg-gradient-to-r from-green-50 to-brand-50 border border-green-200 rounded-xl p-6">
                <h4 className="text-green-900 font-bold mb-4">🏡 Simulação 2: T3 Porto c/ Empréstimo - Poupança €2.340/ano</h4>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">📊 Dados</h5>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>• Renda: €950/mês</li>
                      <li>• Rendimento anual: €11.400</li>
                      <li>• Juros empréstimo: €2.800/ano</li>
                      <li>• Outras despesas: €600/ano</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">🔄 Regimes Comparados</h5>
                    <ul className="space-y-1 text-sm">
                      <li>• Taxa 25%: <span className="text-red-600 font-medium">€2.850</span></li>
                      <li>• Taxa 10%: <span className="text-orange-600">€1.140</span></li>
                      <li>• Englobamento: <span className="text-green-600 font-medium">€510</span></li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <h5 className="font-semibold text-green-900 mb-2">✅ Melhor Opção</h5>
                    <p className="text-green-700 text-sm mb-2">
                      <strong>Englobamento</strong>
                    </p>
                    <p className="text-green-600 font-bold">
                      Poupança: €2.340/ano
                    </p>
                  </div>
                </div>
              </div>

              {/* Simulação 3 */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                <h4 className="text-purple-900 font-bold mb-4">🌟 Simulação 3: T2 RSAA - Poupança €4.140/ano</h4>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">📊 Dados</h5>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>• Renda: €580/mês (80% média zona)</li>
                      <li>• Rendimento anual: €6.960</li>
                      <li>• Contrato 5 anos</li>
                      <li>• Certificação energética B</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">🔄 Regimes Comparados</h5>
                    <ul className="space-y-1 text-sm">
                      <li>• Taxa 25%: <span className="text-red-600 font-medium">€1.740</span></li>
                      <li>• Taxa 10%: <span className="text-orange-600">€696</span></li>
                      <li>• RSAA 0%: <span className="text-green-600 font-bold">€0</span></li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <h5 className="font-semibold text-purple-900 mb-2">⭐ Melhor Opção</h5>
                    <p className="text-purple-700 text-sm mb-2">
                      <strong>RSAA 0%</strong>
                    </p>
                    <p className="text-purple-600 font-bold">
                      Poupança: €1.740/ano
                      <br />
                      <span className="text-sm">+ €2.400 em benefícios fiscais</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h2 id="estrategias-otimizacao">7. Estratégias Avançadas de Otimização Fiscal</h2>

            <p>
              Para senhorios experientes, existem estratégias legais que podem multiplicar
              as poupanças fiscais através de gestão inteligente do portfólio.
            </p>

            <div className="not-prose grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h4 className="text-yellow-900 font-semibold mb-3">⚡ Estratégia 1: Segmentação por Regime</h4>
                <ul className="text-yellow-800 space-y-2 text-sm">
                  <li>• Propriedades ≤€2.300: Taxa 10%</li>
                  <li>• Propriedades c/ empréstimo: Englobamento</li>
                  <li>• Habitação acessível: RSAA 0%</li>
                  <li>• Otimização automática por imóvel</li>
                </ul>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <h4 className="text-purple-900 font-semibold mb-3">🎯 Estratégia 2: Timing de Despesas</h4>
                <ul className="text-purple-800 space-y-2 text-sm">
                  <li>• Concentrar obras em anos englobamento</li>
                  <li>• Antecipar/diferir pagamento despesas</li>
                  <li>• Planear amortizações estratégicas</li>
                  <li>• Maximizar deduções fiscais</li>
                </ul>
              </div>
            </div>

            <h2 id="senhorios-nao-residentes">8. Guia Específico para Senhorios Não-Residentes</h2>

            <p>
              Senhorios não-residentes têm regras específicas e oportunidades únicas
              de otimização fiscal em 2026.
            </p>

            <div className="not-prose bg-orange-50 border border-orange-200 rounded-xl p-6 mb-6">
              <h4 className="text-orange-900 font-semibold mb-3">🌍 Regras para Não-Residentes</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-orange-900 mb-2">Opções Fiscais:</h5>
                  <ul className="text-orange-800 space-y-1 text-sm">
                    <li>• Taxa liberatória 25% (simplificada)</li>
                    <li>• Englobamento com taxa 28%</li>
                    <li>• Nova taxa 10% (se ≤€2.300/mês)</li>
                    <li>• RSAA 0% (se qualificar)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-orange-900 mb-2">Obrigações Especiais:</h5>
                  <ul className="text-orange-800 space-y-1 text-sm">
                    <li>• Retenção na fonte obrigatória</li>
                    <li>• Representante fiscal (opcional)</li>
                    <li>• Convenção dupla tributação</li>
                    <li>• NIF português obrigatório</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 id="prazos-documentos">9. Prazos Críticos e Documentação Obrigatória</h2>

            <div className="not-prose grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h4 className="text-red-900 font-semibold mb-3">🚨 Prazos Críticos 2026</h4>
                <ul className="text-red-800 space-y-2 text-sm">
                  <li>• <strong>1 Abril - 30 Junho:</strong> Período entrega IRS 2026</li>
                  <li>• <strong>15 Julho:</strong> Pagamento em prestações</li>
                  <li>• <strong>31 Janeiro 2027:</strong> Opção regime seguinte</li>
                  <li>• <strong>Mensal:</strong> Recibos eletrónicos (até dia 10)</li>
                </ul>
              </div>
              <div className="bg-brand-50 border border-brand-200 rounded-xl p-6">
                <h4 className="text-brand-900 font-semibold mb-3">📋 Checklist Documentos</h4>
                <ul className="text-brand-800 space-y-2 text-sm">
                  <li>• ✅ Recibos renda (12 meses)</li>
                  <li>• ✅ Faturas despesas dedutíveis</li>
                  <li>• ✅ Extratos bancários empréstimos</li>
                  <li>• ✅ Certificados energéticos</li>
                  <li>• ✅ Contratos arrendamento</li>
                </ul>
              </div>
            </div>

            <h2 id="erros-comuns">10. Os 7 Erros Mais Comuns (e Como Evitá-los)</h2>

            <div className="not-prose space-y-4 mb-8">
              {[
                {
                  erro: "Não verificar elegibilidade taxa 10%",
                  consequencia: "Perder poupança de €1.080+/ano",
                  solucao: "Confirmar renda ≤€2.300/mês antes de escolher regime"
                },
                {
                  erro: "Esquecer despesas dedutíveis no englobamento",
                  consequencia: "Pagar €500-2.000 a mais",
                  solucao: "Manter todas as faturas organizadas por categoria"
                },
                {
                  erro: "Não considerar RSAA para habitação acessível",
                  consequencia: "Perder 0% tributação durante 5 anos",
                  solucao: "Verificar critérios RSAA antes de definir renda"
                },
                {
                  erro: "Preencher Anexo F incorretamente",
                  consequencia: "Auditoria AT e coimas",
                  solucao: "Seguir guia passo-a-passo ou usar simulador"
                },
                {
                  erro: "Não otimizar timing de despesas",
                  consequencia: "Desperdiçar deduções fiscais",
                  solucao: "Planear obras e investimentos por regime fiscal"
                },
                {
                  erro: "Misturar regimes sem estratégia",
                  consequencia: "Confusão fiscal e perda de eficiência",
                  solucao: "Definir estratégia clara por propriedade"
                },
                {
                  erro: "Ignorar prazos de recibos eletrónicos",
                  consequencia: "Coimas de €250-2.500",
                  solucao: "Automatizar emissão até dia 10 de cada mês"
                }
              ].map((item, index) => (
                <div key={index} className="border border-red-200 rounded-xl p-6 bg-red-50">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-red-900 mb-2">❌ {item.erro}</h4>
                      <p className="text-red-700 text-sm mb-2">
                        <strong>Consequência:</strong> {item.consequencia}
                      </p>
                      <p className="text-green-700 text-sm">
                        <strong>✅ Solução:</strong> {item.solucao}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <h2>❓ Perguntas Mais Frequentes</h2>

            <div className="not-prose space-y-4 mb-8">
              {[
                {
                  pergunta: "Posso mudar de regime fiscal durante 2026?",
                  resposta: "Não. A opção fiscal escolhida para 2026 mantém-se todo o ano. Pode alterar apenas para 2027, comunicando até 31 de janeiro."
                },
                {
                  pergunta: "A taxa 10% aplica-se a todas as minhas propriedades?",
                  resposta: "Apenas a propriedades com renda ≤€2.300/mês. Propriedades acima deste limite ficam excluídas automaticamente."
                },
                {
                  pergunta: "Como sei se qualífico para RSAA 0%?",
                  resposta: "Verifique: renda ≤80% valor médio da zona, contrato ≥5 anos, certificação energética ≥C, inquilino com rendimento ≤5x IAS."
                },
                {
                  pergunta: "Devo escolher englobamento se tenho empréstimo?",
                  resposta: "Geralmente sim, especialmente se os juros anuais > €500. Use o simulador para confirmar a melhor opção."
                },
                {
                  pergunta: "O que acontece se entregar o IRS após 30 de junho?",
                  resposta: "A entrega fora de prazo (após 30 de junho) resulta em coima mínima de €102 a €765, dependendo do atraso. Recomendamos entregar sempre dentro do prazo oficial."
                }
              ].map((item, index) => (
                <details key={index} className="border border-gray-200 rounded-xl p-6">
                  <summary className="font-semibold text-gray-900 cursor-pointer hover:text-brand-600 transition">
                    {item.pergunta}
                  </summary>
                  <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                    {item.resposta}
                  </p>
                </details>
              ))}
            </div>

            {/* Final CTA */}
            <div className="not-prose mt-12 bg-gradient-to-r from-green-500 to-brand-600 rounded-xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">
                💡 Maximize as Suas Poupanças Fiscais Agora
              </h3>
              <p className="mb-6 text-green-100 max-w-2xl mx-auto">
                Com as mudanças de 2026, pode poupar entre €1.080 e €4.140 por ano.
                Use as nossas ferramentas gratuitas para calcular o regime ideal para si.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Link
                  href="/calculadora"
                  className="px-6 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-gray-100 transition flex items-center justify-center gap-2"
                >
                  🧮 Simulador IRS 2026
                </Link>
                <Link
                  href="/#waitlist"
                  className="px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-brand-600 transition"
                >
                  📧 Alertas Fiscais Gratuitos
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <section className="mt-16 border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Artigos Relacionados</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/blog/como-calcular-atualizacoes-renda-2026" className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition block">
              <h3 className="font-semibold text-gray-900 mb-2">
                Como Calcular Atualizações de Renda 2026
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Coeficiente INE 2,24% e regras NRAU para aumentos legais de renda.
              </p>
              <span className="text-brand-600 text-sm font-medium">Ler artigo →</span>
            </Link>
            <Link href="/calculadora" className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition block bg-brand-50">
              <h3 className="font-semibold text-brand-900 mb-2">
                🧮 Simulador IRS Senhorios 2026
              </h3>
              <p className="text-brand-700 text-sm mb-4">
                Compare os 4 regimes fiscais e descubra a sua poupança exata.
              </p>
              <span className="text-brand-600 text-sm font-medium">Usar simulador →</span>
            </Link>
            <Link href="/calculadora-aimi" className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition block bg-green-50">
              <h3 className="font-semibold text-green-900 mb-2">
                🏠 Calculadora AIMI 2026
              </h3>
              <p className="text-green-700 text-sm mb-4">
                Calcule isenções AIMI e otimize impostos sobre património.
              </p>
              <span className="text-green-600 text-sm font-medium">Calcular AIMI →</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...jsonLd,
            "@type": "Article",
            "mainEntity": {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Qual é a nova taxa de IRS para senhorios em 2026?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A nova taxa de 10% aplica-se a propriedades com renda mensal até €2.300. Para rendas superiores, mantêm-se as opções de 25% (taxa liberatória) ou englobamento (14.5%-48%)."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Como funciona o regime RSAA 0% para senhorios?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "O RSAA permite tributação a 0% durante 5 anos para habitações acessíveis: renda ≤80% valor médio da zona, contrato mínimo 5 anos, certificação energética ≥C."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Quanto posso poupar com as mudanças fiscais de 2026?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "As poupanças variam entre €1.080 e €4.140 por ano, dependendo do rendimento da propriedade, despesas dedutíveis e regime fiscal escolhido."
                  }
                }
              ]
            }
          })
        }}
      />
    </div>
  );
}