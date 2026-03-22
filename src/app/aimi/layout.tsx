import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Isenção AIMI 2026 | Simulador Gratuito para Senhorios | Senhorio",
  description: "Calculadora gratuita para verificar se qualifica para a isenção AIMI 2026. Teste se as suas rendas estão abaixo de €2.300/mês e descubra a poupança anual potencial.",
  keywords: [
    "calculadora AIMI",
    "isenção AIMI 2026",
    "simulador AIMI Portugal",
    "AIMI arrendamento habitacional",
    "calculadora isenção AIMI",
    "imposto municipal imóveis",
    "senhorio Portugal",
    "habitação acessível AIMI",
    "calculadora impostos arrendamento",
    "AIMI exemption calculator",
    "Portugal landlord tax calculator"
  ],
  openGraph: {
    title: "Calculadora de Isenção AIMI 2026 - Simulador Gratuito",
    description: "Verifique gratuitamente se qualifica para a isenção AIMI 2026. Calcule a sua poupança potencial com rendas até €2.300/mês.",
    type: "website",
    url: "/aimi",
    siteName: "Senhorio",
    images: [
      {
        url: "/og/aimi-calculator.png",
        width: 1200,
        height: 630,
        alt: "Calculadora de Isenção AIMI 2026 - Senhorio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Isenção AIMI 2026 - Simulador Gratuito",
    description: "Verifique gratuitamente se qualifica para a isenção AIMI 2026. Calcule a sua poupança potencial.",
    images: ["/og/aimi-calculator.png"]
  },
  alternates: {
    canonical: "/aimi",
    languages: {
      'pt': "/aimi",
      'en': "/aimi"
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

export default function AIMILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}