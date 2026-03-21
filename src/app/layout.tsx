import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Senhorio",
  description: "The all-in-one rental management platform for Portuguese landlords — track rents, issue receipts, calculate taxes, stay compliant.",
  openGraph: {
    title: "Senhorio",
    description: "The all-in-one rental management platform for Portuguese landlords — track rents, issue receipts, calculate taxes, stay compliant.",
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
      description: "The all-in-one rental management platform for Portuguese landlords — track rents, issue receipts, calculate taxes, stay compliant.",
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
