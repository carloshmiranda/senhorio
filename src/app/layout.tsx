import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Senhorio",
  description: "Plataforma completa de gestão de arrendamento para senhorios portugueses — acompanhe rendas, emita recibos, calcule impostos, cumpra prazos.",
  openGraph: {
    title: "Senhorio",
    description: "Plataforma completa de gestão de arrendamento para senhorios portugueses — acompanhe rendas, emita recibos, calcule impostos, cumpra prazos.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Senhorio",
      url: "https://senhorio.vercel.app",
      description: "Plataforma completa de gestão de arrendamento para senhorios portugueses — acompanhe rendas, emita recibos, calcule impostos, cumpra prazos.",
    },
    {
      "@type": "WebSite",
      name: "Senhorio",
      url: "https://senhorio.vercel.app",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
