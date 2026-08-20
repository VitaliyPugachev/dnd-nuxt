// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/i18n'],
  css: ['~/assets/base.scss'],
  i18n: {
    locales: [
      { code: 'ru', file: 'ru.ts', name: 'Русский' },
      { code: 'en', file: 'en.ts', name: 'English' }
    ],
    defaultLocale: 'ru',
    strategy: 'prefix_except_default', // Добавляет префикс /en/ к URL для всех языков, кроме дефолтного
  }
})
