import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerador de Recibos de Renda Grátis | Conforme à Lei Portuguesa | Senhorio",
  description: "Crie recibos de renda eletrónicos gratuitos e conformes com a legislação portuguesa. Ferramenta simples, rápida e sem necessidade de registo. Inclui todos os campos obrigatórios.",
  keywords: [
    "recibos de renda eletrónicos",
    "gerador recibo renda",
    "recibo arrendamento grátis",
    "recibo renda Portugal",
    "criar recibo eletrónico",
    "recibo renda online",
    "gerador recibo senhorio",
    "recibo arrendamento Portugal",
    "recibo renda conforme lei",
    "receipt generator Portugal",
    "rental receipt generator",
    "Portugal landlord receipt"
  ],
  openGraph: {
    title: "Gerador de Recibos de Renda Grátis - Conforme à Lei Portuguesa",
    description: "Crie recibos de renda eletrónicos gratuitos e conformes com a legislação portuguesa. Ferramenta simples, rápida e sem necessidade de registo.",
    type: "website",
    url: "/recibos",
    siteName: "Senhorio",
    images: [
      {
        url: "/og/receipt-generator.png",
        width: 1200,
        height: 630,
        alt: "Gerador de Recibos de Renda Grátis - Conforme à Lei Portuguesa - Senhorio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Gerador de Recibos de Renda Grátis - Conforme à Lei Portuguesa",
    description: "Crie recibos de renda eletrónicos gratuitos e conformes com a legislação portuguesa. Ferramenta simples e rápida.",
    images: ["/og/receipt-generator.png"]
  },
  alternates: {
    canonical: "/recibos",
    languages: {
      'pt': "/recibos",
      'en': "/recibos"
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

export default function RecibosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}