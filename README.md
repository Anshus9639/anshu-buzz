# ANSHU — anshu.buzz

Personal portfolio of Anshu Saini — Entry-Level Applied AI / Generative AI Engineer.
AI Engineer · Python Developer · Software Builder.

Underground luxury × dark minimalism × futuristic editorial design. Built with
Next.js App Router, TypeScript, Tailwind CSS 4, and a lazy-loaded Three.js chrome
sculpture.

## Stack

- Next.js 16.4 (App Router, Turbopack, Cache Components)
- React 19.3 + TypeScript
- Tailwind CSS 4 (design tokens in `src/app/globals.css`)
- Three.js + React Three Fiber + Drei (hero sculpture, desktop only)
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
| `src/data/projects.ts` | Four flagship projects: categories, completion, demo availability, timeline, stack, case-study sections, evaluation, milestones, deployment plan, walkthrough media, links |
| `src/data/additional-projects.ts` | Additional work / experiments (Recipe Intelligence Chatbot, Legal Document Analysis) |
| `src/data/skills.ts` | Five expertise categories |
| `src/data/experience.ts` | Codolog internship timeline |
| `src/data/education.ts` | Pillai College B.Tech IT entry |
| `src/lib/navigation.ts` | Header links and section order |

### Content rules

- The public UI intentionally excludes the personal mobile number. It remains
  only in the downloadable PDF resume.
- Completion and demo availability are separate fields. Current state:
  NexusTrade Pro is completed with a live paper-trading demo; JobFit AI is
  completed and deployed, but analysis requires a Supabase sign-in, so
  anonymous end-to-end scoring was not verified; RAG Document Q&A is a
  completed local application with public deployment pending; MarginPilot is
  in development with a private build.
- Flagship order is defined by the `index` field: NexusTrade Pro, JobFit AI,
  RAG Document Q&A, MarginPilot. Next-case links follow the same order.
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

## Architecture notes

- **Server-first rendering.** Sections are server components. The only
  baseline client code is the header/menu triggers, copy-email button,
  scroll progress, a single reveal observer and a single pointer spotlight
  listener.
- **3D loading.** `ChromeStage` waits for the first user interaction
  (`pointermove`, `scroll`, or `keydown`) before loading R3F, then defers the
  import to idle time. It only runs on `min-width: 1024px` with a fine
  pointer, and falls back to a static CSS chrome composition for reduced
  motion, data-saver, small screens, missing WebGL, or a render error.
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
| `/projects/jobfit-ai` | 100 | 100 | 100 | 100 |
| `/resume` | 99 | 100 | 100 | 100 |
| `/` (desktop preset) | 100 | 100 | 100 | 100 |

Home page metrics (mobile): LCP 0.9 s, TBT 210 ms, CLS 0.

Additional checks executed:

- `npm run build`, `npm run lint`, `npx tsc --noEmit` — clean.
- axe-core (WCAG 2.1 A/AA + best practice) on home, all four project pages and
  resume — 0 violations.
- Flagship order confirmed: NexusTrade Pro, JobFit AI, RAG Document Q&A,
  MarginPilot. Next-case chain: 01 → 02 → 03 → 04 → 01.
- Completion and demo labels confirmed on cards and case-study sidebars.
- Work filter: 04 → 02 (Applied AI) → 01 (Product Engineering) → 01
  (Financial Technology), mouse and keyboard.
- Command palette: Ctrl/Cmd+K opens, filters, Enter navigates, Esc closes;
  includes LinkedIn and the resume PDF download.
- Mobile menu opens/closes with LinkedIn and Resume PDF entries.
- Copy email writes `ash911672@gmail.com` and shows "Copied to clipboard".
- No horizontal overflow at 360/390/768/1024/1366/1440/1920 px.
- No console errors or failed requests on audited routes.
- All routes return HTTP 200 with correct titles, H1s and canonicals.
- Resume content verified in the DOM: education, degree, specialization,
  dates, Codolog internship, LinkedIn — no phone number.
- `Anshu-Saini-Resume.pdf` served as `application/pdf` (143,663 bytes) with
  `download` attributes.
- External links verified 2026-11-21: NexusTrade frontend and backend respond;
  JobFit frontend responds, API `/health` and `/docs` respond, `/api/analyze`
  returns 401 without a session; RAG repository responds 200.
- NexusTrade walkthrough assets return 200 (`video/mp4`, `image/webp`; byte
  ranges supported). No video request is made before playback, and playback
  advances normally. The "Watch product walkthrough" CTA scrolls to the player.
  The homepage loads no video or poster assets.

Scores vary by run and machine; rerun Lighthouse yourself to confirm.

## Deployment status

This version has **not been deployed**. No DNS, hosting, or production backend
changes were made. `vercel.json` remains, and canonical URLs, sitemap, robots
and Open Graph metadata still point to `https://anshu.buzz` for whichever
environment you eventually publish.

Two project links are external deployments that were verified during the audit:

- NexusTrade Pro — `https://trading-algo-oa9r.vercel.app` (live, paper trading only)
- JobFit AI — `https://jobfit-ai-steel.vercel.app` (frontend and API online;
  analysis requires sign-in)

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
  app/            routes, metadata, sitemap, robots, 404, resume, OG image
  components/
    animations/   reveal observer, pointer spotlight
    layout/       footer, scroll progress
    navigation/   header, mobile menu, command palette
    projects/     project card, detail layout, visual
    sections/     hero, ticker, work, about, expertise, experience, contact
    three/        chrome stage, scene, error boundary
    ui/           button, availability, section heading, copy email
  data/           profile, projects, additional-projects, skills, experience, education
  hooks/          modal focus management
  lib/            navigation, utilities
```

## License

Personal project. All content and design belong to Anshu.
