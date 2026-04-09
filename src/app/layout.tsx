import type { Metadata } from "next";
import { IBM_Plex_Sans, Source_Sans_3 } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import IrsAnnouncementBanner from "@/components/IrsAnnouncementBanner";
import PWA from "@/components/PWA";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://senhorio.vercel.app"),
  title: "Senhorio",
  description: "Plataforma completa de gestão de arrendamento para senhorios portugueses — acompanhe rendas, emita recibos, calcule impostos, cumpra prazos.",
  applicationName: "Senhorio",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Senhorio",
  },
  formatDetection: {
    telephone: false,
  },
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
  icons: {
    icon: '/icon-192.png',
    shortcut: '/icon-192.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0F766E",
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
    <html lang="pt" className={`${ibmPlexSans.variable} ${sourceSans3.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <IrsAnnouncementBanner />
        {children}
        <PWA />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
