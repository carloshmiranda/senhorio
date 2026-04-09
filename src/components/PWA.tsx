"use client";

import { useEffect } from 'react';

export default function PWA() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[PWA] Service Worker registered successfully:', registration.scope);

          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60000); // Check every minute
        })
        .catch((error) => {
          console.log('[PWA] Service Worker registration failed:', error);
        });

      // Handle app updates
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[PWA] New service worker activated, reloading page');
        window.location.reload();
      });
    }

    // Handle installation prompt
    let deferredPrompt: any;

    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('[PWA] Install prompt triggered');
      e.preventDefault();
      deferredPrompt = e;

      // Show custom install button/banner
      showInstallPromotion();
    };

    const handleAppInstalled = () => {
      console.log('[PWA] App was installed');
      hideInstallPromotion();
      deferredPrompt = null;

      // Track installation
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'pwa_install', {
          event_category: 'PWA',
          event_label: 'App Installed'
        });
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const showInstallPromotion = () => {
    // Create install prompt UI
    const installBanner = document.createElement('div');
    installBanner.id = 'install-banner';
    installBanner.innerHTML = `
      <div style="
        position: fixed;
        bottom: 20px;
        left: 20px;
        right: 20px;
        background: #0F766E;
        color: white;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 400px;
        margin: 0 auto;
      ">
        <div style="flex: 1; margin-right: 16px;">
          <div style="font-weight: 600; margin-bottom: 4px;">
            Instalar Senhorio
          </div>
          <div style="font-size: 14px; opacity: 0.9;">
            Adicione à tela inicial para acesso rápido
          </div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button id="install-dismiss" style="
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
          ">
            Talvez mais tarde
          </button>
          <button id="install-accept" style="
            background: white;
            border: none;
            color: #0F766E;
            padding: 8px 16px;
            border-radius: 4px;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
          ">
            Instalar
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(installBanner);

    // Handle install banner actions
    document.getElementById('install-accept')?.addEventListener('click', async () => {
      if (window.deferredPrompt) {
        window.deferredPrompt.prompt();
        const { outcome } = await window.deferredPrompt.userChoice;
        console.log(`[PWA] User response to install prompt: ${outcome}`);
        window.deferredPrompt = null;
      }
      hideInstallPromotion();
    });

    document.getElementById('install-dismiss')?.addEventListener('click', () => {
      hideInstallPromotion();
      // Remember user dismissed the prompt
      localStorage.setItem('install-prompt-dismissed', Date.now().toString());
    });

    // Store reference globally
    (window as any).deferredPrompt = window.deferredPrompt;
  };

  const hideInstallPromotion = () => {
    const banner = document.getElementById('install-banner');
    if (banner) {
      banner.remove();
    }
  };

  return null; // This component doesn't render anything visible
}

// Extend window type for TypeScript
declare global {
  interface Window {
    deferredPrompt: any;
    gtag?: (...args: any[]) => void;
  }
}