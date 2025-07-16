export default defineAppConfig({
  ui: {
    colors: {
      // Key value can be any string.
      // Value can be the variable name declared in the main.css file.
      primary: "primary",
      dark: "dark",
    },
    input: {
      slots: {
        root: "min-w-100",
      },
      defaultVariants: {
        size: "lg",
      },
    },
    button: {
      slots: {
        base: "cursor-pointer",
      },
      defaultVariants: {
        size: "lg",
      },
    },
  },
});
