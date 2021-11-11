import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        _focus: { boxShadow: "none" },
      },
    },
    Link: {
      baseStyle: {
        _focus: { boxShadow: "none" },
      },
    },
  },
  sizes: {
    siteMaxWidth: "72rem",
  },
});
