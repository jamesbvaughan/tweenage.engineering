import "./globals.css";

import classNames from "classnames";

import { inter, berkeleyMono } from "./fonts";
import { AnalyticsWrapper } from "./AnalyticsWrapper";
import Header from "./Header";
import Footer from "./Footer";

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

      <body className="text-white bg-black mb-6">
        <div className="mx-auto md:w-10/12 w-11/12 space-y-5">
          <Header />

          {children}

          <hr className="border-t border-1 border-gray-800" />

          <Footer />
        </div>

        <AnalyticsWrapper />
      </body>
    </html>
  );
}
