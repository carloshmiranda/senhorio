"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";

interface PaymentIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: {
    name: string;
    price: string;
    period: string;
    description: string;
    popular?: boolean;
  };
}

export default function PaymentIntentModal({ isOpen, onClose, selectedPlan }: PaymentIntentModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setErrorMessage("");

    // Track payment intent attempt
    track("payment_intent_attempt", {
      plan: selectedPlan.name.toLowerCase(),
      plan_price: selectedPlan.price,
      has_name: !!name,
      popular: selectedPlan.popular
    });

    try {
      const response = await fetch('/api/payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          plan: selectedPlan.name.toLowerCase().replace(" ", "").replace("senhorio", ""),
          source_path: window.location.pathname,
          metadata: {
            plan_price: selectedPlan.price,
            plan_period: selectedPlan.period,
            popular: selectedPlan.popular,
            utm_source: new URLSearchParams(window.location.search).get("utm_source"),
            utm_medium: new URLSearchParams(window.location.search).get("utm_medium"),
            utm_campaign: new URLSearchParams(window.location.search).get("utm_campaign"),
          }
        }),
      });

      const result = await response.json();

      if (result.ok) {
        setState("success");

        // Track successful payment intent capture
        track("payment_intent_captured", {
          plan: selectedPlan.name.toLowerCase(),
          plan_price: selectedPlan.price,
          existing_user: result.data.existing
        });
      } else {
        setState("error");
        setErrorMessage(result.error || "Erro ao registar interesse");
      }
    } catch (error) {
      setState("error");
      setErrorMessage("Erro de ligação. Tente novamente.");
      console.error('Error capturing payment intent:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {state === "success" ? "Interesse registado!" : `Interesse no ${selectedPlan.name}`}
            </h2>
            {state !== "success" && (
              <p className="text-sm text-gray-600 mt-1">
                {selectedPlan.price} {selectedPlan.period} • {selectedPlan.description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
            aria-label="Fechar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {state === "success" ? (
          /* Success State */
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Obrigado pelo interesse!
            </h3>
            <p className="text-gray-600 mb-6">
              Registámos o seu interesse no plano {selectedPlan.name}. Entraremos em contacto assim que o produto estiver disponível.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-brand-600 text-white py-3 rounded-lg font-medium hover:bg-brand-700 transition"
            >
              Continuar
            </button>
          </div>
        ) : (
          /* Form State */
          <>
            <div className="mb-6">
              <div className="bg-brand-50 border border-brand-200 rounded-lg p-4">
                <p className="text-brand-800 text-sm">
                  <strong>🚀 Lançamento em breve!</strong>
                  <br />
                  O Senhorio está quase pronto. Registe o seu interesse e será um dos primeiros a ter acesso.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="o-seu-email@exemplo.com"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome (opcional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="O seu nome"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                />
              </div>

              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {errorMessage}
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={state === "loading" || !email}
                  className="flex-1 px-6 py-3 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {state === "loading" ? "A registar..." : "Registar Interesse"}
                </button>
              </div>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Não enviamos spam. Apenas notificações importantes sobre o lançamento.
            </p>
          </>
        )}
      </div>
    </div>
  );
}