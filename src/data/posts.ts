export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; language?: string; code: string };

export type PostLink = {
  label: string;
  href: string;
};

export type Post = {
  slug: string;
  title: string;
  summary: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  tags: string[];
  blocks: PostBlock[];
  related?: PostLink[];
};

/**
 * Posts are typed data, like the rest of the site's content.
 * Newest first is handled by `getAllPosts`, so order here does not matter
 * except as a tie-breaker for posts published on the same day.
 *
 * Inline `code` spans are supported in paragraphs, list items and quotes
 * using backticks.
 */
export const posts: Post[] = [
  {
    slug: "keeping-a-simulated-ledger-honest",
    title: "Keeping a simulated trading ledger honest",
    summary:
      "NexusTrade Pro moves no real money, which makes it tempting to be loose with balances. Here is how escrow, a single matcher and idempotent orders keep the simulated ledger trustworthy.",
    date: "2026-11-23",
    tags: ["Fintech", "Backend"],
    blocks: [
      {
        type: "p",
        text: "NexusTrade Pro is a paper-trading simulator, so no real money ever moves. That makes it tempting to be sloppy with balances. I wanted the opposite: treat the simulated ledger as if it were real, because the bugs are the same ones.",
      },
      { type: "h2", text: "State that moves independently" },
      {
        type: "p",
        text: "A trading interface hides a lot of state. Balances, escrow, order status and fills all change on their own schedule. If the model of that state is loose, the UI looks fine right up until two orders spend the same money.",
      },
      { type: "h2", text: "Escrow on submission" },
      {
        type: "p",
        text: "When an order is placed, the funds are escrowed in the database straight away instead of being checked later. A resting limit order has already reserved what it needs, so a second order cannot claim the same balance.",
      },
      { type: "h2", text: "One matcher, one cycle" },
      {
        type: "p",
        text: "Resting limit orders are checked by a single matcher that runs every three seconds. Fills are written to MongoDB as order and position state, and Socket.IO pushes the update to the client. One cycle is easy to reason about, which was the point. The trade-off is that a fill can trail the market by up to a cycle.",
      },
      { type: "h2", text: "Idempotent submission" },
      {
        type: "p",
        text: "Every order carries a client-generated `clientOrderId`. A retried request, such as a double click or a flaky connection, cannot create a duplicate order.",
      },
      { type: "h2", text: "An AI boundary that stays a boundary" },
      {
        type: "p",
        text: "The Gemini copilot turns a natural-language request into a structured trade proposal. It never places the order. The proposal comes back for review and the user submits it, and no API key reaches the client.",
      },
      {
        type: "quote",
        text: "If the model can only propose, a bad answer costs a click instead of a position.",
      },
      { type: "h2", text: "Where it is still thin" },
      {
        type: "p",
        text: "The deployed backend predates the health endpoints I added locally, and no automated test suite has been verified for this project. The escrow and matcher paths are where tests would pay off first, because that is where a ledger bug would live.",
      },
    ],
    related: [
      { label: "NexusTrade Pro case study", href: "/projects/nexustrade-pro" },
      {
        label: "Source on GitHub",
        href: "https://github.com/Anshus9639/TRADING-ALGO",
      },
    ],
  },
  {
    slug: "a-rag-system-that-says-i-dont-know",
    title: "Building a RAG system that is allowed to say “I don’t know”",
    summary:
      "A plausible answer without a source is worse than no answer. How heading-aware chunks, deterministic retrieval routes, a similarity gate and metadata citations make a local RAG app refuse when it should.",
    date: "2026-11-23",
    tags: ["Applied AI", "RAG"],
    blocks: [
      {
        type: "p",
        text: "A language model cannot ground an answer in a document it has never seen, and a plausible answer without a source is worse than no answer at all. RAG Document Q&A is built around one rule: an answer is only worth showing if it can be traced back to a source.",
      },
      { type: "h2", text: "Chunk by heading, not by size" },
      {
        type: "p",
        text: "Documents are split by heading at 800 characters with 150 characters of overlap, and a chunk never spans two headings. Keeping section structure intact matters more than filling a fixed character budget.",
      },
      { type: "h2", text: "Try the boring retrievers first" },
      {
        type: "p",
        text: "Each question runs through four routes in order: named headings, clause or section numbers, keyword overlap, and finally semantic search over `all-MiniLM-L6-v2` embeddings in a FAISS index. In the current regression set, no correct hit was decided by the semantic route alone. The deterministic routes resolved those cases.",
      },
      { type: "h2", text: "A gate before the model" },
      {
        type: "p",
        text: "Semantic results must clear a configured `MIN_SCORE` before they are allowed into the context. That threshold is the last line of defence before the model is called at all. When the evidence fails it, the system refuses.",
      },
      { type: "h2", text: "Do not let the model cite itself" },
      {
        type: "p",
        text: "Citations, meaning file, page and section, are assembled from stored chunk metadata. The model is never trusted to report its own sources.",
      },
      { type: "h2", text: "Numbers are where it goes wrong" },
      {
        type: "p",
        text: "A numeric check withholds any answer containing digits that appear nowhere in the retrieved text. It is a deliberately conservative heuristic, and the repository documents where it can still fail.",
      },
      { type: "h2", text: "What the evaluation does and does not say" },
      {
        type: "p",
        text: "The repo ships 12 retrieval checks, 6 answer checks and 18 pytest tests, run in CI on GitHub Actions. Both check sets are small and curated. They are a regression signal for changes, not a claim of general retrieval quality.",
      },
    ],
    related: [
      { label: "RAG Document Q&A case study", href: "/projects/rag-doc-qa" },
      {
        label: "Source on GitHub",
        href: "https://github.com/Anshus9639/rag-doc-qa-bot",
      },
    ],
  },
  {
    slug: "how-this-site-is-built",
    title: "How this site is built",
    summary:
      "Next.js, Tailwind 4 and a lazy-loaded 3D sculpture, with all content kept in typed data files and one rule: nothing is rendered that is not true.",
    date: "2026-11-23",
    tags: ["Meta", "Frontend"],
    blocks: [
      {
        type: "p",
        text: "This site is a portfolio first and, now, a place to write. Here is how it is put together and the few rules I kept to.",
      },
      { type: "h2", text: "The stack" },
      {
        type: "ul",
        items: [
          "Next.js with the App Router, TypeScript and Tailwind CSS 4.",
          "A Three.js chrome sculpture in the hero, loaded lazily and on desktop only.",
          "Framer Motion for overlays only: the command palette and the mobile menu.",
        ],
      },
      { type: "h2", text: "The 3D hero has to earn its weight" },
      {
        type: "p",
        text: "The sculpture only loads after the first interaction, and only on wide screens with a fine pointer. It is skipped when the visitor prefers reduced motion or has data saver on, and it pauses when it is off screen or the tab is hidden. Everyone else gets a lightweight CSS orb.",
      },
      { type: "h2", text: "Content lives in typed data" },
      {
        type: "p",
        text: "Profile, projects, skills, experience and now posts are plain TypeScript files under `src/data`. Components render what the data says and nothing else, so editing the site means editing data.",
      },
      { type: "h2", text: "Nothing untrue gets rendered" },
      {
        type: "p",
        text: "Links appear only when they exist in the data, so there are no placeholder demo URLs. A project’s completion status and its demo availability are separate fields, which is why a finished local-only build is not shown as live.",
      },
      { type: "h2", text: "Keyboard first" },
      {
        type: "p",
        text: "Press Ctrl or ⌘ plus K anywhere to open a command palette that jumps to sections, projects and posts, copies my email, or opens the resume.",
      },
    ],
    related: [
      {
        label: "Source on GitHub",
        href: "https://github.com/Anshus9639/anshu-buzz",
      },
    ],
  },
];

const wordsPerMinute = 200;

function blockText(block: PostBlock): string {
  switch (block.type) {
    case "ul":
      return block.items.join(" ");
    case "code":
      return "";
    default:
      return block.text;
  }
}

export function getReadingMinutes(post: Post): number {
  const words = post.blocks
    .map(blockText)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / wordsPerMinute));
}

/** Newest first; ties keep the order they are declared in. */
export function getAllPosts(): Post[] {
  return posts
    .map((post, order) => ({ post, order }))
    .sort((a, b) =>
      a.post.date === b.post.date
        ? a.order - b.order
        : a.post.date < b.post.date
          ? 1
          : -1,
    )
    .map(({ post }) => post);
}

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getAdjacentPosts(slug: string): {
  newer?: Post;
  older?: Post;
} {
  const all = getAllPosts();
  const index = all.findIndex((post) => post.slug === slug);
  if (index === -1) return {};
  return { newer: all[index - 1], older: all[index + 1] };
}

export function getAllTags(): string[] {
  return Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatPostDate(date: string): string {
  return dateFormatter.format(new Date(`${date}T00:00:00Z`));
}
