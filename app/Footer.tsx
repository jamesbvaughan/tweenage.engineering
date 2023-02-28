import { PropsWithChildren } from "react";

import TinyletterForm from "./TinyletterForm";

const FooterLink = ({
  href,
  children,
}: PropsWithChildren<{ href: string }>) => {
  return (
    <a href={href} className="text-gray-700 hover:text-gray-800">
      {children}
    </a>
  );
};

const Dot = () => {
  return <div className="hidden sm:block">&middot;</div>;
};

const Footer = () => {
  return (
    <div className="flex flex-col justify-center space-y-4 text-gray-700 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
      <div>
        made by{" "}
        <FooterLink href="https://jamesbvaughan.com">james vaughan</FooterLink>
      </div>
      <Dot />
      <div>
        <FooterLink href="mailto:james@jamesbvaughan.com">contact</FooterLink>
      </div>
      <Dot />
      <div>
        <FooterLink href="https://github.com/jamesbvaughan/tweenage.engineering">
          website source
        </FooterLink>
      </div>
      <Dot />
      <TinyletterForm />
    </div>
  );
};

export default Footer;
