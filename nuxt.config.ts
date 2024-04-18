export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/eslint"],
  ui: {
    icons: ["heroicons", "simple-icons"],
  },
  eslint: {
    config: {
      stylistic: {
        quotes: "single",
        commaDangle: "never",
      },
    },
  }
});
