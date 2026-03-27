import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulador IRS Arrendamento 2026 | Nova Taxa 10% Portugal | Senhorio",
  description: "Simule o seu IRS de arrendamento 2026 com as novas taxas fiscais. Compare regime 10% vs 25% vs RSAA. Calcule poupanças com as mudanças fiscais de 2026 para senhorios portugueses.",
  keywords: [
    "simulador IRS arrendamento 2026",
    "taxa 10% IRS Portugal 2026",
    "imposto arrendamento 10% Portugal",
    "regime simplificado 10% arrendamento",
    "calculadora IRS 2026 senhorios",
    "nova taxa IRS arrendamento Portugal",
    "simulador fiscal arrendamento 2026",
    "poupança imposto rendas 2026",
    "regime RSAA 0% IRS",
    "não residentes 28% IRS Portugal",
    "Portugal rental tax simulator 2026",
    "10% tax rate Portugal landlords"
  ],
  openGraph: {
    title: "Simulador IRS Arrendamento 2026 - Nova Taxa 10% Portugal",
    description: "Descubra quanto pode poupar com as novas taxas de IRS 2026. Simule regime 10% vs 25% vs RSAA para rendas de arrendamento em Portugal.",
    type: "website",
    url: "/simulador-irs",
    siteName: "Senhorio",
    images: [
      {
        url: "/og/irs-simulator-2026.png",
        width: 1200,
        height: 630,
        alt: "Simulador IRS Arrendamento 2026 - Nova Taxa 10% Portugal - Senhorio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulador IRS Arrendamento 2026 - Nova Taxa 10% Portugal",
    description: "Calcule quanto pode poupar com as novas taxas de IRS 2026. Regime 10% para rendas até €2.300/mês.",
    images: ["/og/irs-simulator-2026.png"]
  },
  alternates: {
    canonical: "/simulador-irs",
    languages: {
      'pt': "/simulador-irs"
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

export default function SimuladorIRSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}