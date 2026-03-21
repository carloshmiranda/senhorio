import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IRS Arrendamento 2026: Nova Taxa de 10% - Simulador e Guia Completo | Senhorio",
  description: "Guia completo sobre a nova taxa de 10% do IRS para arrendamento em 2026. Simulador gratuito, regras de agregação e como calcular o imposto sobre rendas em Portugal.",
  keywords: [
    "IRS arrendamento 2026",
    "simulador IRS arrendamento 2026",
    "imposto 10% rendas Portugal",
    "taxa 10% arrendamento",
    "Portugal landlord tax calculator 2026",
    "Portugal rental income tax 10 percent",
    "calculadora IRS senhorios 2026"
  ],
  openGraph: {
    title: "IRS Arrendamento 2026: Nova Taxa de 10% - Guia Completo",
    description: "Descubra tudo sobre a nova taxa de 10% do IRS para arrendamento em 2026. Simulador gratuito e regras atualizadas.",
    type: "article",
    publishedTime: "2026-03-21T10:00:00.000Z",
  },
  alternates: {
    canonical: "https://senhorio.vercel.app/blog/irs-arrendamento-2026-nova-taxa-10-porcento",
  },
};

export default function IRSArrendamento2026Page() {
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
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
                IRS 2026
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                Nova Taxa 10%
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium">
                Simulador
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              IRS Arrendamento 2026: Tudo Sobre a Nova Taxa de 10%
            </h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Descubra as mudanças fiscais revolucionárias para senhorios em 2026.
              Nova taxa fixa de 10%, regras de agregação simplificadas e como calcular
              corretamente o seu IRS sobre rendimentos de arrendamento.
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500 border-l-4 border-blue-500 pl-4">
              <time dateTime="2026-03-21T10:00:00.000Z">
                21 de março de 2026
              </time>
              <span>•</span>
              <span>8 minutos de leitura</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-gray prose-lg max-w-none">
            {/* Quick Calculator CTA */}
            <div className="not-prose bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                🧮 Calcule o Seu IRS Agora
              </h3>
              <p className="text-blue-700 mb-4">
                Use o nosso simulador gratuito para comparar as diferentes opções fiscais de 2026.
              </p>
              <Link
                href="/calculadora"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Abrir Simulador IRS 2026 →
              </Link>
            </div>

            {/* Table of Contents */}
            <nav className="not-prose bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Índice</h3>
              <ol className="space-y-2 text-sm">
                <li><a href="#novidades-2026" className="text-blue-600 hover:text-blue-800">1. Principais Novidades Fiscais de 2026</a></li>
                <li><a href="#taxa-10-porcento" className="text-blue-600 hover:text-blue-800">2. Nova Taxa de 10%: Como Funciona</a></li>
                <li><a href="#regimes-fiscais" className="text-blue-600 hover:text-blue-800">3. Comparação dos Regimes Fiscais</a></li>
                <li><a href="#agregacao-familiar" className="text-blue-600 hover:text-blue-800">4. Agregação Familiar: Novas Regras</a></li>
                <li><a href="#calculadora-pratica" className="text-blue-600 hover:text-blue-800">5. Como Calcular o Seu IRS</a></li>
                <li><a href="#exemplos-praticos" className="text-blue-600 hover:text-blue-800">6. Exemplos Práticos</a></li>
                <li><a href="#deadlines-obrigacoes" className="text-blue-600 hover:text-blue-800">7. Prazos e Obrigações</a></li>
              </ol>
            </nav>

            <h2 id="novidades-2026">1. Principais Novidades Fiscais de 2026</h2>

            <p>
              O ano de 2026 trouxe mudanças significativas na tributação de rendimentos de arrendamento
              em Portugal. A alteração mais importante é a <strong>nova taxa fixa de 10%</strong> que
              se junta às opções já existentes, oferecendo aos senhorios maior flexibilidade na
              escolha do regime fiscal mais vantajoso.
            </p>

            <div className="not-prose bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
              <h4 className="text-green-900 font-semibold mb-2">✅ Resumo das Mudanças 2026</h4>
              <ul className="text-green-800 space-y-1 text-sm">
                <li>• Nova taxa fixa de 10% sobre rendimentos brutos</li>
                <li>• Simplificação das regras de agregação familiar</li>
                <li>• Novos limiares para dedução de despesas</li>
                <li>• Portal das Finanças com interface melhorada</li>
                <li>• Prazo estendido para declaração até 30 de junho</li>
              </ul>
            </div>

            <h2 id="taxa-10-porcento">2. Nova Taxa de 10%: Como Funciona</h2>

            <p>
              A <strong>taxa fixa de 10%</strong> aplica-se diretamente sobre os rendimentos brutos
              de arrendamento, sem possibilidade de dedução de despesas. Esta opção é
              particularmente vantajosa para senhorios com:
            </p>

            <ul>
              <li>Poucas despesas dedutíveis</li>
              <li>Propriedades totalmente pagas (sem empréstimos)</li>
              <li>Rendimentos anuais até €25,000</li>
              <li>Preferência por simplicidade administrativa</li>
            </ul>

            <div className="not-prose overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Característica
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Taxa 10%
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Englobamento
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">Taxa aplicada</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10% fixo</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">14.5% - 48%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">Dedução despesas</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">❌ Não permitido</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">✅ Permitido</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">Complexidade</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">🟢 Baixa</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">🟡 Média</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="regimes-fiscais">3. Comparação dos Regimes Fiscais</h2>

            <p>
              Com a introdução da taxa de 10%, os senhorios têm agora <strong>4 opções fiscais</strong>
              para tributar os seus rendimentos de arrendamento:
            </p>

            <h3>Opção 1: Taxa Fixa de 10% (NOVA)</h3>
            <p>
              Ideal para senhorios com poucas despesas ou que preferem simplicidade.
              O imposto é calculado como <code>Rendimento Anual × 10%</code>.
            </p>

            <h3>Opção 2: Taxa Liberatória de 25%</h3>
            <p>
              Mantém-se como opção para quem quer tributação na fonte. Aplicável
              diretamente pelo inquilino ou administração predial.
            </p>

            <h3>Opção 3: Englobamento (Escalões Normais)</h3>
            <p>
              Para senhorios com muitas despesas dedutíveis ou rendimentos elevados.
              Permite deduzir juros de empréstimos, obras, seguros, etc.
            </p>

            <h3>Opção 4: Regime Simplificado (Predial)</h3>
            <p>
              Para rendimentos prediais específicos. Dedução automática de 4%
              sobre o rendimento coletável.
            </p>

            <h2 id="calculadora-pratica">5. Como Calcular o Seu IRS</h2>

            <p>
              Para escolher a opção mais vantajosa, é essencial calcular o imposto
              em cada regime. O <strong>Simulador IRS Senhorio</strong> faz este
              cálculo automaticamente.
            </p>

            <div className="not-prose bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h4 className="text-yellow-900 font-semibold mb-2">⚠️ Atenção: Escolha Irreversível</h4>
              <p className="text-yellow-800 text-sm">
                A opção fiscal escolhida para 2026 mantém-se para todo o ano fiscal.
                Calcule bem antes de decidir!
              </p>
            </div>

            <h2 id="exemplos-praticos">6. Exemplos Práticos</h2>

            <div className="not-prose space-y-6">
              <div className="border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Exemplo 1: Apartamento T2 no Porto</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Situação:</strong></p>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Renda: €800/mês (€9,600/ano)</li>
                      <li>• Despesas: €500/ano</li>
                      <li>• Propriedade quitada</li>
                    </ul>
                  </div>
                  <div>
                    <p><strong>Melhor opção: Taxa 10%</strong></p>
                    <ul className="text-green-600 space-y-1">
                      <li>• Imposto: €960/ano</li>
                      <li>• Rendimento líquido: €8,640</li>
                      <li>• Simplicidade máxima</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Exemplo 2: Moradia com Empréstimo</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Situação:</strong></p>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Renda: €1,200/mês (€14,400/ano)</li>
                      <li>• Juros empréstimo: €3,600/ano</li>
                      <li>• Outras despesas: €800/ano</li>
                    </ul>
                  </div>
                  <div>
                    <p><strong>Melhor opção: Englobamento</strong></p>
                    <ul className="text-blue-600 space-y-1">
                      <li>• Rendimento tributável: €10,000</li>
                      <li>• Aproveitamento de deduções</li>
                      <li>• Menor carga fiscal</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <h2 id="deadlines-obrigacoes">7. Prazos e Obrigações 2026</h2>

            <div className="not-prose">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h4 className="text-red-900 font-semibold mb-3">📅 Prazos Importantes</h4>
                  <ul className="text-red-800 space-y-2 text-sm">
                    <li><strong>31 de março:</strong> Entrega do IRS</li>
                    <li><strong>30 de junho:</strong> Prazo limite (extensão)</li>
                    <li><strong>31 de dezembro:</strong> Opção regime 2027</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="text-blue-900 font-semibold mb-3">📋 Documentos Necessários</h4>
                  <ul className="text-blue-800 space-y-2 text-sm">
                    <li>• Recibos de renda pagos</li>
                    <li>• Faturas de despesas dedutíveis</li>
                    <li>• Caderneta predial</li>
                    <li>• Contratos de arrendamento</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="not-prose mt-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white text-center">
              <h3 className="text-xl font-bold mb-4">
                Simplifique a Sua Gestão Fiscal
              </h3>
              <p className="mb-6 text-blue-100">
                O Senhorio ajuda a calcular, comparar e otimizar os seus impostos automaticamente.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/calculadora"
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition"
                >
                  Usar Calculadora Gratuita
                </Link>
                <Link
                  href="/"
                  className="px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-blue-600 transition"
                >
                  Saber Mais sobre o Senhorio
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <section className="mt-16 border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Artigos Relacionados</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/blog/como-calcular-atualizacoes-renda-2026" className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition block">
              <h3 className="font-semibold text-gray-900 mb-2">
                Como Calcular Atualizações de Renda 2026
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Coeficiente INE 2,24% e regras NRAU para aumentos de renda.
              </p>
              <span className="text-blue-600 text-sm font-medium">Ler artigo →</span>
            </Link>
            <Link href="/blog/recibos-renda-eletronicos-guia-2026" className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition block">
              <h3 className="font-semibold text-gray-900 mb-2">
                Recibos de Renda Eletrónicos: Guia Completo 2026
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Como emitir recibos eletrónicos no Portal das Finanças, prazos e coimas.
              </p>
              <span className="text-blue-600 text-sm font-medium">Ler artigo →</span>
            </Link>
          </div>
        </section>
      </main>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "IRS Arrendamento 2026: Nova Taxa de 10%",
            "description": "Guia completo sobre a nova taxa de 10% do IRS para arrendamento em 2026",
            "author": {
              "@type": "Organization",
              "name": "Senhorio"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Senhorio",
              "logo": {
                "@type": "ImageObject",
                "url": "https://senhorio.vercel.app/logo.png"
              }
            },
            "datePublished": "2026-03-21T10:00:00.000Z",
            "dateModified": "2026-03-21T10:00:00.000Z",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://senhorio.vercel.app/blog/irs-arrendamento-2026-nova-taxa-10-porcento"
            },
            "keywords": "IRS arrendamento 2026, taxa 10% arrendamento, simulador IRS, imposto rendas Portugal",
            "articleSection": "Tax Guide"
          })
        }}
      />
    </div>
  );
}