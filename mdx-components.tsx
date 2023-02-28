import type { MDXComponents } from "mdx/types";

export const useMDXComponents = (components: MDXComponents): MDXComponents => {
  return {
    h1: ({ children }) => <h1 className="mt-10 mb-4 font-mono">{children}</h1>,
    h2: ({ children }) => <h2 className="mt-10 mb-4 font-mono">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-6 mb-4 font-mono">{children}</h3>,
    h4: ({ children }) => <h4 className="mt-6 mb-2 font-mono">{children}</h4>,
    h5: ({ children }) => <h5 className="mt-6 mb-4 font-mono">{children}</h5>,
    p: ({ children }) => <p className="my-3">{children}</p>,
    a: ({ children, ...props }) => (
      <a className="text-gray-500" {...props}>
        {children}
      </a>
    ),
    ul: ({ children }) => <ul className="list-disc pl-8">{children}</ul>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-700 pl-4 italic">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-6 border-t border-gray-800" />,
    ...components,
  };
};
