export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  router: {
    middleware: 'auth'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
    '@/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxt/postcss8'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    'nuxt-sweetalert2',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyDvF32fCrw4lXphh7z5cseoSXJHmHgza-U',
          authDomain: 'robotics-teacher.firebaseapp.com',
          projectId: 'robotics-teacher',
          storageBucket: 'robotics-teacher.appspot.com',
          messagingSenderId: '512770126462',
          appId: '1:512770126462:web:9dcdeaa356e655d1d9de2f',
          measurementId: 'G-RCXCHLB87Z'
        },
        services: {
          auth: {
            initialize: {
              onAuthStateChangedAction: 'robotic_system/onAuthStateChangedAction',
              subscribeManually: false
            },
            emulatorPort: 9099
          },
          firestore: {
            emulatorPort: 8080
          },
          functions: {
            location: 'us-central1',
            emulatorPort: 5001
          }
        }
      }
    ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      sass: {
        implementation: require('sass')
      },
      scss: {
        implementation: require('sass')
      }
    },
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {}
      }
    }
  }
}
