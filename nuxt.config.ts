export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
        }
      ]
    },
    // Это для gh-pages у меня основной домен уже занят на гите, поэтому по проектно чтобы работало, делаю так
    //   baseURL: '/nuxt-todo/',
    //   buildAssetsDir: '_nuxt/'
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/variables.scss";'
        }
      }
    }
  },
  devtools: {
    enabled: false
  },
  modules: ['@pinia/nuxt', '@nuxt/image'],
  typescript: {
    tsConfig: {
      compilerOptions: {
        paths: {
          '@/*': ['./*'],
          '~/*': ['./*']
        },
        types: [
          "@nuxt/types",
          "@pinia/nuxt"
        ]
      }
    }
  },
  nitro: {
    output: {
      publicDir: 'docs'
    }
  },
  hooks: {
    'nitro:config'(config) {
      if (config.prerender?.routes) {
        config.prerender.routes.push('/')
      }
    }
  }
})