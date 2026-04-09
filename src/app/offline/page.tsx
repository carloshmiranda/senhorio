'use client';

import Link from 'next/link';

// Logo component for offline page
function SenhorioLogo() {
  return (
    <svg width="64" height="64" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="mx-auto">
      <rect width="32" height="32" rx="8" fill="#0F766E" />
      <path
        d="M16 7L27 15.5V25H21V19.5H11V25H5V15.5L16 7Z"
        fill="white"
        fillOpacity="0.95"
      />
      <rect x="13" y="19.5" width="6" height="5.5" fill="#0F766E" />
    </svg>
  );
}

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full text-center">
        <SenhorioLogo />

        <h1 className="mt-8 text-3xl font-bold text-gray-900">
          Está Offline
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Não conseguimos estabelecer ligação à internet. Verifique a sua ligação e tente novamente.
        </p>

        <div className="mt-8 space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Tentar Novamente
          </button>

          <Link
            href="/dashboard"
            className="block w-full bg-white hover:bg-gray-50 text-teal-700 font-medium py-3 px-6 rounded-lg border border-teal-700 transition-colors"
          >
            Ir para Dashboard
          </Link>
        </div>

        <div className="mt-12 bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Funcionalidades Offline
          </h2>
          <ul className="text-sm text-gray-600 space-y-2 text-left">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-teal-600 rounded-full mr-3 flex-shrink-0"></span>
              Visualizar propriedades e dados em cache
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-teal-600 rounded-full mr-3 flex-shrink-0"></span>
              Acesso às calculadoras fiscais básicas
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-teal-600 rounded-full mr-3 flex-shrink-0"></span>
              Consultar recibos guardados
            </li>
            <li className="flex items-center opacity-60">
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 flex-shrink-0"></span>
              <span>Criar novos recibos (requer internet)</span>
            </li>
            <li className="flex items-center opacity-60">
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 flex-shrink-0"></span>
              <span>Sincronização de dados (requer internet)</span>
            </li>
          </ul>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Os dados criados offline serão sincronizados automaticamente quando a ligação for restabelecida.
        </p>
      </div>
    </div>
  );
}