import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerador de Recibos de Renda Grátis | Senhorio",
  description: "Crie recibos de renda eletrónicos gratuitos e conformes com a legislação portuguesa. Simples, rápido e sem necessidade de registo.",
  keywords: [
    "recibos de renda eletrónicos",
    "gerador recibo renda",
    "recibo arrendamento grátis",
    "recibo renda Portugal",
    "criar recibo eletrónico",
    "recibo renda online",
    "gerador recibo senhorio",
    "recibo arrendamento Portugal",
  ],
  openGraph: {
    title: "Gerador de Recibos de Renda Grátis",
    description: "Crie recibos de renda eletrónicos gratuitos e conformes com a legislação portuguesa.",
    type: "website",
  },
  alternates: {
    canonical: "https://senhorio.vercel.app/recibos",
  },
};

export default function RecibosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}