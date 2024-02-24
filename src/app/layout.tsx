import "~/styles/globals.css";

import { Inter } from "next/font/google";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Slom n Dom Music App",
  description: "Slom & Dom Music App",
  icons: [{ rel: "icon", url: "/favicon/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
