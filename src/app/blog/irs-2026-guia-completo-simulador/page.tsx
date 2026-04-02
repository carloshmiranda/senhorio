import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IRS 2026: Guia Completo dos 3 Regimes Fiscais com Simulador | Senhorio",
  description: "Guia definitivo IRS 2026 para senhorios: RSAA 0%, renda moderada 10%, regime geral 25%. Efeito degrau €2.300, exemplos práticos, prazos entrega e simulador fiscal gratuito.",
  keywords: [
    "IRS 2026 senhorios",
    "guia completo IRS arrendamento 2026",
    "RSAA 0% arrendamento 2026",
    "taxa 10% rendas moderadas 2026",
    "regime geral 25% arrendamento",
    "efeito degrau 2300 euros",
    "simulador fiscal IRS 2026",
    "prazos entrega IRS 2026",
    "exemplos práticos IRS senhorios",
    "optimização fiscal arrendamento",
    "três regimes fiscais Portugal",
    "calculadora IRS rendas 2026",
    "declaração IRS senhorios 2026",
    "anexo F arrendamento",
    "portal finanças senhorios",
    "estratégia fiscal ideal senhorios"
  ],
  openGraph: {
    title: "IRS 2026: Guia Completo dos 3 Regimes Fiscais com Simulador",
    description: "O guia definitivo com os 3 regimes fiscais para senhorios em 2026. RSAA 0%, renda moderada 10%, regime geral 25%. Exemplos práticos e simulador gratuito.",
    type: "article",
    publishedTime: "2026-04-02T10:00:00.000Z",
    authors: ["Senhorio"],
    tags: ["IRS 2026", "RSAA", "Taxa 10%", "Regime Geral", "Simulador", "Guia Completo"],
  },
  alternates: {
    canonical: "https://senhorio.vercel.app/blog/irs-2026-guia-completo-simulador",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "IRS 2026: Guia Completo dos 3 Regimes Fiscais com Simulador",
  "description": "Guia definitivo para senhorios portugueses sobre os três regimes fiscais do IRS 2026. RSAA 0%, renda moderada 10%, regime geral 25%, com exemplos práticos e simulador fiscal gratuito.",
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
  "datePublished": "2026-04-02T10:00:00.000Z",
  "dateModified": "2026-04-02T10:00:00.000Z",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://senhorio.vercel.app/blog/irs-2026-guia-completo-simulador"
  },
  "keywords": "IRS 2026, RSAA, taxa 10%, regime geral, simulador fiscal, senhorios, arrendamento",
  "articleSection": "Tax Guide",
  "wordCount": 2800,
  "timeRequired": "PT25M"
};

