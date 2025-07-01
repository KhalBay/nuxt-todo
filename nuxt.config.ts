export default defineNuxtConfig({
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
  app: {
    baseURL: '/nuxt-todo/',
    buildAssetsDir: '_nuxt/'
  },
  nitro: {
    output: {
      publicDir: 'docs'
    }
  }
})