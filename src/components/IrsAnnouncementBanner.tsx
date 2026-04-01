"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const BANNER_COOKIE_KEY = "irs-banner-dismissed-2026";

export default function IrsAnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if banner was previously dismissed
    const isDismissed = document.cookie
      .split("; ")
      .find((row) => row.startsWith(BANNER_COOKIE_KEY + "="))
      ?.split("=")[1] === "true";

    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const dismissBanner = () => {
    // Set cookie to remember dismissal for 1 year
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `${BANNER_COOKIE_KEY}=true; expires=${expires.toUTCString()}; path=/`;
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="relative bg-amber-500 px-4 py-3 text-white shadow-sm" style={{
      backgroundColor: "var(--brand-amber)",
      color: "white"
    }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sm font-medium">
            📋 Entrega do IRS 2026 está aberta!{" "}
            <Link
              href="/simulador-irs"
              className="inline-flex items-center underline hover:text-amber-100 transition-colors"
              style={{ color: "inherit" }}
            >
              Simule o seu IRS como senhorio
              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </p>
        </div>

        <button
          onClick={dismissBanner}
          className="ml-4 inline-flex rounded-md p-1.5 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Fechar anúncio"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}