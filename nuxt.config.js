export default {
  // Target: https://go.nuxtjs.dev/config-target
  ssr: true,
  target: "server",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Audiophile Shop",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Audiophile Shop Number One",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@assets/styles/scss/variables.scss", "normalize.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  axios: {
    baseURL: process.env.BASE_URL || "http://localhost:3000/",
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/style-resources",
    "@nuxtjs/axios",
    "cookie-universal-nuxt",
  ],

  styleResources: {
    scss: ["@assets/styles/scss/*.scss"],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  env: {
    firebaseUrl:
      "https://audiophile-ecommerce-website-default-rtdb.europe-west1.firebasedatabase.app",
  },
};
