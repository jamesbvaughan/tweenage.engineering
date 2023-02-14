import "./globals.css";
import Header from "./header";

import localFont from "@next/font/local";
import classNames from "classnames";

import { Inter } from "@next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const berkeleyMono = localFont({
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={classNames(inter.variable, berkeleyMono.variable)}
    >
      <head />

      <body className="text-white bg-black">
        <div className="mx-auto w-10/12">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
