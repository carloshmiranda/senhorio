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
    slug: "contrato-arrendamento-habitacional-2026",
    title: "Contrato de Arrendamento Habitacional 2026: Cláusulas Obrigatórias e Registo",
    excerpt: "O que tem de constar obrigatoriamente num contrato de arrendamento habitacional em Portugal. Duração mínima, renovação automática, cláusulas essenciais, o que não pode incluir e como registar na AT.",
    publishedAt: "2026-04-08",
    readTime: "13 min",
    tags: ["Contrato Arrendamento", "Obrigações Legais", "NRAU"],
  },
  {
    slug: "caucao-arrendamento-2026",
    title: "Caução no Arrendamento 2026: Montante Máximo, Regras e Devolução",
    excerpt: "Tudo sobre a caução no arrendamento em Portugal. Montante máximo permitido (2 meses), como registar no contrato, o que pode reter ao fim do arrendamento e como devolver corretamente.",
    publishedAt: "2026-04-08",
    readTime: "11 min",
    tags: ["Caução", "Contrato Arrendamento", "Guia 2026"],
  },
  {
    slug: "irs-2026-guia-completo",
    title: "IRS 2026 para Senhorios: Guia Completo com Simulador",
    excerpt: "Guia completo IRS 2026 para senhorios: nova taxa 10% para rendas ≤€2.300, regime RSAA 0%, efeito degrau, englobamento vs taxa autónoma, deduções permitidas e simulador fiscal gratuito.",
    publishedAt: "2026-04-06",
    readTime: "12 minutos",
    tags: ["IRS 2026", "Guia Completo"],
  },
  {
    slug: "software-gestao-arrendamento-portugal-2026",
    title: "Software de Gestão de Arrendamento em Portugal: O Que Deve Ter em 2026",
    excerpt: "O que um bom software de gestão de arrendamento deve fazer no contexto português. Funcionalidades essenciais, o que evitar ao escolher e como avaliar uma solução antes de a adotar.",
    publishedAt: "2026-04-05",
    readTime: "12 min",
    tags: ["Gestão de Arrendamento", "Ferramentas", "Guia Prático"],
  },
  {
    slug: "inquilino-nao-paga-renda-o-que-fazer",
    title: "Inquilino Não Paga Renda: O Que Fazer em 2026",
    excerpt: "Guia legal passo a passo para senhorios com rendas em atraso. Da notificação obrigatória ao procedimento de despejo no BALP, passando pelos erros que podem atrasar o processo.",
    publishedAt: "2026-04-05",
    readTime: "14 min",
    tags: ["Renda em Atraso", "Guia Legal", "BALP", "Despejo"],
  },
  {
    slug: "mapa-rendas-modelo-2-arrendamento-2026",
    title: "Mapa de Rendas 2026: Como Preencher o Modelo 2 na AT",
    excerpt: "Guia completo para preencher o Mapa de Rendas (Modelo 2) na Autoridade Tributária em 2026. Prazo de entrega, campos obrigatórios, situações especiais e erros a evitar.",
    publishedAt: "2026-04-05",
    readTime: "10 min",
    tags: ["Modelo 2", "Portal Finanças", "Obrigação Legal", "IRS 2026"],
  },
  {
    slug: "registo-contrato-arrendamento-at-2026",
    title: "Registo de Contrato de Arrendamento na AT 2026: Guia Completo",
    excerpt: "Como registar o contrato de arrendamento na Autoridade Tributária em 2026. Prazos obrigatórios, documentos necessários, passo a passo no Portal das Finanças e coimas por incumprimento.",
    publishedAt: "2026-04-04",
    readTime: "11 min",
    tags: ["Obrigação Legal", "Portal Finanças", "Contrato Arrendamento", "AT"],
  },
  {
    slug: "despesas-dedutiveis-arrendamento-2026",
    title: "Despesas Dedutíveis no Arrendamento 2026: Tudo o que Pode Declarar no IRS",
    excerpt: "Guia completo das despesas dedutíveis no IRS de arrendamento 2026. Obras, condomínio, seguros, juros, IMI — saiba o que pode e não pode deduzir, com tabela resumo e exemplos com cálculos reais.",
    publishedAt: "2026-04-04",
    readTime: "13 min",
    tags: ["Despesas Dedutíveis", "IRS 2026", "Englobamento", "Guia Prático"],
  },
  {
    slug: "irs-2026-guia-completo-simulador",
    title: "IRS 2026: Guia Completo dos 3 Regimes Fiscais com Simulador",
    excerpt: "O guia definitivo para senhorios portugueses sobre os três regimes fiscais do IRS 2026. RSAA 0%, renda moderada 10%, regime geral 25%, com exemplos práticos e simulador fiscal gratuito.",
    publishedAt: "2026-04-02",
    readTime: "25 min",
    tags: ["IRS 2026", "RSAA 0%", "Taxa 10%", "Regime Geral", "Guia Completo", "Simulador"],
  },
  {
    slug: "simulador-fiscal-senhorios-2026",
    title: "Simulador Fiscal para Senhorios 2026: Calculadora de Impostos Grátis",
    excerpt: "Simulador fiscal gratuito para senhorios portugueses. Compare os 4 regimes fiscais, calcule IRS, simule poupanças e otimize impostos com ferramentas automáticas. Inclui nova taxa 10%.",
    publishedAt: "2026-03-23",
    readTime: "14 min",
    tags: ["Simulador Fiscal", "Calculadora Grátis", "4 Regimes", "Taxa 10%"],
  },
  {
    slug: "declaracao-irs-arrendamento-2026-guia-completo",
    title: "Declaração IRS Arrendamento 2026: Guia Completo Passo a Passo",
    excerpt: "Guia completo para declarar rendas no IRS 2026. Anexo F, Portal das Finanças, documentos necessários, prazos, erros comuns e estratégias de otimização fiscal para senhorios.",
    publishedAt: "2026-03-23",
    readTime: "20 min",
    tags: ["IRS 2026", "Declaração Arrendamento", "Anexo F", "Portal Finanças", "Guia Fiscal"],
  },
  {
    slug: "portugal-expat-landlord-compliance-guide-2026",
    title: "Portugal Expat Landlord Compliance Guide 2026: Complete Legal Obligations for Non-Resident Property Owners",
    excerpt: "Essential compliance guide for expat landlords in Portugal 2026. Tax obligations, rental receipts, AIMI exemptions, and legal requirements for non-resident property investors.",
    publishedAt: "2026-03-23",
    readTime: "16 min",
    tags: ["Expat Guide", "2026 Tax Rules", "Compliance", "Legal Requirements"],
  },
  {
    slug: "portugal-rental-property-tax-guide-2026",
    title: "Portugal Rental Property Tax Guide 2026: Complete Tax Overview for Landlords",
    excerpt: "Complete 2026 tax guide for Portugal rental property owners. New 10% tax rate, AIMI exemptions, rent increase rules, and compliance requirements for expat and resident landlords.",
    publishedAt: "2026-03-22",
    readTime: "18 min",
    tags: ["Complete Guide", "2026 Tax Rules", "AIMI Exemption", "Compliance"],
  },
  {
    slug: "imposto-10-porcento-rendas-portugal-2026",
    title: "Imposto 10% Rendas Portugal 2026: Guia Completo da Nova Taxa",
    excerpt: "Guia completo sobre o imposto de 10% em rendas de casa em Portugal para 2026. Saiba quando aplicar, vantagens, desvantagens e como calcular com exemplos práticos.",
    publishedAt: "2026-03-22",
    readTime: "15 min",
    tags: ["Imposto 10%", "Guia 2026", "IRS Arrendamento", "Calculadora"],
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