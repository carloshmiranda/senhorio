import { generateWebApplicationLD, generateFAQLD } from "@/lib/structured-data";

interface StructuredDataProps {
  webAppData: any;
  faqData: Array<{ question: string; answer: string }>;
}

export default function StructuredData({ webAppData, faqData }: StructuredDataProps) {
  const webAppLD = generateWebApplicationLD(webAppData);
  const faqLD = generateFAQLD(faqData);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webAppLD)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqLD)
        }}
      />
    </>
  );
}