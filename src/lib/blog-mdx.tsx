import { cacheLife } from "next/cache";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/blog/mdx-components";
import { getPostBySlug, type BlogPost } from "@/lib/blog";

export type PostHeading = {
  id: string;
  text: string;
  depth: number;
};

type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
  value?: string;
};

function textOf(node: HastNode): string {
  if (typeof node.value === "string") return node.value;
  return (node.children ?? []).map(textOf).join("");
}

function collectHeadings(bucket: PostHeading[]) {
  return () => {
    const walk = (node: HastNode) => {
      if (
        node.tagName === "h2" ||
        node.tagName === "h3"
      ) {
        const id = node.properties?.id;
        const text = textOf(node).trim();
        if (typeof id === "string" && text) {
          bucket.push({
            id,
            text,
            depth: node.tagName === "h2" ? 2 : 3,
          });
        }
      }

      for (const child of node.children ?? []) walk(child);
    };

    return (tree: unknown) => walk(tree as HastNode);
  };
}

export async function renderPost(post: BlogPost) {
  const headings: PostHeading[] = [];

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeHighlight, { detect: false, ignoreMissing: true }],
          collectHeadings(headings),
        ],
      },
    },
  });

  return { content, headings };
}

export async function getRenderedPost(slug: string) {
  "use cache";
  cacheLife({ stale: 3600, revalidate: 3600, expire: 86_400 });

  const post = getPostBySlug(slug);
  if (!post) return null;

  const { content, headings } = await renderPost(post);
  return { post, content, headings };
}