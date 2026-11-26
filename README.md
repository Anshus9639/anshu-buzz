# ANSHU — anshu.buzz

Personal portfolio of Anshu Saini — Entry-Level Applied AI / Generative AI Engineer.
AI Engineer · Python Developer · Software Builder.

Underground luxury × dark minimalism × futuristic editorial design. Built with
Next.js App Router, TypeScript, and Tailwind CSS 4, with a Markdown/MDX
writing section.

## Stack

- Next.js 16.4 (App Router, Turbopack, Cache Components)
- React 19.3 + TypeScript
- Tailwind CSS 4 (design tokens in `src/app/globals.css`)
- MDX via `next-mdx-remote` + `gray-matter`, with `remark-gfm`,
  `rehype-slug` and `rehype-highlight`
- Framer Motion (overlays only: command palette, mobile menu)
- Lucide React icons

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
npx tsc --noEmit
```

Node 20+ is required (developed on Node 24).

## Where to edit content

All copy and data are centralised — no hardcoded personal content in components.

| File | Controls |
| --- | --- |
| `src/data/profile.ts` | Name, brand, email, availability, statement, social links, disciplines |
| `src/data/projects.ts` | Four homepage project cards: plain-language summaries, status, preview media and links |
| `src/data/additional-projects.ts` | Additional work / experiments (Recipe Intelligence Chatbot, Legal Document Analysis) |
| `src/data/skills.ts` | Five expertise categories |
| `src/data/experience.ts` | Codolog internship timeline |
| `src/data/education.ts` | Pillai College B.Tech IT entry |
| `src/lib/navigation.ts` | Header links and section order |
| `src/content/blog/*.mdx` | Blog articles, drafts and publishing metadata |

### Content rules

- The public UI intentionally excludes the personal mobile number. It remains
  only in the downloadable PDF resume.
- Completion and demo availability are separate fields. Current state:
  NexusTrade Pro is completed with a live paper-trading demo; JobFit AI is
  completed and its public homepage is available, but its analysis endpoint
  returned 401 without a session at the last check; the required account flow
  and anonymous scoring remain unverified. RAG Document Q&A is a completed
  local application with public deployment pending; MarginPilot is in
  development with a private build.
- Flagship order is defined by the `index` field: RAG Document Q&A, JobFit AI,
  NexusTrade Pro, MarginPilot. Project information stays on the homepage;
  previous project-detail URLs redirect to the work section.
- Links are only rendered from data. No fabricated demo or repository URLs.
- NexusTrade Pro's walkthrough uses `public/videos/nexustrade-walkthrough.mp4`
  with `public/images/nexustrade-preview.webp` as its poster. The player is
  `preload="none"` with native controls and only downloads the video after the
  user starts playback.
- Codolog is listed as a Software Developer Intern (Feb–Jun 2026), not full-time.
- Projects are milestones, not employment. No scores, certifications or
  responsibilities are invented.

### Resume

`public/Anshu-Saini-Resume.pdf` is the genuine one-page resume. `/resume` is the
print-friendly page built from the same data. Both are linked from the header
menu, command palette, contact section and footer.

## Writing (blog)

Articles live in `src/content/blog/`, one `.mdx` file per post. Nothing is
invented at build time: if the folder contains no published post, `/blog`
shows an empty state, Blog is omitted from site navigation, the homepage
`LATEST WRITING` section is omitted, the RSS feed is empty, and `/blog` is
excluded from the sitemap.

### Publishing a post

1. Duplicate `src/content/blog/writing-template.mdx` under a new filename,
   e.g. `src/content/blog/building-a-rag-pipeline.mdx`.
2. Fill the front matter:

   ```yaml
   ---
   title: "Building a retrieval-augmented pipeline"
   description: "One or two sentences used on the listing, article header and feed."
   date: "2026-11-24"          # publication date, YYYY-MM-DD
   slug: "building-a-rag-pipeline"  # optional; defaults to the filename
   tags: ["Applied AI", "RAG"]
   published: true             # false keeps the file completely private
   coverImage: "/images/example.webp"  # optional, path under public/
   ---
   ```

3. Write the body in Markdown/MDX. Supported: headings (H2/H3, auto IDs and a
   table of contents when there are 3+), paragraphs, lists, links, blockquotes,
   tables (GFM), horizontal rules, images and fenced code blocks with syntax
   highlighting. Article URLs are `/blog/<slug>`.
4. Run `npm run build` (or deploy) — the listing, homepage section, sitemap,
   RSS feed and article route all read from the same files. Reading time is
   computed automatically at ~200 words per minute.

### Drafts and ordering

- Only posts with `published: true` are listed, routable, sitemapped or
  included in `feed.xml`. A missing `title`, `description` or valid `date`
  also keeps a file private.
- Posts are sorted newest first by `date`.
- `writing-template.mdx` ships as an unpublished reference; keep a real post
  out of the repository until you are ready to publish it.

### Blog routes

| Route | Purpose |
| --- | --- |
| `/blog` | Editorial list of published posts |
| `/blog/[slug]` | Article with author avatar, tags, date, reading time, optional TOC, related posts and BlogPosting JSON-LD |
| `/feed.xml` | RSS 2.0 feed of published posts |
| `/sitemap.xml` | Home, resume and published blog URLs; `/blog` is included when posts exist |

Under Cache Components, `/blog` is prerendered at build; article pages render
on request and are cached for an hour. Because Cache Components streams a
shell before `notFound()` can run, status codes are decided in
`src/proxy.ts`: the Proxy matches `/blog/:slug` only, checks the slug against
the same published-post source, and rewrites missing or unpublished slugs to
the site's 404 route. That yields a real HTTP 404 with the standard
"OFF THE MAP." page and a `noindex` tag, while published articles keep
returning 200. Draft content is never rendered.

## Architecture notes

- **Server-first rendering.** Sections are server components. The only
  baseline client code is the header/menu triggers, copy-email button,
  scroll progress, a single reveal observer and a single pointer spotlight
  listener. The hero has no 3D scene.
- **Blog rendering.** Posts are read from disk with `gray-matter` and
  compiled on the server with `next-mdx-remote/rsc`; no MDX runtime ships to
  the browser. The compiled article is wrapped in a cached function
  (`getRenderedPost`) so repeat requests reuse it for an hour.
- **Blog 404 status.** `src/proxy.ts` runs only for `/blog/:slug`. It checks
  the slug against the published posts before routing, so unknown and
  unpublished articles return a real 404 instead of a streamed 200. The build
  traces the MDX folder into the Proxy bundle.
- **Project filtering** is CSS-only (`:has()` + radio inputs), so it works
  without JavaScript and remains keyboard operable. Counts are derived from
  the project data.
- **Animations** respect `prefers-reduced-motion`; non-essential motion is
  disabled below 768px.
- **Security headers** (`X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`) are set in `next.config.ts`.

## Validation (measured 2026-11-21, V1.2 stable baseline)

Production build (`npm run build`) served with `npx next start -p 3100`.
Lighthouse, Chrome headless, mobile simulation unless noted.

| Page | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| `/` | 96 | 100 | 100 | 100 |
| `/resume` | 99 | 100 | 100 | 100 |
| `/` (desktop preset) | 100 | 100 | 100 | 100 |

Home page metrics (mobile): LCP 0.9 s, TBT 210 ms, CLS 0.

Additional checks executed:

- `npm run build`, `npm run lint`, `npx tsc --noEmit` — clean.
- axe-core (WCAG 2.1 A/AA + best practice) on home and resume — 0 violations.
- Flagship order confirmed: RAG Document Q&A, JobFit AI, NexusTrade Pro,
  MarginPilot on the homepage.
- Project status labels and plain-language summaries appear on the homepage cards.
- Work filter: 04 → 02 (Applied AI) → 01 (Product Engineering) → 01
  (Financial Technology), mouse and keyboard.
- Command palette: Ctrl/Cmd+K opens, filters, Enter navigates, Esc closes;
  includes LinkedIn and the resume PDF download.
- Mobile menu opens/closes with LinkedIn and Resume PDF entries.
- Copy email writes `ash911672@gmail.com` and shows "Copied to clipboard".
- No horizontal overflow at 360/390/768/1024/1366/1440/1920 px.
- No console errors or failed requests on audited routes.
- Main pages return HTTP 200 with correct titles, H1s and canonicals. Previous
  project-detail URLs redirect to `/#work`.
- Resume content verified in the DOM: education, degree, specialization,
  dates, Codolog internship, LinkedIn — no phone number.
- `Anshu-Saini-Resume.pdf` served as `application/pdf` (143,663 bytes) with
  `download` attributes.
- External links verified 2026-11-21: NexusTrade frontend and backend respond;
  JobFit frontend responds, API `/health` and `/docs` respond, `/api/analyze`
  returns 401 without a session; RAG repository responds 200.
- NexusTrade walkthrough assets return 200 (`video/mp4`, `image/webp`; byte
  ranges supported). The recording is shown in a wide homepage card.

Scores vary by run and machine; rerun Lighthouse yourself to confirm.

### Blog integration checks (2026-11-24, local production build)

- `npm run build`, `npm run lint`, `npx tsc --noEmit` — clean, with zero
  published posts and with temporary published fixtures.
- With two temporary fixtures: listing order, tags, dates and reading times;
  article H1, metadata, canonical, Open Graph article tags and BlogPosting
  JSON-LD; heading IDs, TOC anchors, GFM table, highlighted code block,
  blockquote and related posts; RSS ordering and escaping; sitemap entries.
- Draft visibility: the unpublished template never appears in `/blog`, the
  homepage, `feed.xml` or `sitemap.xml`. Its URL and unknown slugs return a
  real HTTP 404 (verified with `curl`), render the site's "OFF THE MAP." page
  with `noindex`, and expose no draft content.
- Status codes: `/blog`, `/feed.xml`, `/sitemap.xml`, `/resume`, the homepage,
  and published articles return 200; previous project-detail URLs redirect to
  `/#work`; unpublished and unknown article slugs return 404 (not 200).
- Empty state: `/blog` renders "No published notes yet.", the homepage
  `LATEST WRITING` section is absent, and the feed contains zero items.
- Responsive: no horizontal overflow at 360/390/768/1440 across 10 routes,
  including the 404 page; long code lines and tables scroll inside their own
  containers; TOC hidden below `lg`.
- Accessibility: axe-core 0 violations on the listing (empty and populated),
  an article and the 404 page; skip link is the first tab stop; scrollable
  code blocks and tables are keyboard focusable.
- Profile images: `public/images/anshu-profile.webp` remains the original
  1151×1438 photograph. `public/images/anshu-avatar.webp` is a 640×640
  head-and-shoulders crop derived from it; it renders at 68×68 (mobile) and
  84×84 (desktop) in the hero and 40×40 on articles, circular, unfiltered,
  `object-fit: cover`, never enlarged.
- `/resume` and all homepage project cards load; no unexpected console errors
  or failed subresource requests.

Fixtures were deleted after validation, so the repository ships with the
empty state.

## Deployment status

This version has **not been deployed**. No DNS, hosting, or production backend
changes were made. `vercel.json` remains, and canonical URLs, sitemap, robots
and Open Graph metadata still point to `https://anshu.buzz` for whichever
environment you eventually publish.

Two project links are external deployments that were verified during the audit:

- NexusTrade Pro — `https://trading-algo-oa9r.vercel.app` (live, paper trading only)
- JobFit AI — `https://jobfit-ai-steel.vercel.app` (public homepage available;
  analysis returned 401 without a session at last check; account flow unverified)

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, **Add New → Project** and import the repo.
3. Framework preset is detected as Next.js. No environment variables are
   required. Build command `next build`, output handled automatically.
4. Deploy. `vercel.json` pins the framework.

## Custom domain: anshu.buzz

Canonical URLs, sitemap, robots and Open Graph metadata already point to
`https://anshu.buzz`.

1. In the Vercel project, open **Settings → Domains** and add
   `anshu.buzz` (and `www.anshu.buzz` if desired).
2. At your registrar, either:
   - point the nameservers to Vercel's (`ns1.vercel-dns.com`,
     `ns2.vercel-dns.com`), or
   - add the DNS records Vercel shows for the project (typically an `A` record
     for the apex and a `CNAME` for `www`).
3. Wait for DNS propagation and for Vercel to issue the TLS certificate.
   Use the exact record values Vercel displays, not values copied from docs.
4. Set the preferred domain (apex or `www`) and confirm HTTPS redirects.

## Project layout

```
src/
  app/            routes, metadata, sitemap, robots, 404, resume, blog, feed, OG image
  components/
    animations/   reveal observer, pointer spotlight
    blog/         MDX component mapping
    contributions/ GitHub activity graph
    layout/       footer, scroll progress
    navigation/   header, mobile menu, command palette
    projects/     project cards and visual previews
    sections/     hero, work, latest writing, about, expertise, experience, contact
    ui/           button, availability, section heading, copy email
  content/blog/   published articles and drafts (MDX)
  data/           profile, projects, additional-projects, skills, experience, education
  hooks/          modal focus management
  lib/            navigation, blog loading/rendering, github contributions, utilities
  proxy.ts        real 404 status for unpublished and unknown blog slugs
```

## License

Personal project. All content and design belong to Anshu.
