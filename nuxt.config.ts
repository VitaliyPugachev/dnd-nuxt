// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@pinia/nuxt', '@nuxtjs/i18n'],
  css: ['~/assets/base.scss'],
    app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://gstatic.com', crossorigin: '' },
        
        // 2. Сама ссылка на выбранный шрифт (например, Roboto)
        { 
          rel: 'stylesheet', 
          href: 'https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300..700;1,300..700&display=swap' 
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&display=swap" rel="stylesheet'
        }
      ]
    }
  },
  i18n: {
    locales: [
      { code: 'ru', file: 'ru.ts', name: 'Русский' },
      { code: 'en', file: 'en.ts', name: 'English' }
    ],
    defaultLocale: 'ru',
    strategy: 'prefix_except_default', // Добавляет префикс /en/ к URL для всех языков, кроме дефолтного
  },
  devServer: {
    port: 8080,
    host: "localhost"
  }
})
