// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: false,
  extends: ["@nuxt/ui-pro"],
  modules: ["@nuxt/ui", "@vueuse/nuxt"],
  tailwindcss: {
    exposeConfig: true,
  },
  ui: {
    prefix: "u",
  },
  runtimeConfig: {
    public: {
      appUrl: "http://localhost:3000",
      apiUrl: "http://localhost:8000",
    },
  },
});
