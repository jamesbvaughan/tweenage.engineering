import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

const HeaderLink = (props: PropsWithChildren<LinkProps>) => {
  return (
    <Link
      {...props}
      className="text-lg hover:text-gray-400"
    />
  );
};

export default function Header() {
  return (
    <div className="w-full items-end justify-between space-y-4 py-4 sm:flex">
      <Link
        href="/"
        className="font-mono text-xl font-bold hover:text-gray-400"
      >
        tweenage engineering
      </Link>

      <div className="flex space-x-6">
        <HeaderLink href="/meadow-desk/configure">configuration tool</HeaderLink>
        <HeaderLink href="/about">about</HeaderLink>
      </div>
    </div>
  );
}
