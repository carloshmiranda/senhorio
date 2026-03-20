import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Senhorio — Gestão de Arrendamento para Senhorios Portugueses",
  description: "Plataforma completa para senhorios portugueses: calculadora de regimes fiscais de IRS 2026, gestão automática de rendas, recibos eletrónicos e exportação para declaração de IRS. Poupe tempo e evite multas.",
  keywords: "senhorio, arrendamento, IRS, rendas, portugal, recibos, fiscalidade, gestão propriedades",
  authors: [{ name: "Senhorio" }],
  creator: "Senhorio",
  publisher: "Senhorio",
  robots: "index, follow",
  alternates: {
    canonical: "https://senhorio.pt",
  },
  openGraph: {
    title: "Senhorio — Gestão de Arrendamento para Senhorios Portugueses",
    description: "Simplifique a gestão das suas rendas com a nossa calculadora de regimes fiscais 2026 e plataforma completa de arrendamento.",
    type: "website",
    locale: "pt_PT",
    siteName: "Senhorio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Senhorio - Gestão de Arrendamento",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Senhorio — Gestão de Arrendamento para Senhorios Portugueses",
    description: "Calculadora gratuita de regimes fiscais IRS 2026 + gestão completa de rendas",
    images: ["/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Senhorio",
      url: "https://senhorio.pt",
      description: "Plataforma de gestão de arrendamento para senhorios portugueses",
      address: {
        "@type": "PostalAddress",
        addressCountry: "PT",
      },
      areaServed: "PT",
      knowsLanguage: ["pt-PT"],
    },
    {
      "@type": "WebSite",
      name: "Senhorio",
      url: "https://senhorio.pt",
      description: "Gestão completa de arrendamento e cálculo de regimes fiscais para senhorios",
      inLanguage: "pt-PT",
      publisher: {
        "@type": "Organization",
        name: "Senhorio",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "Calculadora de Regimes Fiscais IRS 2026",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      description: "Compare todos os regimes fiscais de IRS para arrendamento: Standard (25%), Taxa Reduzida (10%), RSAA (0%) e Não Residentes (28%)",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
      featureList: [
        "Comparação de 4 regimes fiscais",
        "Cálculo automático de impostos",
        "Suporte para todos os concelhos portugueses",
        "Interface em português e inglês"
      ],
      audience: {
        "@type": "Audience",
        name: "Senhorios portugueses",
        geographicArea: {
          "@type": "Country",
          name: "Portugal",
        },
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
