"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import StructuredData from "@/components/StructuredData";
import { CALCULATOR_STRUCTURED_DATA } from "@/lib/structured-data";

interface ReceiptData {
  // Landlord details
  landlordName: string;
  landlordTaxId: string;
  landlordAddress: string;
  landlordCity: string;
  landlordPostalCode: string;

  // Tenant details
  tenantName: string;
  tenantTaxId: string;
  tenantAddress: string;
  tenantCity: string;
  tenantPostalCode: string;

  // Property details
  propertyAddress: string;
  propertyCity: string;
  propertyPostalCode: string;

  // Rent details
  rentAmount: number;
  rentPeriod: string;
  rentMonth: number;
  rentYear: number;

  // Receipt details
  receiptNumber: string;
  issueDate: string;
}

export default function ReceiptGeneratorPage() {
  const [receiptData, setReceiptData] = useState<ReceiptData>({
    landlordName: "",
    landlordTaxId: "",
    landlordAddress: "",
    landlordCity: "",
    landlordPostalCode: "",

    tenantName: "",
    tenantTaxId: "",
    tenantAddress: "",
    tenantCity: "",
    tenantPostalCode: "",

    propertyAddress: "",
    propertyCity: "",
    propertyPostalCode: "",

    rentAmount: 0,
    rentPeriod: "monthly",
    rentMonth: new Date().getMonth() + 1,
    rentYear: new Date().getFullYear(),

    receiptNumber: "",
    issueDate: new Date().toISOString().split('T')[0],
  });

  const [showReceipt, setShowReceipt] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  // Generate receipt number if not provided
  const finalReceiptNumber = useMemo(() => {
    if (receiptData.receiptNumber) return receiptData.receiptNumber;
    const date = new Date(receiptData.issueDate);
    return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}-001`;
  }, [receiptData.receiptNumber, receiptData.issueDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Track calculator usage
    track("receipt_generated", {
      rent_amount: receiptData.rentAmount,
      rent_period: receiptData.rentPeriod,
      month: receiptData.rentMonth,
      year: receiptData.rentYear,
    });

    setShowReceipt(true);
    setShowEmailCapture(true);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingEmail(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'receipt_generator',
          metadata: {
            rent_amount: receiptData.rentAmount,
            rent_period: receiptData.rentPeriod,
            month: receiptData.rentMonth,
            year: receiptData.rentYear,
            receipt_number: finalReceiptNumber,
            landlord_nif: receiptData.landlordTaxId,
            tenant_nif: receiptData.tenantTaxId,
          }
        }),
      });

      if (response.ok) {
        track("waitlist_signup_receipt_generator", {
          email,
          rent_amount: receiptData.rentAmount
        });
        setEmailSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting email:', error);
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const printReceipt = () => {
    track("receipt_print", {
      rent_amount: receiptData.rentAmount,
      receipt_number: finalReceiptNumber
    });
    window.print();
  };

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData
        webAppData={CALCULATOR_STRUCTURED_DATA.receiptGenerator.webApp}
        faqData={CALCULATOR_STRUCTURED_DATA.receiptGenerator.faqs}
      />
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition">
            <span className="text-xl font-bold">Senhorio</span>
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Gerador de Recibos de Renda
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Crie recibos de renda eletrónicos gratuitos e conformes com a legislação portuguesa.
            Simples, rápido e sem necessidade de registo.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Landlord Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-emerald-100 text-emerald-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">1</span>
                  Dados do Senhorio
                </h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={receiptData.landlordName}
                        onChange={(e) => setReceiptData(prev => ({ ...prev, landlordName: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="João Silva"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        NIF *
                      </label>
                      <input
                        type="text"
                        required
                        value={receiptData.landlordTaxId}
                        onChange={(e) => setReceiptData(prev => ({ ...prev, landlordTaxId: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="123456789"
                        pattern="[0-9]{9}"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Morada *
                    </label>
                    <input
                      type="text"
                      required
                      value={receiptData.landlordAddress}
                      onChange={(e) => setReceiptData(prev => ({ ...prev, landlordAddress: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Rua das Flores, 123, 2º Dto"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Localidade *
                      </label>
                      <input
                        type="text"
                        required
                        value={receiptData.landlordCity}
                        onChange={(e) => setReceiptData(prev => ({ ...prev, landlordCity: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Lisboa"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Código Postal *
                      </label>
                      <input
                        type="text"
                        required
                        value={receiptData.landlordPostalCode}
                        onChange={(e) => setReceiptData(prev => ({ ...prev, landlordPostalCode: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="1000-001"
                        pattern="[0-9]{4}-[0-9]{3}"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tenant Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-emerald-100 text-emerald-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">2</span>
                  Dados do Inquilino
                </h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={receiptData.tenantName}
                        onChange={(e) => setReceiptData(prev => ({ ...prev, tenantName: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Maria Santos"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        NIF *
                      </label>
                      <input
                        type="text"
                        required
                        value={receiptData.tenantTaxId}
                        onChange={(e) => setReceiptData(prev => ({ ...prev, tenantTaxId: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="987654321"
                        pattern="[0-9]{9}"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Morada *
                    </label>
                    <input
                      type="text"
                      required
                      value={receiptData.tenantAddress}
                      onChange={(e) => setReceiptData(prev => ({ ...prev, tenantAddress: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Avenida da República, 456, 1º Esq"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Localidade *
                      </label>
                      <input
                        type="text"
                        required
                        value={receiptData.tenantCity}
                        onChange={(e) => setReceiptData(prev => ({ ...prev, tenantCity: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Porto"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Código Postal *
                      </label>
                      <input
                        type="text"
                        required
                        value={receiptData.tenantPostalCode}
                        onChange={(e) => setReceiptData(prev => ({ ...prev, tenantPostalCode: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="4000-001"
                        pattern="[0-9]{4}-[0-9]{3}"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-emerald-100 text-emerald-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">3</span>
                  Dados do Imóvel
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Morada do Imóvel *
                    </label>
                    <input
                      type="text"
                      required
                      value={receiptData.propertyAddress}
                      onChange={(e) => setReceiptData(prev => ({ ...prev, propertyAddress: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Rua do Comércio, 789, 3º Frente"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Localidade *
                      </label>
                      <input
                        type="text"
                        required
                        value={receiptData.propertyCity}
                        onChange={(e) => setReceiptData(prev => ({ ...prev, propertyCity: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Braga"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Código Postal *
                      </label>
                      <input
                        type="text"
                        required
                        value={receiptData.propertyPostalCode}
                        onChange={(e) => setReceiptData(prev => ({ ...prev, propertyPostalCode: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="4700-001"
                        pattern="[0-9]{4}-[0-9]{3}"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Rent Details Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-emerald-100 text-emerald-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">4</span>
                  Detalhes da Renda
                </h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Valor da Renda (€) *
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={receiptData.rentAmount || ''}
                        onChange={(e) => setReceiptData(prev => ({ ...prev, rentAmount: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="850.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Período *
                      </label>
                      <select
                        value={receiptData.rentPeriod}
                        onChange={(e) => setReceiptData(prev => ({ ...prev, rentPeriod: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="monthly">Mensal</option>
                        <option value="quarterly">Trimestral</option>
                        <option value="biannual">Semestral</option>
                        <option value="annual">Anual</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mês *
                      </label>
                      <select
                        value={receiptData.rentMonth}
                        onChange={(e) => setReceiptData(prev => ({ ...prev, rentMonth: parseInt(e.target.value) }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        {monthNames.map((month, index) => (
                          <option key={index + 1} value={index + 1}>{month}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ano *
                      </label>
                      <input
                        type="number"
                        required
                        min="2020"
                        max="2030"
                        value={receiptData.rentYear}
                        onChange={(e) => setReceiptData(prev => ({ ...prev, rentYear: parseInt(e.target.value) }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número do Recibo (opcional)
                      </label>
                      <input
                        type="text"
                        value={receiptData.receiptNumber}
                        onChange={(e) => setReceiptData(prev => ({ ...prev, receiptNumber: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder={finalReceiptNumber}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data de Emissão *
                      </label>
                      <input
                        type="date"
                        required
                        value={receiptData.issueDate}
                        onChange={(e) => setReceiptData(prev => ({ ...prev, issueDate: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition-colors"
              >
                Gerar Recibo de Renda
              </button>
            </form>
          </div>

          {/* Receipt Preview */}
          {showReceipt && (
            <div className="bg-white rounded-xl shadow-lg p-8 print:shadow-none print:p-4">
              <div className="mb-6 print:mb-4">
                <button
                  onClick={printReceipt}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors print:hidden"
                >
                  Imprimir / Guardar PDF
                </button>
              </div>

              {/* Receipt Content */}
              <div className="border border-gray-300 p-8 print:border-black print:p-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">RECIBO DE RENDA</h2>
                  <p className="text-lg text-gray-600">Número: {finalReceiptNumber}</p>
                </div>

                <div className="space-y-6">
                  {/* Landlord Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                      SENHORIO
                    </h3>
                    <div className="space-y-1">
                      <p><strong>Nome:</strong> {receiptData.landlordName}</p>
                      <p><strong>NIF:</strong> {receiptData.landlordTaxId}</p>
                      <p><strong>Morada:</strong> {receiptData.landlordAddress}</p>
                      <p><strong>Localidade:</strong> {receiptData.landlordCity}, {receiptData.landlordPostalCode}</p>
                    </div>
                  </div>

                  {/* Tenant Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                      INQUILINO
                    </h3>
                    <div className="space-y-1">
                      <p><strong>Nome:</strong> {receiptData.tenantName}</p>
                      <p><strong>NIF:</strong> {receiptData.tenantTaxId}</p>
                      <p><strong>Morada:</strong> {receiptData.tenantAddress}</p>
                      <p><strong>Localidade:</strong> {receiptData.tenantCity}, {receiptData.tenantPostalCode}</p>
                    </div>
                  </div>

                  {/* Property Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                      IMÓVEL ARRENDADO
                    </h3>
                    <div className="space-y-1">
                      <p><strong>Morada:</strong> {receiptData.propertyAddress}</p>
                      <p><strong>Localidade:</strong> {receiptData.propertyCity}, {receiptData.propertyPostalCode}</p>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                      PAGAMENTO
                    </h3>
                    <div className="space-y-1">
                      <p><strong>Período:</strong> {monthNames[receiptData.rentMonth - 1]} de {receiptData.rentYear}</p>
                      <p><strong>Valor:</strong> €{receiptData.rentAmount.toFixed(2)}</p>
                      <p><strong>Modalidade:</strong> {receiptData.rentPeriod === 'monthly' ? 'Mensal' : receiptData.rentPeriod === 'quarterly' ? 'Trimestral' : receiptData.rentPeriod === 'biannual' ? 'Semestral' : 'Anual'}</p>
                      <p><strong>Data de Emissão:</strong> {new Date(receiptData.issueDate).toLocaleDateString('pt-PT')}</p>
                    </div>
                  </div>

                  {/* Declaration */}
                  <div className="bg-gray-50 p-4 rounded-lg print:bg-gray-100">
                    <p className="text-sm leading-relaxed">
                      Declaro que recebi do inquilino acima identificado a quantia de <strong>€{receiptData.rentAmount.toFixed(2)}</strong>
                      ({receiptData.rentAmount.toFixed(2).split('.').map((part, index) => index === 0 ?
                        `${part} euros` : `${part} cêntimos`).join(' e ')})
                      referente ao pagamento da renda do imóvel supra identificado, respeitante ao período de {monthNames[receiptData.rentMonth - 1].toLowerCase()} de {receiptData.rentYear}.
                    </p>
                  </div>

                  {/* Signature */}
                  <div className="mt-12 print:mt-8">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-4">Data:</p>
                        <p>{new Date(receiptData.issueDate).toLocaleDateString('pt-PT')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-4">Assinatura do Senhorio:</p>
                        <div className="border-b border-gray-400 w-48 h-8"></div>
                        <p className="text-sm mt-2">{receiptData.landlordName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal Note */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 print:hidden">
                <p><strong>Nota Legal:</strong> Este recibo foi gerado automaticamente. Para efeitos fiscais oficiais,
                deve ser registado no Portal das Finanças conforme a legislação em vigor.</p>
              </div>
            </div>
          )}
        </div>

        {/* Email Capture Modal */}
        {showEmailCapture && !emailSubmitted && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 print:hidden">
            <div className="bg-white rounded-xl p-8 max-w-md w-full">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Automatize os Seus Recibos
              </h3>
              <p className="text-gray-600 mb-6">
                O Senhorio está a desenvolver emissão automática de recibos eletrónicos integrados com o Portal das Finanças.
                Seja dos primeiros a usar esta funcionalidade.
              </p>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="seu@email.com"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={isSubmittingEmail}
                    className="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50"
                  >
                    {isSubmittingEmail ? 'A enviar...' : 'Entrar na Lista'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEmailCapture(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Talvez Depois
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Email Success Modal */}
        {emailSubmitted && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 print:hidden">
            <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
              <div className="text-emerald-600 text-4xl mb-4">✓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Obrigado!
              </h3>
              <p className="text-gray-600 mb-6">
                Adicionámos o seu email à nossa lista de espera. Será dos primeiros a saber quando a funcionalidade
                de recibos automáticos estiver disponível.
              </p>
              <button
                onClick={() => setEmailSubmitted(false)}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Porquê Usar o Gerador de Recibos do Senhorio?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-emerald-600 text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Rápido e Simples</h3>
              <p className="text-gray-600">
                Crie recibos profissionais em menos de 2 minutos. Interface intuitiva, sem complicações.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-emerald-600 text-3xl mb-4">📋</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Conforme à Lei</h3>
              <p className="text-gray-600">
                Recibos que incluem todos os campos obrigatórios conforme a legislação portuguesa.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-emerald-600 text-3xl mb-4">💰</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Completamente Grátis</h3>
              <p className="text-gray-600">
                Ferramenta 100% gratuita. Sem registo necessário. Dados não são guardados.
              </p>
            </div>
          </div>
        </div>

        {/* More Tools CTA */}
        <div className="mt-16 bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center">
          <h3 className="text-xl font-semibold text-emerald-900 mb-4">
            Explore as Nossas Outras Ferramentas
          </h3>
          <p className="text-emerald-700 mb-6">
            Descubra calculadoras gratuitas para gestão imobiliária em Portugal.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/calculadora"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition"
            >
              Calculadora Fiscal
            </Link>
            <Link
              href="/calculadora-rendas"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition"
            >
              Aumentos de Renda
            </Link>
            <Link
              href="/aimi"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition"
            >
              Isenção AIMI
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}