import { MetadataRoute } from "next";

// Dynamic sitemap — includes all calculator tools and blog pages
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://senhorio.vercel.app";
  const now = new Date();

  return [
    // Homepage
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },

    // Calculator tools
    {
      url: `${baseUrl}/calculadora`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculadora-rendas`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/simulador-irs`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/aimi`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/recibos`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // Blog section
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // Blog posts - New practical guides
    {
      url: `${baseUrl}/blog/despesas-dedutiveis-arrendamento-2026`,
      lastModified: new Date("2026-04-04"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/registo-contrato-arrendamento-at-2026`,
      lastModified: new Date("2026-04-04"),
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // Blog posts - IRS & Tax content
    {
      url: `${baseUrl}/blog/irs-2026-guia-completo-simulador`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/irs-senhorios-2026-guia-definitivo`,
      lastModified: new Date("2026-04-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/irs-arrendamento-2026-nova-taxa-10-porcento`,
      lastModified: new Date("2026-03-21"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/declaracao-irs-arrendamento-2026-guia-completo`,
      lastModified: new Date("2026-03-20"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/imposto-10-porcento-rendas-portugal-2026`,
      lastModified: new Date("2026-03-19"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/simulador-fiscal-senhorios-2026`,
      lastModified: new Date("2026-03-18"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/isencao-aimi-2026-qualificar-nova-isencao`,
      lastModified: new Date("2026-03-17"),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // Calculation guides
    {
      url: `${baseUrl}/blog/como-calcular-atualizacoes-renda-2026`,
      lastModified: new Date("2026-03-16"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/recibos-renda-eletronicos-guia-2026`,
      lastModified: new Date("2026-03-15"),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // English content for expats
    {
      url: `${baseUrl}/blog/portugal-landlord-tax-calculator-2026`,
      lastModified: new Date("2026-03-14"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/portugal-expat-landlord-compliance-guide-2026`,
      lastModified: new Date("2026-03-13"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/portugal-rental-property-tax-guide-2026`,
      lastModified: new Date("2026-03-12"),
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // Legal pages
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
