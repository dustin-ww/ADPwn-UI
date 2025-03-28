import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  runtimeConfig: {
    // Server-seitige Konfiguration (nicht im Browser verfügbar)
    apiSecret: process.env.API_SECRET,
    
    // Browser-verfügbare Konfiguration
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://127.0.0.1:8081'
    }
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/ui'
  ],

  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
    // Verwende automatisch Cookies für SSR und localStorage im Browser
    storage: import.meta.client ? 'localStorage' : 'cookies'
  },
  app: {
    head: {
      title: 'ADPwn', // default fallback title
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  },
})