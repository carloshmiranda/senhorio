import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulador IRS Arrendamento 2026 | Taxa 10% & Regimes Fiscais | Senhorio",
  description: "Simulador fiscal gratuito para arrendamento em Portugal. Compare os 4 regimes (taxa 10%, 25%, englobamento, RSAA). Calcule o seu IRS 2026 com as novas regras fiscais.",
  keywords: [
    "simulador IRS arrendamento 2026",
    "calculadora fiscal arrendamento",
    "imposto 10% rendas Portugal",
    "regime simplificado 10%",
    "IRS arrendamento 2026",
    "calculadora impostos arrendamento",
    "simulador fiscal Portugal",
    "taxa fixa 10% arrendamento",
    "regime geral 25% arrendamento",
    "englobamento IRS arrendamento",
    "RSAA arrendamento",
    "calculadora IRS senhorios",
    "simulador impostos rendas",
    "Portugal landlord tax calculator",
    "rental income tax calculator Portugal"
  ],
  openGraph: {
    title: "Simulador IRS Arrendamento 2026 - Compare 4 Regimes Fiscais",
    description: "Calculadora gratuita para IRS de arrendamento. Compare taxa 10%, 25%, englobamento e RSAA. Descubra qual regime fiscal poupa mais dinheiro em 2026.",
    type: "website",
    url: "/calculadora",
    siteName: "Senhorio",
    images: [
      {
        url: "/og/tax-calculator.png",
        width: 1200,
        height: 630,
        alt: "Simulador IRS Arrendamento 2026 - Calculadora Fiscal - Senhorio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulador IRS Arrendamento 2026 - Compare Regimes Fiscais",
    description: "Calculadora gratuita para IRS de arrendamento. Compare taxa 10%, 25%, englobamento e RSAA instantaneamente.",
    images: ["/og/tax-calculator.png"]
  },
  alternates: {
    canonical: "/calculadora",
    languages: {
      'pt': "/calculadora",
      'en': "/calculadora"
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function CalculadoraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}