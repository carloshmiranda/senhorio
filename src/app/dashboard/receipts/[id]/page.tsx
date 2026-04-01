"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ReceiptData {
  id: string;
  receipt_number: string;
  amount: number;
  period_month: number;
  period_year: number;
  issue_date: string;
  created_at: string;
  tenant_name: string;
  tenant_nif: string | null;
  tenant_email: string | null;
  tenant_phone: string | null;
  property_address: string;
  property_city: string | null;
  property_municipality: string | null;
  landlord_name: string;
  landlord_email: string;
}

const monthNames = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export default function ReceiptViewPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [receiptId, setReceiptId] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadParams() {
      const resolvedParams = await params;
      setReceiptId(resolvedParams.id);
    }
    loadParams();
  }, [params]);

  useEffect(() => {
    if (receiptId) {
      loadReceipt();
    }
  }, [receiptId]);

  async function loadReceipt() {
    try {
      const res = await fetch(`/api/receipts/${receiptId}`);
      const data = await res.json();

      if (data.ok) {
        setReceipt(data.data);
      } else {
        setError(data.error || "Recibo não encontrado");
      }
    } catch (err) {
      console.error("Error loading receipt:", err);
      setError("Erro ao carregar recibo");
    } finally {
      setLoading(false);
    }
  }

  function printReceipt() {
    window.print();
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-64"></div>
        <div className="bg-white rounded-xl p-8 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-6 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !receipt) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recibo não encontrado</h2>
        <p className="text-gray-600 mb-6">{error || "O recibo que procura não existe ou foi removido."}</p>
        <button
          onClick={() => router.push("/dashboard/receipts")}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Voltar aos Recibos
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header - hidden when printing */}
      <div className="mb-6 print:hidden">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push("/dashboard/receipts")}
            className="flex items-center text-gray-600 hover:text-gray-900 transition"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar aos Recibos
          </button>
          <button
            onClick={printReceipt}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimir / Guardar PDF
          </button>
        </div>
      </div>

      {/* Receipt Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 print:shadow-none print:border-black">
        <div className="p-8 print:p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">RECIBO DE RENDA</h1>
            <p className="text-lg text-gray-600">Número: {receipt.receipt_number}</p>
          </div>

          <div className="space-y-6">
            {/* Landlord Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                SENHORIO
              </h2>
              <div className="space-y-1">
                <p><strong>Nome:</strong> {receipt.landlord_name}</p>
                <p><strong>Email:</strong> {receipt.landlord_email}</p>
              </div>
            </div>

            {/* Tenant Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                INQUILINO
              </h2>
              <div className="space-y-1">
                <p><strong>Nome:</strong> {receipt.tenant_name}</p>
                {receipt.tenant_nif && <p><strong>NIF:</strong> {receipt.tenant_nif}</p>}
                {receipt.tenant_email && <p><strong>Email:</strong> {receipt.tenant_email}</p>}
                {receipt.tenant_phone && <p><strong>Telefone:</strong> {receipt.tenant_phone}</p>}
              </div>
            </div>

            {/* Property Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                IMÓVEL ARRENDADO
              </h2>
              <div className="space-y-1">
                <p><strong>Morada:</strong> {receipt.property_address}</p>
                {receipt.property_city && (
                  <p><strong>Localidade:</strong> {receipt.property_city}
                    {receipt.property_municipality && receipt.property_municipality !== receipt.property_city &&
                      `, ${receipt.property_municipality}`}
                  </p>
                )}
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                PAGAMENTO
              </h2>
              <div className="space-y-1">
                <p><strong>Período:</strong> {monthNames[receipt.period_month - 1]} de {receipt.period_year}</p>
                <p><strong>Valor:</strong> €{receipt.amount.toFixed(2)}</p>
                <p><strong>Modalidade:</strong> Mensal</p>
                <p><strong>Data de Emissão:</strong> {new Date(receipt.issue_date).toLocaleDateString('pt-PT')}</p>
              </div>
            </div>

            {/* Declaration */}
            <div className="bg-gray-50 p-6 rounded-lg print:bg-gray-100">
              <p className="text-sm leading-relaxed">
                Declaro que recebi do inquilino acima identificado a quantia de <strong>€{receipt.amount.toFixed(2)}</strong>
                {" "}({receipt.amount.toFixed(2).split('.').map((part, index) =>
                  index === 0 ? `${part} euros` : `${part} cêntimos`
                ).join(' e ')})
                {" "}referente ao pagamento da renda do imóvel supra identificado, respeitante ao período de {monthNames[receipt.period_month - 1].toLowerCase()} de {receipt.period_year}.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-12 print:mt-8">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-4">Data:</p>
                  <p>{new Date(receipt.issue_date).toLocaleDateString('pt-PT')}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-4">Assinatura do Senhorio:</p>
                  <div className="border-b border-gray-400 w-48 h-8"></div>
                  <p className="text-sm mt-2">{receipt.landlord_name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Note */}
        <div className="mx-8 mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 print:hidden">
          <p><strong>Nota Legal:</strong> Este recibo foi gerado automaticamente pelo sistema Senhorio.
          Para efeitos fiscais oficiais, deve ser registado no Portal das Finanças conforme a legislação em vigor.</p>
        </div>
      </div>

      {/* Footer with receipt info - hidden when printing */}
      <div className="mt-6 text-center text-sm text-gray-500 print:hidden">
        <p>Recibo gerado em {new Date(receipt.created_at).toLocaleString('pt-PT')}</p>
        <p>Sistema de gestão de arrendamento Senhorio</p>
      </div>
    </div>
  );
}