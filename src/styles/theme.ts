"use client";
import "client-only";

import { type ThemeOptions, createTheme } from "@mui/material/styles";
import { type PaletteMode } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#badefe",
            contrastText: "#ec562c",
          },
          secondary: {
            main: "#001fab",
            contrastText: "#f3e28f",
          },
          background: {
            main: "#080708",
            default: "#080708",
          },
          text: {
            primary: "#cae9ff",
          },
          error: {
            main: "#b86f52",
          },
          divider: "#4c0000",
        }
      : {
          primary: {
            main: "#badefe",
            contrastText: "#ec562c",
          },
          secondary: {
            main: "#001fab",
            contrastText: "#f3e28f",
          },
          background: {
            main: "#080708",
            default: "#080708",
          },
          text: {
            primary: "#cae9ff",
          },
          error: {
            main: "#b86f52",
          },
          divider: "#4c0000",
        }),
  },
});

export const themeOptions: ThemeOptions = getDesignTokens("dark");
// export const theme = createTheme(themeOptions);

export const theme = createTheme({
  palette: {
    primary: {
      main: "#badefe",
      contrastText: "#ec562c",
    },
    secondary: {
      main: "#001fab",
      contrastText: "#f3e28f",
    },
    background: {
      // main: "#080708",
      default: "#080708",
    },
    text: {
      primary: "#cae9ff",
    },
    error: {
      main: "#b86f52",
    },
    divider: "#4c0000",
  },
});

export default theme;
