"use client";

import { useState } from "react";

const STORAGE_KEY = "senhorio_waitlist_submissions";

interface EmailCaptureFormProps {
  ctaHeading: string;
  ctaSubtext?: string;
  source?: string;
}

export default function EmailCaptureForm({
  ctaHeading,
  ctaSubtext,
  source = "tool_page",
}: EmailCaptureFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Por favor, introduza o seu nome.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Por favor, introduza um email válido.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), source }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        // Save to localStorage
        if (typeof window !== "undefined") {
          const existing: { name: string; email: string; source: string; submittedAt: string }[] =
            JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
          existing.push({ name: name.trim(), email: email.trim(), source, submittedAt: new Date().toISOString() });
          localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
        }
        setSubmitted(true);
      } else {
        setError(data.error || "Ocorreu um erro. Por favor, tente novamente.");
      }
    } catch {
      setError("Ocorreu um erro de ligação. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-green-50 border-2 border-green-300 rounded-xl p-6 text-center"
      >
        <div className="text-4xl mb-3" aria-hidden="true">✅</div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Inscrição confirmada!</h3>
        <p className="text-green-700">
          Obrigado, <strong>{name}</strong>! Entraremos em contacto em breve para{" "}
          <strong>{email}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-brand-50 to-green-50 rounded-xl border-2 border-brand-200 p-6">
      <div className="text-center mb-6">
        <div className="text-3xl mb-3" aria-hidden="true">📬</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{ctaHeading}</h3>
        {ctaSubtext && <p className="text-gray-600 text-sm">{ctaSubtext}</p>}
      </div>

      {/* JS-enabled form */}
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Formulário de inscrição na lista de espera"
        className="max-w-md mx-auto space-y-4"
      >
        <div>
          <label htmlFor="ecf-name" className="block text-sm font-medium text-gray-700 mb-1">
            Nome <span aria-hidden="true">*</span>
          </label>
          <input
            id="ecf-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="O seu nome"
            required
            autoComplete="name"
            aria-required="true"
            aria-describedby={error && !email.includes("@") ? "ecf-error" : undefined}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="ecf-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="ecf-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="o-seu-email@exemplo.com"
            required
            autoComplete="email"
            aria-required="true"
            aria-describedby={error ? "ecf-error" : undefined}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          />
        </div>

        {error && (
          <p
            id="ecf-error"
            role="alert"
            className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? "A enviar…" : "Inscrever-me"}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Sem spam. Pode cancelar a qualquer momento.
        </p>
      </form>

      {/* Progressive enhancement: noscript fallback */}
      <noscript>
        <form
          method="POST"
          action="/api/waitlist"
          className="max-w-md mx-auto space-y-4 mt-4"
          aria-label="Formulário de inscrição (sem JavaScript)"
        >
          <input type="hidden" name="source" value={source} />
          <div>
            <label htmlFor="ecf-name-ns" className="block text-sm font-medium text-gray-700 mb-1">
              Nome *
            </label>
            <input
              id="ecf-name-ns"
              type="text"
              name="name"
              placeholder="O seu nome"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="ecf-email-ns" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              id="ecf-email-ns"
              type="email"
              name="email"
              placeholder="o-seu-email@exemplo.com"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition"
          >
            Inscrever-me
          </button>
        </form>
      </noscript>
    </div>
  );
}
