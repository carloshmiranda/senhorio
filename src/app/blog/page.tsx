import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Senhorio - Guias de Impostos para Senhorios",
  description: "Guias completos sobre impostos, legislação e gestão de arrendamento em Portugal. Mantenha-se atualizado com as mudanças fiscais de 2026.",
  openGraph: {
    title: "Blog Senhorio - Guias de Impostos para Senhorios",
    description: "Guias completos sobre impostos, legislação e gestão de arrendamento em Portugal.",
    type: "website",
  },
};

const articles = [
  {
    slug: "portugal-rental-property-tax-guide-2026",
    title: "Portugal Rental Property Tax Guide 2026: Complete Tax Overview for Landlords",
    excerpt: "Complete 2026 tax guide for Portugal rental property owners. New 10% tax rate, AIMI exemptions, rent increase rules, and compliance requirements for expat and resident landlords.",
    publishedAt: "2026-03-22",
    readTime: "18 min",
    tags: ["Complete Guide", "2026 Tax Rules", "AIMI Exemption", "Compliance"],
  },
  {
    slug: "portugal-landlord-tax-calculator-2026",
    title: "Portugal Landlord Tax Calculator 2026: Complete Guide for Expat & Non-Resident Landlords",
    excerpt: "Free Portugal landlord tax calculator for 2026. Compare all 4 tax regimes including the new 10% rate. Essential guide for expat and non-resident property investors with practical examples.",
    publishedAt: "2026-03-22",
    readTime: "12 min",
    tags: ["English Guide", "2026 Tax Rules", "Free Calculator", "Expat Friendly"],
  },
  {
    slug: "isencao-aimi-2026-qualificar-nova-isencao",
    title: "Isenção AIMI 2026: Como Qualificar para a Nova Isenção de Arrendamento Acessível",
    excerpt: "Descubra como qualificar para a isenção AIMI 2026 com rendas até €2.300/mês. Guia completo com critérios, exemplos práticos e poupanças estimadas.",
    publishedAt: "2026-03-22",
    readTime: "12 min",
    tags: ["Isenção AIMI", "AIMI 2026", "Habitação Acessível", "Calculadora"],
  },
  {
    slug: "recibos-renda-eletronicos-guia-2026",
    title: "Recibos de Renda Eletrónicos: Guia Completo para Senhorios 2026",
    excerpt: "Tudo sobre recibos de renda eletrónicos em Portugal: obrigações legais, passo a passo no Portal das Finanças, campos obrigatórios, prazos, coimas e como automatizar.",
    publishedAt: "2026-03-21",
    readTime: "15 min",
    tags: ["Recibos Eletrónicos", "Portal Finanças", "Obrigações Legais", "Guia 2026"],
  },
  {
    slug: "como-calcular-atualizacoes-renda-2026",
    title: "Como Calcular Atualizações de Renda 2026: Coeficiente INE e Regras NRAU",
    excerpt: "Guia passo a passo para calcular atualizações de renda em 2026. Coeficiente INE de 2,24%, regras do NRAU, contratos habitacionais vs. comerciais e exemplos práticos.",
    publishedAt: "2026-03-21",
    readTime: "12 min",
    tags: ["Atualização Rendas", "Coeficiente INE", "NRAU", "Calculadora"],
  },
  {
    slug: "irs-arrendamento-2026-nova-taxa-10-porcento",
    title: "IRS Arrendamento 2026: Tudo Sobre a Nova Taxa de 10%",
    excerpt: "Descubra as mudanças fiscais para senhorios em 2026. Nova taxa de 10%, regras de agregação e como calcular o seu IRS.",
    publishedAt: "2026-03-21",
    readTime: "8 min",
    tags: ["IRS 2026", "Taxa 10%", "Arrendamento", "Simulador"],
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition">
            ← Voltar ao Senhorio
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            Blog Senhorio
          </h1>
          <p className="text-gray-600 mt-2">
            Guias, análises e atualizações fiscais para senhorios portugueses
          </p>
        </div>
      </header>

      {/* Articles */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {articles.map((article) => (
            <article key={article.slug} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
              <div className="flex flex-wrap gap-2 mb-3">
                {article.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <Link href={`/blog/${article.slug}`} className="group">
                <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition">
                  {article.title}
                </h2>
              </Link>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {article.excerpt}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <time dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString('pt-PT')}
                </time>
                <span>•</span>
                <span>{article.readTime} leitura</span>
              </div>
            </article>
          ))}
        </div>

        {/* SEO Content */}
        <section className="mt-16 prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Senhorios: Mantenha-se Atualizado com as Mudanças Fiscais
          </h2>
          <p className="text-gray-600 leading-relaxed">
            O blog Senhorio é a sua fonte de informação confiável sobre impostos, legislação
            e gestão de propriedades arrendadas em Portugal. Com as constantes mudanças na
            legislação fiscal, especialmente as atualizações do IRS para 2026, é crucial
            manter-se informado para garantir o cumprimento das suas obrigações fiscais.
          </p>
        </section>
      </main>
    </div>
  );
}