import "./globals.css";

import classNames from "classnames";

import type { Metadata } from "next";
import AnalyticsWrapper from "./AnalyticsWrapper";
import { berkeleyMono, inter } from "./fonts";
import Footer from "./Footer";
import Header from "./Header";

export const metadata: Metadata = {
  title: "tweenage engineering",
  description:
    "Free-to-use plans for thoughtfully designed tools and furniture",
  icons: "/favicon.ico",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="en"
      className={classNames(inter.variable, berkeleyMono.variable)}
    >
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
};

export default RootLayout;
