// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    baseURL: '/3d',
  },
  // ssr: false, // false关闭服务端渲染
  vue: {
    propsDestructure: true,
  },
  // 初始化样式
  // css: ['~/assets/css/base.scss'],

  vite: {
    base: '/3d',
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/css/base.scss" as *;',
          // 消除控制台警告
          api: 'modern-compiler' // 或者 'modern'
        }
      }
    }
  },
  // 引入第三方模块
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxtjs-naive-ui'
  ],
  build: {
    transpile: ['pinpinia-plugin-persistedstateia'],
  },
  elementPlus: { /** Options */ },
  // 运行时的一些全局变量
  runtimeConfig: {
    isServer: false,
    public: {
      baseURL: 'localhost:8080',
    }
  },
  devServer: {
    port: 8080,
  }
})
