import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "~/styles/theme";

// import { WebVitals } from "~/components/WebVitals";

/**
 * https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries#google-third-parties
 */
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: {
    template: "%s | Slom-n-Dom Music",
    default: "Slom n Dom Music App",
  },
  description: "Slom & Dom's Music App",
  icons: [{ rel: "icon", url: "/favicon/favicon.ico" }],
  applicationName: "Slom-n-Dom-Music-App",
  referrer: "origin-when-cross-origin",
  keywords: ["slom", "dom", "music"],
  authors: [
    { name: "Anthony Dombrowski", url: "https://github.com/akdombrowski" },
  ],
  creator: "Anthony Dombrowski",
  publisher: "Anthony Dombrowski",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          {/* <CustomThemeProvider>{children}</CustomThemeProvider> */}
          <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
        {/* <WebVitals /> */}
        <GoogleTagManager gtmId="GTM-MVQJ5ZB8" />
      </body>
    </html>
  );
}
