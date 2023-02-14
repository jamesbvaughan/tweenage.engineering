import localFont from "@next/font/local";

import { Inter } from "@next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// TODO: Figure out how to get the variable version of this font working.
export const berkeleyMono = localFont({
  src: [
    {
      path: "./fonts/BerkeleyMono-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "./fonts/BerkeleyMono-Bold.woff2",
      style: "normal",
      weight: "700",
    },
    {
      path: "./fonts/BerkeleyMono-Italic.woff2",
      style: "italic",
      weight: "400",
    },
    {
      path: "./fonts/BerkeleyMono-BoldItalic.woff2",
      style: "italic",
      weight: "700",
    },
  ],
  variable: "--font-berkeley-mono",
  display: "swap",
});
