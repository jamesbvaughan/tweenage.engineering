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

const Footer = () => {
  return (
    <div className="flex items-center justify-center space-x-4 text-gray-700">
      <div>
        made by{" "}
        <FooterLink href="https://jamesbvaughan.com">james vaughan</FooterLink>
      </div>
      <div>&middot;</div>
      <div>
        <FooterLink href="https://github.com/jamesbvaughan/tweenage.engineering">
          website source
        </FooterLink>
      </div>
      <div>&middot;</div>
      <TinyletterForm />
    </div>
  );
};

export default Footer;
