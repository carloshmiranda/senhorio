import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora Atualização Rendas 2026 | Coeficiente INE 2.24% | Senhorio",
  description: "Calculadora gratuita para atualização de rendas 2026. Use o coeficiente oficial INE de 2.24% para calcular aumentos legais conforme o NRAU. Simule já o seu aumento.",
  keywords: [
    "atualização rendas 2026",
    "calculadora rendas 2026",
    "coeficiente INE 2.24%",
    "aumento renda 2026",
    "calculadora aumento renda",
    "NRAU atualização rendas",
    "coeficiente atualização rendas INE",
    "simulador aumento renda Portugal",
    "calculadora NRAU",
    "atualização anual rendas",
    "aumento legal renda 2026",
    "coeficiente inflação rendas",
    "rent increase calculator Portugal",
    "Portugal rent adjustment calculator"
  ],
  openGraph: {
    title: "Calculadora Atualização Rendas 2026 - Coeficiente INE 2.24%",
    description: "Calculadora oficial para atualização de rendas 2026. Use o coeficiente INE de 2.24% para calcular aumentos legais instantaneamente.",
    type: "website",
    url: "/calculadora-rendas",
    siteName: "Senhorio",
    images: [
      {
        url: "/og/rent-calculator.png",
        width: 1200,
        height: 630,
        alt: "Calculadora Atualização Rendas 2026 - Coeficiente INE - Senhorio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora Atualização Rendas 2026 - Coeficiente INE 2.24%",
    description: "Calcule aumentos legais de renda com o coeficiente oficial INE de 2.24%. Simulação gratuita e instantânea.",
    images: ["/og/rent-calculator.png"]
  },
  alternates: {
    canonical: "/calculadora-rendas",
    languages: {
      'pt': "/calculadora-rendas",
      'en': "/calculadora-rendas"
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

export default function CalculadoraRendasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}