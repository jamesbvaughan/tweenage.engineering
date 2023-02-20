import type { MDXComponents } from "mdx/types";

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 className=''>{children}</h1>,
    h2: ({ children }) => <h2 className="font-mono mt-8 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="font-mono mt-6 mb-4">{children}</h3>,
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
}
