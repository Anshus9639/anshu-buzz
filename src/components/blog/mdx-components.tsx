import Link from "next/link";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    if (/^https?:\/\//.test(href)) {
      return (
        <a href={href} target="_blank" rel="noreferrer noopener" {...props}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  },
  table: ({ children, ...props }) => (
    <div className="post-table" tabIndex={0}>
      <table {...props}>{children}</table>
    </div>
  ),
  pre: ({ children, ...props }) => (
    <pre tabIndex={0} {...props}>{children}</pre>
  ),
  img: ({ alt = "", ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} loading="lazy" decoding="async" {...props} />
  ),
};