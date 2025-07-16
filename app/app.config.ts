export default defineAppConfig({
  ui: {
    colors: {
      // Key value can be any string.
      // Value can be the variable name declared in the main.css file.
      primary: "primary",
      dark: "dark",
      black: "black",
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
    navigationMenu: {
      slots: {
        link: "text-md before:rounded-full",
      },
      variants: {
        orientation: {
          vertical: {
            link: "py-4 px-5",
          },
        },
      },
      compoundVariants: [
        {
          variant: "pill",
          active: true,
          highlight: false,
          class: {
            link: "before:bg-primary text-white",
            linkLeadingIcon: "text-white",
          },
        },
      ],
    },
  },
});
