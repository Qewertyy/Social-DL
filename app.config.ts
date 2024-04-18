export default defineAppConfig({
  ui: {
    container: {
      constrained: "max-w-2xl",
    },
    card: {
      base:'',
      rounded: "rounded-lg",
      ring: "ring-1 ring-gray-200 dark:ring-gray-800",
      header: {
        base: "flex flex-wrap items-center justify-between",
        background: "bg-white dark:bg-black",
      },
      body: {
        base: "space-y-4",
        background: "bg-white dark:bg-black",
      },
    },
    dropdown: {
      width: "w-full",
      popper: {
        strategy: "absolute",
      },
    },
    input:{
      base:'w-full',
      color: "text-black dark:text-white bg-white dark:bg-black",
    }
  }
});
