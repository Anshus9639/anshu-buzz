import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const WORDS_PER_MINUTE = 200;

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  coverImage?: string;
  readingTime: number;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

function normalizeDate(value: unknown) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === "string") {
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10);
  }

  return null;
}

function readingTimeFor(content: string) {
  const plain = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~|-]/g, " ");

  const words = plain.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

function readPost(fileName: string): BlogPost | null {
  if (!fileName.endsWith(".mdx")) return null;

  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  const title = typeof data.title === "string" ? data.title.trim() : "";
  const description =
    typeof data.description === "string" ? data.description.trim() : "";
  const date = normalizeDate(data.date);
  const slug =
    typeof data.slug === "string" && data.slug.trim()
      ? data.slug.trim()
      : fileName.replace(/\.mdx$/, "");

  if (!title || !description || !date) return null;

  return {
    slug,
    title,
    description,
    date,
    tags: Array.isArray(data.tags)
      ? data.tags.filter((tag): tag is string => typeof tag === "string")
      : [],
    published: data.published === true,
    coverImage:
      typeof data.coverImage === "string" && data.coverImage.trim()
        ? data.coverImage.trim()
        : undefined,
    readingTime: readingTimeFor(content),
    content,
  };
}

function readAllPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map(readPost)
    .filter((post): post is BlogPost => post !== null)
    .sort(
      (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
    );
}

function toMeta(post: BlogPost): BlogPostMeta {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    published: post.published,
    coverImage: post.coverImage,
    readingTime: post.readingTime,
  };
}

export function getPublishedPosts(): BlogPostMeta[] {
  return readAllPosts()
    .filter((post) => post.published)
    .map(toMeta);
}

export function getPostBySlug(slug: string): BlogPost | null {
  const post = readAllPosts().find((entry) => entry.slug === slug);
  return post?.published ? post : null;
}

export function getRelatedPosts(post: BlogPostMeta, limit = 2) {
  const others = getPublishedPosts().filter(
    (entry) => entry.slug !== post.slug,
  );
  const sharesTag = (entry: BlogPostMeta) =>
    entry.tags.some((tag) => post.tags.includes(tag));

  return [
    ...others.filter(sharesTag),
    ...others.filter((entry) => !sharesTag(entry)),
  ].slice(0, limit);
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}