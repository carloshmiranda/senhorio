"use client";

import { useState } from "react";

interface FiscalAlertsCTAProps {
  source?: string;
  className?: string;
}

export default function FiscalAlertsCTA({ source = "unknown", className = "" }: FiscalAlertsCTAProps) {
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || isSubmitting || isSubmitted) {
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, insira um email válido");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch('/api/fiscal-alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source,
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setIsSubmitted(true);
      } else {
        setError(data.error || "Erro ao subscrever alertas. Tente novamente.");
      }
    } catch (error) {
      console.error('Error subscribing to fiscal alerts:', error);
      setError("Erro ao subscrever alertas. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-4 text-center ${className}`}>
        <div className="text-green-600 text-xl mb-2">✅</div>
        <h3 className="text-lg font-semibold text-green-800 mb-1">
          Subscrito com sucesso!
        </h3>
        <p className="text-green-700 text-sm">
          Irá receber alertas fiscais importantes para <strong>{email}</strong>.
          Verifique a sua caixa de entrada.
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-lg p-6 text-center ${className}`}>
      <div className="text-blue-600 text-2xl mb-3">📢</div>
      <h3 className="text-lg font-semibold text-blue-900 mb-2">
        Receba alertas fiscais
      </h3>
      <p className="text-blue-700 mb-4 text-sm">
        Seja notificado sobre mudanças fiscais importantes que afetam senhorios em Portugal.
        Mantenha-se sempre atualizado!
      </p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="o-seu-email@exemplo.com"
            required
            disabled={isSubmitting}
            className="flex-1 px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Email para alertas fiscais"
          />
          <button
            type="submit"
            disabled={isSubmitting || !email}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Subscrever alertas fiscais"
          >
            {isSubmitting ? "A enviar..." : "Subscrever"}
          </button>
        </div>

        {error && (
          <div className="mt-3 text-red-600 text-sm" role="alert">
            {error}
          </div>
        )}
      </form>

      <p className="text-xs text-blue-600 mt-3">
        💡 Fique a par de mudanças na legislação fiscal, novos benefícios e prazos importantes
      </p>
    </div>
  );
}