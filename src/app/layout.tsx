import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import IrsAnnouncementBanner from "@/components/IrsAnnouncementBanner";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://senhorio.vercel.app"),
  title: "Senhorio",
  description: "Plataforma completa de gestão de arrendamento para senhorios portugueses — acompanhe rendas, emita recibos, calcule impostos, cumpra prazos.",
  openGraph: {
    title: "Senhorio",
    description: "Plataforma completa de gestão de arrendamento para senhorios portugueses — acompanhe rendas, emita recibos, calcule impostos, cumpra prazos.",
    type: "website",
    url: "https://senhorio.vercel.app",
    siteName: "Senhorio",
    locale: "pt_PT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Senhorio",
    description: "Plataforma completa de gestão de arrendamento para senhorios portugueses — acompanhe rendas, emita recibos, calcule impostos, cumpra prazos.",
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
      <body>
        <IrsAnnouncementBanner />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
