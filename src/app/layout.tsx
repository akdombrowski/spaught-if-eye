import "~/styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import type { Metadata } from "next";

import CssBaseline from "@mui/material/CssBaseline";
import CustomThemeProvider from "../styles/CustomThemeProvider";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CustomThemeProvider>{children}</CustomThemeProvider>
      </body>
    </html>
  );
}