export default function IRS2026GuiaCompletoSimulador() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    🎯 IRS 2026: Escolha o Regime Fiscal Ideal
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      Este guia completo explica os <strong>3 regimes fiscais</strong> disponíveis para senhorios em 2026.
                      Use o nosso <Link href="/simulador-irs" className="font-medium underline">simulador fiscal gratuito</Link> para encontrar a melhor opção para o seu caso.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Header */}
            <header className="mb-12">
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-4">
                <span>2 de abril de 2026</span>
                <span>•</span>
                <span>25 min de leitura</span>
                <span>•</span>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">IRS 2026</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">RSAA 0%</span>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">Taxa 10%</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Regime Geral</span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">Simulador</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                IRS 2026: Guia Completo dos 3 Regimes Fiscais com Simulador
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                O guia definitivo para escolher o regime fiscal ideal para o seu arrendamento em 2026.
                Comparamos os três regimes disponíveis (RSAA 0%, renda moderada 10%, regime geral 25%),
                explicamos o efeito degrau aos €2.300 e oferecemos exemplos práticos com o nosso simulador fiscal gratuito.
              </p>
            </header>

            {/* Quick Navigation */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">🗂️ Índice de Conteúdos</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Regimes Fiscais</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li><a href="#rsaa-0" className="hover:text-blue-600">• RSAA 0%</a></li>
                    <li><a href="#renda-moderada-10" className="hover:text-blue-600">• Renda Moderada 10%</a></li>
                    <li><a href="#regime-geral-25" className="hover:text-blue-600">• Regime Geral 25%</a></li>
                    <li><a href="#efeito-degrau" className="hover:text-blue-600">• Efeito Degrau €2.300</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Ferramentas Práticas</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li><a href="#exemplos-praticos" className="hover:text-blue-600">• Exemplos Práticos</a></li>
                    <li><a href="#prazos-entrega" className="hover:text-blue-600">• Prazos de Entrega</a></li>
                    <li><a href="#simulador" className="hover:text-blue-600">• Simulador Fiscal</a></li>
                    <li><a href="#estrategias" className="hover:text-blue-600">• Estratégias de Optimização</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Introduction */}
            <section className="prose prose-lg max-w-none mb-12">
              <p>
                O ano fiscal de 2026 trouxe mudanças significativas para os senhorios portugueses.
                Com a introdução de novos regimes fiscais e a reformulação dos existentes,
                é fundamental compreender todas as opções disponíveis para optimizar a sua carga fiscal.
              </p>

              <p>
                Este guia abrangente analisa os <strong>três regimes fiscais principais</strong> que pode escolher para declarar
                os seus rendimentos de arrendamento, apresenta exemplos práticos detalhados e explica como utilizar
                o nosso simulador fiscal gratuito para encontrar a opção mais vantajosa para a sua situação específica.
              </p>
            </section>

            {/* CTA to Simulator */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-8 text-center mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                🧮 Calcule Agora o Seu IRS 2026
              </h2>
              <p className="text-blue-100 mb-6">
                Compare os 3 regimes fiscais instantaneamente com o nosso simulador gratuito
              </p>
              <Link
                href="/simulador-irs"
                className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition"
              >
                Aceder ao Simulador Fiscal Gratuito →
              </Link>
            </div>

            {/* RSAA 0% Section */}
            <section id="rsaa-0" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                1. Regime Simplificado de Apoio ao Arrendamento (RSAA) - Taxa 0%
              </h2>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-green-800 mb-3">
                  ✅ Principais Características do RSAA
                </h3>
                <ul className="text-green-700 space-y-2">
                  <li><strong>Taxa de IRS:</strong> 0% (isenção total)</li>
                  <li><strong>Limite de rendas:</strong> Até €2.300/mês por fracção</li>
                  <li><strong>Duração do contrato:</strong> Mínimo 5 anos</li>
                  <li><strong>Tipo de arrendamento:</strong> Exclusivamente habitacional</li>
                  <li><strong>Dedução de despesas:</strong> Não aplicável (taxa 0%)</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Condições de Elegibilidade para o RSAA
              </h3>

              <div className="space-y-4">
                <div className="border-l-4 border-green-400 pl-6">
                  <h4 className="font-semibold text-gray-900">Critérios Obrigatórios</h4>
                  <ul className="text-gray-700 mt-2 space-y-1">
                    <li>• Renda mensal máxima: €2.300 por fracção autónoma</li>
                    <li>• Contrato de arrendamento: duração mínima de 5 anos</li>
                    <li>• Finalidade: exclusivamente habitação permanente do inquilino</li>
                    <li>• Localização: sem restrições geográficas em Portugal continental</li>
                    <li>• Imóvel: em bom estado de conservação e habitabilidade</li>
                  </ul>
                </div>

                <div className="border-l-4 border-yellow-400 pl-6">
                  <h4 className="font-semibold text-gray-900">Limitações do RSAA</h4>
                  <ul className="text-gray-700 mt-2 space-y-1">
                    <li>• Não permite dedução de despesas (irrelevante com taxa 0%)</li>
                    <li>• Obrigatoriedade de manter contrato por 5 anos</li>
                    <li>• Rescisão antecipada pode implicar reposição de impostos</li>
                    <li>• Apenas para arrendamento habitacional (não comercial)</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-8">
                Exemplo Prático: RSAA 0%
              </h3>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Caso: Apartamento T2 em Lisboa
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Dados do Imóvel</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Renda mensal: €2.200</li>
                      <li>• Rendimento anual: €26.400</li>
                      <li>• Duração do contrato: 5 anos</li>
                      <li>• Finalidade: habitação permanente</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Cálculo do IRS</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Taxa aplicável: <strong>0%</strong></li>
                      <li>• IRS anual: <strong>€0</strong></li>
                      <li>• Poupança vs regime geral: <strong>€6.600</strong></li>
                      <li>• Poupança em 5 anos: <strong>€33.000</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Renda Moderada 10% Section */}
            <section id="renda-moderada-10" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                2. Regime de Renda Moderada - Taxa 10%
              </h2>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-orange-800 mb-3">
                  🎯 Principais Características da Taxa 10%
                </h3>
                <ul className="text-orange-700 space-y-2">
                  <li><strong>Taxa de IRS:</strong> 10% (taxa liberatória)</li>
                  <li><strong>Limite de rendas:</strong> Até €2.300/mês por fracção</li>
                  <li><strong>Duração do contrato:</strong> Sem requisito mínimo</li>
                  <li><strong>Tipo de arrendamento:</strong> Habitacional e comercial</li>
                  <li><strong>Dedução de despesas:</strong> Limitada (coeficiente fixo)</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Como Funciona o Regime de Renda Moderada
              </h3>

              <p className="text-gray-700 mb-4">
                O regime de renda moderada aplica uma <strong>taxa liberatória de 10%</strong> sobre os rendimentos
                de arrendamento, desde que a renda mensal não exceda €2.300. Este regime oferece simplicidade
                fiscal e é especialmente vantajoso para senhorios com escalões de IRS elevados.
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-orange-400 pl-6">
                  <h4 className="font-semibold text-gray-900">Vantagens da Taxa 10%</h4>
                  <ul className="text-gray-700 mt-2 space-y-1">
                    <li>• Simplicidade: taxa fixa de 10%, sem complicações</li>
                    <li>• Flexibilidade: sem requisito de duração mínima do contrato</li>
                    <li>• Aplicabilidade: arrendamento habitacional e comercial</li>
                    <li>• Previsibilidade: carga fiscal conhecida antecipadamente</li>
                    <li>• Competitividade: vantajosa para escalões de IRS ≥ 37%</li>
                  </ul>
                </div>

                <div className="border-l-4 border-red-400 pl-6">
                  <h4 className="font-semibold text-gray-900">Limitações da Taxa 10%</h4>
                  <ul className="text-gray-700 mt-2 space-y-1">
                    <li>• Dedução limitada de despesas (apenas coeficiente fixo)</li>
                    <li>• Limite máximo de renda: €2.300/mês</li>
                    <li>• Menos vantajosa que RSAA para rendas elegíveis</li>
                    <li>• Pode ser menos vantajosa que regime geral com muitas despesas</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-8">
                Exemplo Prático: Taxa 10%
              </h3>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Caso: Loja Comercial no Porto
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Dados do Imóvel</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Renda mensal: €2.000</li>
                      <li>• Rendimento anual: €24.000</li>
                      <li>• Tipo: arrendamento comercial</li>
                      <li>• Despesas anuais: €3.000</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Cálculo do IRS</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Taxa aplicável: <strong>10%</strong></li>
                      <li>• IRS anual: <strong>€2.400</strong></li>
                      <li>• Rendimento líquido: <strong>€21.600</strong></li>
                      <li>• Poupança vs regime geral: <strong>€3.600</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Regime Geral 25% Section */}
            <section id="regime-geral-25" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                3. Regime Geral - Taxa Progressiva até 25%
              </h2>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">
                  ⚖️ Principais Características do Regime Geral
                </h3>
                <ul className="text-purple-700 space-y-2">
                  <li><strong>Taxa de IRS:</strong> Progressiva (14,5% a 48% + sobretaxa)</li>
                  <li><strong>Limite de rendas:</strong> Sem limite</li>
                  <li><strong>Dedução de despesas:</strong> Total (todas as despesas comprováveis)</li>
                  <li><strong>Englobamento:</strong> Com restantes rendimentos</li>
                  <li><strong>Flexibilidade:</strong> Máxima para optimização fiscal</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Funcionamento do Regime Geral
              </h3>

              <p className="text-gray-700 mb-4">
                No regime geral, os rendimentos de arrendamento são <strong>englobados com os restantes rendimentos</strong>
                e tributados de acordo com os escalões progressivos do IRS. Este regime permite a dedução total
                de todas as despesas relacionadas com o arrendamento.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Escalões de IRS 2026
              </h3>

              <div className="overflow-x-auto mb-6">
                <table className="min-w-full border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 border-b text-left">Rendimento Coletável</th>
                      <th className="px-4 py-2 border-b text-left">Taxa Normal</th>
                      <th className="px-4 py-2 border-b text-left">Taxa Média Máxima</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="px-4 py-2 border-b">Até €7.703</td>
                      <td className="px-4 py-2 border-b">14,5%</td>
                      <td className="px-4 py-2 border-b">14,5%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-b">€7.703 - €11.623</td>
                      <td className="px-4 py-2 border-b">21%</td>
                      <td className="px-4 py-2 border-b">18,3%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-b">€11.623 - €16.472</td>
                      <td className="px-4 py-2 border-b">26,5%</td>
                      <td className="px-4 py-2 border-b">21,4%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-b">€16.472 - €21.321</td>
                      <td className="px-4 py-2 border-b">28,5%</td>
                      <td className="px-4 py-2 border-b">23,3%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-b">€21.321 - €27.146</td>
                      <td className="px-4 py-2 border-b">35%</td>
                      <td className="px-4 py-2 border-b">25,8%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-b">€27.146 - €39.791</td>
                      <td className="px-4 py-2 border-b">37%</td>
                      <td className="px-4 py-2 border-b">28,7%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-b">€39.791 - €51.681</td>
                      <td className="px-4 py-2 border-b">43,5%</td>
                      <td className="px-4 py-2 border-b">32,0%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-b">€51.681 - €79.251</td>
                      <td className="px-4 py-2 border-b">45%</td>
                      <td className="px-4 py-2 border-b">35,2%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border-b">Superior a €79.251</td>
                      <td className="px-4 py-2 border-b">48%</td>
                      <td className="px-4 py-2 border-b">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Despesas Dedutíveis no Regime Geral
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-3">Despesas Totalmente Dedutíveis</h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Impostos e taxas (IMI, derrama, taxa de lixo)</li>
                    <li>• Seguros do imóvel</li>
                    <li>• Despesas de conservação e reparação</li>
                    <li>• Despesas de condomínio</li>
                    <li>• Juros de empréstimos para aquisição/obras</li>
                    <li>• Comissões e honorários de gestão</li>
                    <li>• Depreciações e amortizações</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-3">Despesas com Limitações</h4>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• Obras de beneficiação (máximo 15% das receitas)</li>
                    <li>• Despesas de financiamento (juros limitados)</li>
                    <li>• Depreciação do imóvel (método legal específico)</li>
                    <li>• Despesas mistas (apenas parte proporcional)</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-8">
                Exemplo Prático: Regime Geral
              </h3>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Caso: Moradia T4 em Cascais
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Dados Anuais</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Rendimento bruto: €36.000</li>
                      <li>• IMI e seguros: €1.200</li>
                      <li>• Manutenção: €2.400</li>
                      <li>• Gestão: €1.800</li>
                      <li>• Depreciação: €1.600</li>
                      <li>• <strong>Total despesas: €7.000</strong></li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Cálculo Simplificado</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Rendimento coletável: €29.000</li>
                      <li>• Taxa aplicável: ~35%</li>
                      <li>• IRS sobre arrendamento: <strong>€10.150</strong></li>
                      <li>• Rendimento líquido: <strong>€25.850</strong></li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded">
                  <p className="text-sm text-blue-700">
                    <strong>Nota:</strong> No regime geral, o valor exato depende dos outros rendimentos do agregado.
                    Esta simulação assume um cenário típico.
                  </p>
                </div>
              </div>
            </section>

            {/* Efeito Degrau Section */}
            <section id="efeito-degrau" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                4. O Efeito Degrau aos €2.300 - Cuidados a Ter
              </h2>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-red-800 mb-3">
                  ⚠️ Atenção ao Limite de €2.300
                </h3>
                <p className="text-red-700">
                  Ultrapassar os <strong>€2.300 de renda mensal</strong> mesmo que por €1 significa perder
                  o acesso aos regimes RSAA (0%) e renda moderada (10%), sendo obrigatório aplicar
                  o regime geral com taxas muito superiores.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Como Funciona o Efeito Degrau
              </h3>

              <p className="text-gray-700 mb-4">
                O <strong>efeito degrau</strong> ocorre quando uma pequena diferença na renda mensal resulta
                numa diferença significativa na tributação. Aos €2.300, esta situação é particularmente
                pronunciada porque marca a fronteira entre regimes fiscais muito diferentes.
              </p>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Comparação: €2.300 vs €2.301 (Exemplo Anual)
                </h4>

                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 border-b text-left">Cenário</th>
                        <th className="px-4 py-2 border-b text-right">Renda Anual</th>
                        <th className="px-4 py-2 border-b text-center">Regime Aplicável</th>
                        <th className="px-4 py-2 border-b text-right">IRS</th>
                        <th className="px-4 py-2 border-b text-right">Rendimento Líquido</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr>
                        <td className="px-4 py-2 border-b">€2.300/mês</td>
                        <td className="px-4 py-2 border-b text-right">€27.600</td>
                        <td className="px-4 py-2 border-b text-center text-green-700 font-medium">RSAA 0%</td>
                        <td className="px-4 py-2 border-b text-right text-green-700 font-bold">€0</td>
                        <td className="px-4 py-2 border-b text-right text-green-700 font-bold">€27.600</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border-b">€2.301/mês</td>
                        <td className="px-4 py-2 border-b text-right">€27.612</td>
                        <td className="px-4 py-2 border-b text-center text-red-700 font-medium">Regime Geral</td>
                        <td className="px-4 py-2 border-b text-right text-red-700 font-bold">~€9.500</td>
                        <td className="px-4 py-2 border-b text-right text-red-700 font-bold">€18.112</td>
                      </tr>
                      <tr className="bg-yellow-50">
                        <td className="px-4 py-2 border-b font-bold">Diferença</td>
                        <td className="px-4 py-2 border-b text-right">+€12</td>
                        <td className="px-4 py-2 border-b text-center">-</td>
                        <td className="px-4 py-2 border-b text-right text-red-700 font-bold">+€9.500</td>
                        <td className="px-4 py-2 border-b text-right text-red-700 font-bold">-€9.488</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Estratégias para Evitar o Efeito Degrau
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-3">Técnicas de Optimização</h4>
                  <ul className="text-green-700 text-sm space-y-2">
                    <li>• Manter renda exatamente em €2.300</li>
                    <li>• Negociar clausulas de revisão condicionada</li>
                    <li>• Incluir despesas do inquilino na renda (agua, luz)</li>
                    <li>• Separar serviços adicionais (garagem, arrecadação)</li>
                    <li>• Considerar contratos de 5 anos para RSAA</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-3">Cuidados Legais</h4>
                  <ul className="text-yellow-700 text-sm space-y-2">
                    <li>• Todas as estratégias devem ser legais e transparentes</li>
                    <li>• Documentar adequadamente todas as componentes</li>
                    <li>• Consultar assessoria fiscal especializada</li>
                    <li>• Considerar implicações de longo prazo</li>
                    <li>• Avaliar risco de fiscalização</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Prazos Section */}
            <section id="prazos-entrega" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                5. Prazos de Entrega do IRS 2026
              </h2>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">
                  📅 Calendário Fiscal 2026
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-blue-800 mb-2">Prazos Principais</h4>
                    <ul className="text-blue-700 space-y-1">
                      <li>• <strong>Início:</strong> 1 de abril de 2027</li>
                      <li>• <strong>Fim:</strong> 30 de junho de 2027</li>
                      <li>• <strong>Via electrónica:</strong> Até 31 de julho de 2027</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800 mb-2">Datas Importantes</h4>
                    <ul className="text-blue-700 space-y-1">
                      <li>• <strong>1º pagamento:</strong> 31 de julho de 2027</li>
                      <li>• <strong>2º pagamento:</strong> 15 de setembro de 2027</li>
                      <li>• <strong>3º pagamento:</strong> 15 de dezembro de 2027</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Documentação Necessária por Regime
              </h3>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">📋 RSAA 0%</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Contrato de arrendamento (mín. 5 anos)</li>
                    <li>• Recibos de renda emitidos</li>
                    <li>• Declaração de finalidade habitacional</li>
                    <li>• Comprovativo de registo no Portal das Finanças</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">📋 Taxa 10%</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Contratos de arrendamento</li>
                    <li>• Recibos de renda emitidos</li>
                    <li>• Declaração de opção pela taxa liberatória</li>
                    <li>• Comprovativos de retenção (se aplicável)</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">📋 Regime Geral</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Contratos de arrendamento</li>
                    <li>• Recibos de renda emitidos</li>
                    <li>• Todas as faturas de despesas dedutíveis</li>
                    <li>• Mapas de depreciações</li>
                    <li>• Extratos bancários (se necessário)</li>
                    <li>• Comprovativos de seguros e IMI</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Exemplos Práticos Section */}
            <section id="exemplos-praticos" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                6. Exemplos Práticos Detalhados
              </h2>

              <div className="space-y-8">
                {/* Exemplo 1 */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Exemplo 1: Escolha entre RSAA e Taxa 10%
                  </h3>

                  <div className="bg-gray-50 rounded p-4 mb-4">
                    <h4 className="font-semibold mb-2">Situação:</h4>
                    <p className="text-sm text-gray-700">
                      João tem um apartamento T1 em Lisboa que pretende arrendar por €2.100/mês.
                      Está indeciso entre o RSAA e a taxa de 10%. O apartamento pode ser arrendado
                      tanto para habitação permanente como para estudantes.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 border border-green-200 rounded p-4">
                      <h4 className="font-semibold text-green-800 mb-3">Opção A: RSAA 0%</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Rendimento anual: €25.200</li>
                        <li>• IRS: €0</li>
                        <li>• Rendimento líquido: <strong>€25.200</strong></li>
                        <li>• Compromisso: 5 anos mínimos</li>
                        <li>• Restrição: habitação permanente</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded p-4">
                      <h4 className="font-semibold text-orange-800 mb-3">Opção B: Taxa 10%</h4>
                      <ul className="text-sm text-orange-700 space-y-1">
                        <li>• Rendimento anual: €25.200</li>
                        <li>• IRS: €2.520</li>
                        <li>• Rendimento líquido: <strong>€22.680</strong></li>
                        <li>• Compromisso: sem restrições</li>
                        <li>• Flexibilidade: total</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded">
                    <p className="text-sm text-blue-700">
                      <strong>Recomendação:</strong> Se João pretende manter o arrendamento estável por 5+ anos
                      e para habitação permanente, o RSAA oferece uma poupança de €2.520/ano (€12.600 em 5 anos).
                    </p>
                  </div>
                </div>

                {/* Exemplo 2 */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Exemplo 2: Regime Geral vs Taxa 10%
                  </h3>

                  <div className="bg-gray-50 rounded p-4 mb-4">
                    <h4 className="font-semibold mb-2">Situação:</h4>
                    <p className="text-sm text-gray-700">
                      Maria tem uma moradia que arrenda por €2.800/mês (acima dos €2.300).
                      Tem despesas significativas de manutenção e está no escalão de 37% do IRS.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-1 gap-6">
                    <div className="bg-purple-50 border border-purple-200 rounded p-4">
                      <h4 className="font-semibold text-purple-800 mb-3">Regime Geral (Única Opção)</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium mb-2">Receitas e Despesas</h5>
                          <ul className="text-sm text-purple-700 space-y-1">
                            <li>• Rendimento bruto: €33.600</li>
                            <li>• IMI e seguros: €2.100</li>
                            <li>• Obras e manutenção: €8.500</li>
                            <li>• Gestão e comissões: €2.000</li>
                            <li>• <strong>Total despesas: €12.600</strong></li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Cálculo Final</h5>
                          <ul className="text-sm text-purple-700 space-y-1">
                            <li>• Rendimento coletável: €21.000</li>
                            <li>• Taxa aplicável: ~30%</li>
                            <li>• IRS aprox.: €6.300</li>
                            <li>• <strong>Rendimento líquido: €27.300</strong></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded">
                    <p className="text-sm text-blue-700">
                      <strong>Nota:</strong> Com renda superior a €2.300, apenas o regime geral é possível.
                      As despesas elevadas tornam-no mais atrativo neste caso específico.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Simulador Section */}
            <section id="simulador" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                7. Use o Nosso Simulador Fiscal Gratuito
              </h2>

              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-8 text-center text-white mb-8">
                <h3 className="text-2xl font-bold mb-4">
                  🎯 Encontre o Regime Fiscal Ideal
                </h3>
                <p className="text-green-100 mb-6">
                  O nosso simulador analisa a sua situação específica e recomenda o regime fiscal
                  que maximiza o seu rendimento líquido, considerando todos os fatores relevantes.
                </p>
                <Link
                  href="/simulador-irs"
                  className="inline-block bg-white text-green-600 font-bold px-8 py-4 rounded-lg hover:bg-green-50 transition"
                >
                  Simular Agora o Meu IRS 2026 →
                </Link>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Funcionalidades do Simulador
              </h3>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-2xl mb-2">📊</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Comparação Instantânea</h4>
                  <p className="text-sm text-gray-600">
                    Compare os três regimes fiscais lado a lado com base nos seus dados reais
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-2xl mb-2">💡</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Recomendação Personalizada</h4>
                  <p className="text-sm text-gray-600">
                    Receba a recomendação do regime mais vantajoso para o seu perfil específico
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-2xl mb-2">📈</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Projeções de Poupança</h4>
                  <p className="text-sm text-gray-600">
                    Visualize as poupanças potenciais a 1, 3 e 5 anos com diferentes estratégias
                  </p>
                </div>
              </div>
            </section>

            {/* Estratégias Section */}
            <section id="estrategias" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                8. Estratégias de Optimização Fiscal
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Estratégias por Perfil de Senhorio
              </h3>

              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="font-semibold text-green-800 mb-3">
                    💰 Perfil: Senhorios com Baixos Rendimentos Totais
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-green-800 mb-2">Características</h5>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Rendimentos totais &lt; €20.000</li>
                        <li>• Escalão IRS ≤ 26,5%</li>
                        <li>• Poucas despesas dedutíveis</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-green-800 mb-2">Estratégia Recomendada</h5>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Priorizar RSAA se elegível</li>
                        <li>• Taxa 10% como segunda opção</li>
                        <li>• Evitar regime geral</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <h4 className="font-semibold text-orange-800 mb-3">
                    🏢 Perfil: Senhorios com Altos Rendimentos
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-orange-800 mb-2">Características</h5>
                      <ul className="text-sm text-orange-700 space-y-1">
                        <li>• Rendimentos totais &gt; €40.000</li>
                        <li>• Escalão IRS ≥ 37%</li>
                        <li>• Multiple propriedades</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-orange-800 mb-2">Estratégia Recomendada</h5>
                      <ul className="text-sm text-orange-700 space-y-1">
                        <li>• RSAA para propriedades elegíveis</li>
                        <li>• Taxa 10% para outras ≤ €2.300</li>
                        <li>• Maximizar despesas no regime geral</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h4 className="font-semibold text-purple-800 mb-3">
                    🔧 Perfil: Senhorios com Muitas Despesas
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-purple-800 mb-2">Características</h5>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• Imóveis antigos</li>
                        <li>• Obras frequentes</li>
                        <li>• Despesas &gt; 20% das receitas</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-purple-800 mb-2">Estratégia Recomendada</h5>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• Avaliar regime geral cuidadosamente</li>
                        <li>• Documentar todas as despesas</li>
                        <li>• Considerar timing das obras</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-8">
                Dicas Avançadas de Planeamento Fiscal
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">📅 Timing Estratégico</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Concentrar obras em anos específicos</li>
                      <li>• Planear aquisições e vendas</li>
                      <li>• Distribuir rendimentos entre anos</li>
                      <li>• Considerar reformas em diferentes anos</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">🏗️ Gestão de Obras</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Distinguir conservação vs beneficiação</li>
                      <li>• Documentar adequadamente todas as despesas</li>
                      <li>• Considerar impacto no valor patrimonial</li>
                      <li>• Planear depreciações estrategicamente</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">👥 Estruturação Familiar</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Distribuição de propriedades pelo agregado</li>
                      <li>• Considerações de regime de bens</li>
                      <li>• Planeamento sucessório</li>
                      <li>• Optimização conjunta do IRS</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">⚖️ Conformidade Legal</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Manter documentação organizada</li>
                      <li>• Cumprir prazos de entrega</li>
                      <li>• Emitir recibos obrigatórios</li>
                      <li>• Consultar profissionais quando necessário</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Conclusão */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Conclusão: A Importância da Escolha Informada
              </h2>

              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-8">
                <p className="text-gray-700 mb-4">
                  A escolha do regime fiscal correto para o arrendamento em 2026 pode resultar em
                  poupanças significativas ou, pelo contrário, numa carga fiscal desnecessariamente elevada.
                  Com as três opções disponíveis, é fundamental analisar cada situação específica.
                </p>

                <p className="text-gray-700 mb-4">
                  O <strong>RSAA com taxa de 0%</strong> oferece a máxima poupança fiscal para quem pode
                  comprometer-se com contratos de 5 anos para habitação permanente. A <strong>taxa de 10%</strong>
                  proporciona flexibilidade mantendo uma tributação moderada. O <strong>regime geral</strong>
                  permite deduzir todas as despesas mas pode resultar em taxas elevadas.
                </p>

                <div className="bg-white rounded-lg p-6 mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    🎯 Próximos Passos Recomendados
                  </h3>
                  <ol className="text-gray-700 space-y-2">
                    <li>1. <strong>Simule a sua situação</strong> com o nosso simulador fiscal gratuito</li>
                    <li>2. <strong>Analise as implicações</strong> de cada regime para os seus objetivos</li>
                    <li>3. <strong>Documente a sua escolha</strong> e organize a documentação necessária</li>
                    <li>4. <strong>Consulte um profissional</strong> se a situação for complexa</li>
                    <li>5. <strong>Monitore mudanças</strong> legislativas que possam afetar a sua estratégia</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Final CTA */}
            <div className="text-center bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">
                Optimize o Seu IRS 2026 Agora
              </h2>
              <p className="text-blue-100 mb-6">
                Não deixe para última hora. Use o nosso simulador fiscal e tome decisões informadas sobre o seu arrendamento.
              </p>
              <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
                <Link
                  href="/simulador-irs"
                  className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition"
                >
                  Calcular o Meu IRS →
                </Link>
                <Link
                  href="/blog"
                  className="inline-block bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-800 transition"
                >
                  Mais Guias Fiscais
                </Link>
              </div>
            </div>

            {/* Article Footer */}
            <footer className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <p className="text-sm text-gray-500">
                    Última atualização: 2 de abril de 2026
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Este artigo serve apenas para fins informativos e não constitui aconselhamento fiscal personalizado.
                    Consulte sempre um profissional qualificado para a sua situação específica.
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Link
                    href="/blog"
                    className="text-sm text-blue-600 hover:text-blue-800 transition"
                  >
                    ← Voltar ao Blog
                  </Link>
                </div>
              </div>
            </footer>
          </article>
        </main>
      </div>
    </>
  );
}