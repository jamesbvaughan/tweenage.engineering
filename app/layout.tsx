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

      <body className="mb-6 bg-black text-white">
        <div className="mx-auto w-11/12 md:w-10/12">
          <Header />

          <div className="mt-6">{children}</div>

          <hr className="mt-10 mb-5 border-t border-gray-800" />

          <Footer />
        </div>

        <AnalyticsWrapper />
      </body>
    </html>
  );
}
