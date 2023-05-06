export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'SlipVerify',
    htmlAttrs: {
      lang: 'th'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'ให้บริการ API ตรวจสอบสลิป' },
      { name: 'keywords', content: 'slip verify, slip, verify, api' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/logo.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // {src: '~/plugins/chart.js', mode: 'client'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  googleFonts: {
    families: {
      Prompt: [100, 400],
    },
    preload: true
  },
  
  cache: {
    max: 1000,
    maxAge: 3600000 // Cache items for one hour
  },

  fontawesome: {
    icons: {
      solid: true
    }
  },
  
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
    '@nuxtjs/google-fonts',
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  // axios: {
  //   baseURL: 'https://api.slipverify.xyz/api/'
  // },
  axios: {
    baseURL: 'http://localhost:30002/api/'
  },

  auth: {
    cookie: {
      options: {
        sameSite: 'lax',
        secure: true
      }
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true
        },
        user: {
          property: 'user',
          autoFetch: false
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },      
          user: { url: '/auth/me', method: 'get', propertyName: 'data' },
          logout: false
        }
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      home: '/'
    }
  
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'vue-sweetalert2/nuxt'
  ],
  
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  loading: {
    color: '#2A60D8',
    height: '2px'
  }

}
