"use client";

import { useState } from "react";

interface SocialShareButtonsProps {
  page: "simulador-irs" | "calculadora";
  title: string;
  description: string;
}

export default function SocialShareButtons({ page, title, description }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://senhorio.pt";

  const getShareUrl = (source: string, content: string) => {
    const url = `${baseUrl}/${page}`;
    const params = new URLSearchParams({
      utm_source: source,
      utm_medium: "social",
      utm_campaign: "irs_2026_awareness",
      utm_content: content
    });
    return `${url}?${params.toString()}`;
  };

  const shareLinks = [
    {
      name: "Reddit r/portugal",
      icon: "🔗",
      color: "bg-orange-500 hover:bg-orange-600",
      url: getShareUrl("reddit", "r_portugal"),
      action: "copy"
    },
    {
      name: "Reddit r/literaciafinanceira",
      icon: "🔗",
      color: "bg-orange-500 hover:bg-orange-600",
      url: getShareUrl("reddit", "r_literaciafinanceira"),
      action: "copy"
    },
    {
      name: "Reddit r/financaspessoais",
      icon: "🔗",
      color: "bg-orange-500 hover:bg-orange-600",
      url: getShareUrl("reddit", "r_financaspessoais"),
      action: "copy"
    },
    {
      name: "Facebook Senhorios",
      icon: "📘",
      color: "bg-blue-500 hover:bg-blue-600",
      url: getShareUrl("facebook", "senhorios_portugal"),
      action: "copy"
    },
    {
      name: "Facebook APPROP",
      icon: "📘",
      color: "bg-blue-500 hover:bg-blue-600",
      url: getShareUrl("facebook", "approp"),
      action: "copy"
    },
    {
      name: "Facebook AL Portugal",
      icon: "📘",
      color: "bg-blue-500 hover:bg-blue-600",
      url: getShareUrl("facebook", "alojamento_local"),
      action: "copy"
    }
  ];

  const copyToClipboard = async (url: string, name: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(name);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          📢 Partilhar nas Redes Sociais
        </h3>
        <p className="text-sm text-gray-600">
          Ajude outros senhorios a descobrir as poupanças do IRS 2026
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {shareLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => copyToClipboard(link.url, link.name)}
            className={`${link.color} text-white px-4 py-3 rounded-lg text-sm font-medium transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>{link.icon}</span>
              <span className="truncate">
                {copied === link.name ? "✅ Copiado!" : link.name}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p className="text-xs text-yellow-800">
          💡 <strong>Dica:</strong> Clique para copiar o link com tracking UTM.
          Cole numa publicação nas redes sociais com o texto do{" "}
          <a
            href="https://github.com/carloshmiranda/senhorio/blob/main/docs/social-media-kit.md"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-yellow-900"
          >
            kit de redes sociais
          </a>.
        </p>
      </div>

      {/* Quick template preview */}
      <details className="mt-4">
        <summary className="text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900">
          Ver exemplo de post →
        </summary>
        <div className="mt-3 bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 mb-3">
            🏠 <strong>NOVA: Taxa IRS 10% para rendas até €2.300/mês (2026)</strong>
          </p>
          <p className="text-sm text-gray-600 mb-3">
            A partir de 2026 há uma nova taxa reduzida de 10% para rendas moderadas, em vez dos habituais 25%.
            Poupança típica: €1.000-€4.000/ano dependendo da renda.
          </p>
          <p className="text-sm text-gray-600 mb-3">
            Prazo IRS 2026: <strong>30 de junho</strong>. Vale a pena simular agora.
          </p>
          <p className="text-sm text-brand-600 font-medium">
            [Cole aqui o link copiado]
          </p>
        </div>
      </details>
    </div>
  );
}