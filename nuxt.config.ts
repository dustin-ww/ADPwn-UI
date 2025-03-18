// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    // Server-seitige Konfiguration (nicht im Browser verfügbar)
    apiSecret: process.env.API_SECRET,
    
    // Browser-verfügbare Konfiguration
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://127.0.0.1:8081'
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
    // Verwende automatisch Cookies für SSR und localStorage im Browser
    storage: import.meta.client ? 'localStorage' : 'cookies'
  },
  css: ["v-network-graph/lib/style.css"],
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