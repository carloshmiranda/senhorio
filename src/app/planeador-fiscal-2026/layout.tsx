import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Planeador Fiscal 2026 - Simulador IRS Arrendamento | Senhorio",
  description: "Simulador completo dos novos regimes fiscais 2026 para senhorios: 10% renda moderada, RSAA 0%, isenção AIMI. Compare e poupe milhares de euros em impostos.",
  keywords: [
    "simulador IRS arrendamento 2026",
    "imposto 10% rendas Portugal 2026",
    "renda moderada 2026 IRS",
    "RSAA 0% IRS",
    "isenção AIMI 2026",
    "calculadora impostos arrendamento",
    "planeador fiscal senhorios",
    "regime fiscal arrendamento Portugal"
  ],
  openGraph: {
    title: "Planeador Fiscal 2026 - Simulador IRS Arrendamento",
    description: "Descubra quanto pode poupar com os novos regimes fiscais para arrendamento: 10% renda moderada, RSAA 0% e isenção AIMI.",
    type: "website",
    url: "https://senhorio.vercel.app/planeador-fiscal-2026",
    images: [
      {
        url: "/og-tax-planner.jpg",
        width: 1200,
        height: 630,
        alt: "Planeador Fiscal 2026 - Simulador IRS Arrendamento",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Planeador Fiscal 2026 - Simulador IRS Arrendamento",
    description: "Descubra quanto pode poupar com os novos regimes fiscais para arrendamento: 10% renda moderada, RSAA 0% e isenção AIMI.",
    images: ["/og-tax-planner.jpg"],
  },
  alternates: {
    canonical: "https://senhorio.vercel.app/planeador-fiscal-2026",
  },
};

export default function TaxPlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}