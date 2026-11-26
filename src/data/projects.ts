export type ProjectCategory =
  | "Applied AI"
  | "Product Engineering"
  | "Financial Technology";

export type ProjectStatusTone = "live" | "pending" | "development" | "offline";

export type ProjectCompletion = {
  label: "Completed" | "In development";
  detail: string;
};

export type ProjectDemo = {
  label: string;
  tone: ProjectStatusTone;
  detail: string;
};

export type ProjectLinks = {
  github?: string;
  sourceLabel?: string;
  live?: string;
  liveLabel?: string;
  liveNote?: string;
  demoPending?: boolean;
  sourceNote?: string;
};

export type ProjectWalkthrough = {
  video: string;
  poster: string;
  label: string;
  title: string;
  duration: string;
  note: string;
};

export type ProjectLivePreview = {
  url: string;
  poster: string;
  label: string;
  note?: string;
};

export type ProjectPreviewMeta = {
  label: string;
  note?: string;
};

export type ProjectEvaluation = {
  title?: string;
  intro: string;
  metrics: { label: string; value: string }[];
  notes: string[];
  caveat?: string;
};

export type ProjectMilestone = {
  label: string;
  state: "implemented" | "in-development" | "planned";
  detail: string;
};

export type ProjectDiagram = {
  title: string;
  rows: { label: string; steps: string[] }[];
  caption: string;
};

export type ProjectDeployment = {
  intro: string;
  requirements: string[];
  limits: string[];
  security: string[];
  plan: string[];
};

export type Project = {
  id: string;
  slug: string;
  index: string;
  title: string;
  category: ProjectCategory;
  completion: ProjectCompletion;
  demo: ProjectDemo;
  timeline: string;
  role: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  problem: string;
  approach: string[];
  contribution: string;
  features: string[];
  architecture: { title: string; detail: string }[];
  challenges: { title: string; detail: string }[];
  card: {
    problem: string;
    approach: string;
    contribution: string;
  };
  evaluation?: ProjectEvaluation;
  milestones?: ProjectMilestone[];
  diagram?: ProjectDiagram;
  deployment?: ProjectDeployment;
  walkthrough?: ProjectWalkthrough;
  livePreview?: ProjectLivePreview;
  preview?: ProjectPreviewMeta;
  links: ProjectLinks;
  featured: boolean;
  caseStudyLabel: string;
  screenshots: { src: string; alt: string }[];
};

const projectData: Project[] = [
  {
    id: "rag-document-qa",
    slug: "rag-doc-qa",
    index: "01",
    title: "RAG Document Q&A",
    category: "Applied AI",
    completion: {
      label: "Completed",
      detail:
        "The local application is complete end to end: ingestion, retrieval, citations, safeguards and evaluation.",
    },
    demo: {
      label: "Runs locally",
      tone: "pending",
      detail:
        "Runs fully locally with Ollama. No public deployment has been tested yet.",
    },
    timeline: "Sep 2026 – Oct 2026",
    role: "Independent project — retrieval & LLM engineering",
    shortDescription:
      "Ask questions about PDFs and text files, then see the page or section behind each answer.",
    fullDescription:
      "RAG Document Q&A is a multi-document retrieval system built around one idea: an answer is only worth showing if it can be traced back to a source. PDFs and text files are chunked by heading, embedded with Sentence Transformers and stored in a persistent FAISS index. Each question is routed through deterministic retrievers before semantic search, the retrieved excerpts are numbered, and a local Ollama model answers from those excerpts alone. Citations are assembled from stored metadata, numeric claims are checked against the retrieved text, and the system refuses rather than guesses when evidence is missing.",
    technologies: [
      "Python",
      "Streamlit",
      "Sentence Transformers",
      "all-MiniLM-L6-v2",
      "FAISS",
      "Ollama",
      "qwen2.5:3b",
      "pypdf",
      "python-docx",
      "pytest",
      "GitHub Actions",
    ],
    problem:
      "A language model cannot ground an answer in a document it has never seen, and a plausible answer without a source is worse than no answer at all. The project sets out to build document question-answering that is local, citation-backed and honest about what it does not know.",
    approach: [
      "Load PDF and TXT documents with page-level metadata.",
      "Chunk by heading at 800 characters with 150 characters of overlap, never spanning two headings.",
      "Embed chunks with all-MiniLM-L6-v2 and persist the 384-dimensional vectors in a FAISS index on disk.",
      "Resolve each question through heading, clause-number, keyword and semantic retrieval routes in order.",
      "Generate from numbered excerpts with Ollama, then verify citations and numeric claims before returning an answer.",
    ],
    contribution:
      "Built the full system end to end: loaders, heading-aware chunking, embedding and persistent indexing, the four retrieval routes, grounded prompting, metadata-built citations, refusal and numeric safeguards, the Streamlit and terminal interfaces, the evaluation harness, 18 pytest tests and the GitHub Actions workflow.",
    features: [
      "Multi-document library with page- and section-aware chunks",
      "Four retrieval routes: heading, clause number, keyword and semantic",
      "Persistent FAISS index so each document is embedded once",
      "Grounded answers with file, page and section citations",
      "Minimum-similarity threshold with an explicit refusal path",
      "Numeric safeguard that withholds figures absent from the retrieved text",
      "Fully local index and generation — no API keys or cloud services",
      "Streamlit web app and a terminal chat interface",
      "18 pytest tests with mocked model responses and GitHub Actions CI",
    ],
    architecture: [
      {
        title: "Ingestion",
        detail:
          "pypdf and python-docx loaders extract text with file and page metadata. The heading-aware chunker splits at 800 characters with 150 characters of overlap and never lets a chunk span two headings.",
      },
      {
        title: "Indexing",
        detail:
          "all-MiniLM-L6-v2 produces 384-dimensional embeddings. Normalised vectors are written to a FAISS exact inner-product index that persists on disk, so documents are embedded once and reused.",
      },
      {
        title: "Retrieval",
        detail:
          "Named headings, clause or section numbers, keyword overlap and semantic top-k are tried in sequence. Semantic results must clear a configured MIN_SCORE before they are allowed into the context.",
      },
      {
        title: "Generation",
        detail:
          "qwen2.5:3b runs through Ollama on the local machine. It receives numbered excerpts and is instructed to answer from those excerpts only.",
      },
      {
        title: "Verification",
        detail:
          "Citations are assembled from stored chunk metadata rather than model claims. A numeric check withholds figures that do not appear in the retrieved sources; when evidence fails the threshold, the system refuses.",
      },
    ],
    challenges: [
      {
        title: "Retrieval quality",
        detail:
          "The generator is only as good as the context it receives. A minimum similarity threshold is the last line of defence before the model is called at all.",
      },
      {
        title: "Citations from metadata",
        detail:
          "Citation lists are assembled from stored file, page and section data rather than trusting the model to report its own sources.",
      },
      {
        title: "Numeric hallucination",
        detail:
          "A heuristic check withholds answers containing digits that appear nowhere in the retrieved text. It is deliberately conservative, and the repository documents where it can still fail.",
      },
      {
        title: "Chunk boundaries",
        detail:
          "Chunks never span two headings. Keeping section structure intact matters more than filling a fixed character budget.",
      },
    ],
    card: {
      problem: "An answer is only useful if it can be traced to a source.",
      approach: "Heading-aware chunks, four retrieval routes and a local model.",
      contribution:
        "Pipeline, retrieval, citations, refusal checks and evaluation.",
    },
    evaluation: {
      intro:
        "The repository ships an evaluation harness and a pytest suite. The figures below are what the current regression sets cover, not a benchmark result.",
      metrics: [
        { label: "Retrieval checks", value: "12" },
        { label: "Answer checks", value: "6" },
        { label: "pytest tests", value: "18" },
        { label: "Retrieval routes", value: "4" },
      ],
      notes: [
        "Retrieval checks cover heading lookup, clause numbers, keyword overlap and semantic fallback.",
        "Answer checks cover citation presence, correctness against the source text, refusal behaviour and the numeric guard.",
        "In the current set, no correct hit was decided solely by the semantic route — the deterministic routes resolved those cases.",
        "The GitHub Actions workflow was last observed passing on 27 October 2026.",
      ],
      caveat:
        "Both sets are small and curated. They are a regression signal for changes, not a claim of general retrieval quality.",
    },
    diagram: {
      title: "System architecture",
      rows: [
        {
          label: "Indexing",
          steps: [
            "PDF / TXT",
            "Loaders + metadata",
            "Heading-aware chunks 800 / 150",
            "MiniLM embeddings (384-d)",
            "FAISS index on disk",
          ],
        },
        {
          label: "Query",
          steps: [
            "Question",
            "Heading · clause · keyword · semantic routes",
            "MIN_SCORE gate",
            "Numbered excerpts",
            "Ollama qwen2.5:3b",
            "Answer + metadata citations",
          ],
        },
      ],
      caption:
        "Indexing happens once per document. Each query resolves through deterministic routes first and only reaches the model with evidence that passed the similarity gate.",
    },
    deployment: {
      intro:
        "The project is local-only today. It is not marked live, and no public deployment has been tested. The plan below describes the architecture required to host it without weakening its local-first guarantees.",
      requirements: [
        "Linux VM with at least 2 vCPUs and 8 GB RAM; qwen2.5:3b needs roughly 4–6 GB once loaded.",
        "Ollama bound to localhost and reachable only by the application service, never exposed publicly.",
        "Private document storage with per-session isolation and a curated demo corpus for public visitors.",
        "Reverse proxy with TLS in front of the Streamlit app and the API.",
      ],
      limits: [
        "Upload limit of 10 MB per file and a maximum of 3 files per session.",
        "Request timeout and a cap on pages per document.",
        "Per-IP rate limiting on upload and question endpoints.",
      ],
      security: [
        "No model or service credentials in client code — the browser only talks to the app service.",
        "Files isolated by session ID with no cross-session retrieval.",
        "No public access to the FAISS index or the Ollama port.",
        "Uploaded demo files deleted on a fixed retention schedule.",
      ],
      plan: [
        "Containerise the app and run Ollama as a separate local service.",
        "Add session-scoped uploads, quotas and retention cleanup.",
        "Put the reverse proxy, TLS and rate limiting in place.",
        "Run the evaluation harness against the deployed instance before changing the status to live.",
      ],
    },
    preview: {
      label: "Architecture study",
    },
    links: {
      github: "https://github.com/Anshus9639/rag-doc-qa-bot",
      demoPending: true,
    },
    featured: true,
    caseStudyLabel: "Read case study",
    screenshots: [],
  },
  {
    id: "nexustrade-pro",
    slug: "nexustrade-pro",
    index: "03",
    title: "NexusTrade Pro",
    category: "Financial Technology",
    completion: {
      label: "Completed",
      detail:
        "The full-stack build is finished and running in paper-trading mode.",
    },
    demo: {
      label: "Live demo",
      tone: "live",
      detail:
        "Deployed demo running on simulated balances. No real orders or brokerage credentials are used.",
    },
    timeline: "Apr 2026 – Nov 2026",
    role: "Full-stack engineer — frontend, backend and realtime market data",
    shortDescription:
      "Practice trading with live prices, simulated money, and an AI helper for ideas you can review before placing.",
    fullDescription:
      "NexusTrade Pro simulates the mechanics of a trading platform without touching real money. Binance's public WebSocket feed drives prices, while an Express and MongoDB backend handles authentication, escrowed balances and a matcher that checks resting limit orders every three seconds. The React client renders live charts with Lightweight Charts and receives updates over Socket.IO. A Gemini-powered copilot turns a natural-language request into a structured trade proposal that the user must review and submit — it never places an order on its own.",
    technologies: [
      "React",
      "Express",
      "MongoDB",
      "Mongoose",
      "Socket.IO",
      "JWT",
      "bcrypt",
      "Binance WebSocket API",
      "Lightweight Charts",
      "Gemini API",
    ],
    problem:
      "Trading interfaces hide a lot of state: balances, escrow, order status and fills all move independently. Building a realistic simulator means modelling that state honestly while keeping execution clearly separate from real money.",
    approach: [
      "Stream public Binance market data into the backend over WebSocket.",
      "Model users, balances, orders and positions in MongoDB with Mongoose.",
      "Escrow funds when an order is placed and run a limit-order matcher every three seconds.",
      "Keep order submission idempotent with a client-generated order ID.",
      "Expose an AI copilot that returns a reviewable proposal rather than executing trades.",
    ],
    contribution:
      "Built the product across the stack: React interface and charting, Express API, MongoDB models, JWT authentication, the escrow and limit-order matching flow, Socket.IO updates and the Gemini copilot proposal path. The deployment runs in paper-trading mode only.",
    features: [
      "Live market prices from the public Binance WebSocket feed",
      "Market and limit orders with simulated balances and escrow",
      "Limit-order matcher that runs every three seconds",
      "Idempotent order submission via clientOrderId",
      "JWT authentication with bcrypt password hashing and rate limiting",
      "Realtime order and price updates over Socket.IO",
      "Lightweight Charts price visualisation",
      "Gemini copilot that proposes structured trades for user review",
    ],
    architecture: [
      {
        title: "Market data",
        detail:
          "A backend service subscribes to Binance's public WebSocket stream, normalises price updates and broadcasts them to connected clients.",
      },
      {
        title: "Trading core",
        detail:
          "Express routes handle authentication and order placement. Balances are escrowed on submission and the matcher checks resting limit orders on a three-second cycle, writing order and position state to MongoDB.",
      },
      {
        title: "Realtime client",
        detail:
          "The React frontend receives price and order events over Socket.IO and renders charts with Lightweight Charts. Session state is carried by a JWT.",
      },
      {
        title: "AI copilot",
        detail:
          "Gemini parses a natural-language trade request into a structured proposal. The proposal is returned to the user for review and is never executed automatically.",
      },
    ],
    challenges: [
      {
        title: "Order state consistency",
        detail:
          "Escrow, submission and matching touch the same balances. Idempotent order identifiers and a single matcher cycle keep the simulated ledger from double-spending.",
      },
      {
        title: "Realtime market data",
        detail:
          "The feed is external and long-lived. Reconnects, message normalisation and fan-out to socket clients all have to be handled without stalling the API.",
      },
      {
        title: "A safe AI boundary",
        detail:
          "The copilot is useful only if its output remains a proposal. Trade execution stays entirely in the user's hands, and no API key is exposed to the client.",
      },
    ],
    card: {
      problem: "Trading state is hard to model honestly without real money.",
      approach:
        "Live market data, escrowed paper orders and a 3-second matcher.",
      contribution:
        "Full-stack build, order lifecycle and the AI proposal path.",
    },
    evaluation: {
      title: "Verification",
      intro:
        "The public deployment was checked directly on 21 November 2026. No accounts were created and no orders were placed during verification.",
      metrics: [
        { label: "Frontend", value: "200 OK" },
        { label: "Backend API", value: "200 OK" },
        { label: "Execution", value: "Paper only" },
      ],
      notes: [
        "The frontend and the deployed backend both responded successfully at the time of this update.",
        "Market-history endpoints responded with data.",
        "All balances, fills and positions are simulated; no exchange API keys are used for trading.",
      ],
      caveat:
        "The deployed backend predates the health endpoints added locally. No automated test suite has been verified for this project.",
    },
    diagram: {
      title: "Order flow",
      rows: [
        {
          label: "Market data",
          steps: [
            "Binance public WebSocket",
            "Market feed service",
            "Price updates",
          ],
        },
        {
          label: "Simulated execution",
          steps: [
            "Order request",
            "Balance escrow",
            "Limit-order matcher (3 s)",
            "MongoDB order state",
            "Socket.IO update",
          ],
        },
        {
          label: "Client",
          steps: ["React", "Lightweight Charts", "AI proposal review"],
        },
      ],
      caption:
        "Every order stays inside the simulator: balances are escrowed in the database and fills are generated by the matcher, never sent to an exchange.",
    },
    walkthrough: {
      video: "/videos/nexustrade-walkthrough.mp4",
      poster: "/images/nexustrade-preview.webp",
      label: "Recorded product preview",
      title: "NexusTrade Pro product walkthrough",
      duration: "01:41",
      note:
        "A screen-recorded walkthrough of the deployed application. Everything shown runs in a paper-trading environment with simulated balances — no real orders or brokerage credentials are used.",
    },
    links: {
      github: "https://github.com/Anshus9639/TRADING-ALGO",
      sourceLabel: "View source code",
      live: "https://trading-algo-oa9r.vercel.app",
      liveLabel: "Try demo",
      liveNote:
        "Practice trades only—no real money is involved.",
    },
    featured: true,
    caseStudyLabel: "Open case study",
    screenshots: [],
  },
  {
    id: "jobfit-ai",
    slug: "jobfit-ai",
    index: "02",
    title: "JobFit AI",
    category: "Applied AI",
    completion: {
      label: "Completed",
      detail:
        "The frontend, analysis API and weighted scoring flow are implemented.",
    },
    demo: {
      label: "Homepage live",
      tone: "pending",
      detail:
        "The public homepage is available. The analysis endpoint returned 401 without a session at its last check, so anonymous scoring was not verified and the required account flow is unconfirmed.",
    },
    timeline: "2026",
    role: "Independent project — NLP and full-stack engineering",
    shortDescription:
      "Compare your resume with a job post to find matching skills, spot gaps, and see what to improve.",
    fullDescription:
      "JobFit AI compares a PDF resume against a job description and explains the result instead of returning a single opaque number. PyMuPDF extracts resume text, Sentence Transformers measure semantic similarity, a skill matcher identifies explicit overlaps and gaps, and an ATS-style heuristic checks structure and readability. The three signals combine into a weighted score. The source implementation is designed to process documents in memory without storing resumes. The public homepage is available, but the analysis endpoint returned 401 without a session at its last check; the deployed account requirement and anonymous scoring flow remain unverified.",
    technologies: [
      "Python",
      "FastAPI",
      "Next.js",
      "PyMuPDF",
      "Sentence Transformers",
      "scikit-learn",
    ],
    problem:
      "Keyword matching misses transferable experience, while embedding similarity alone cannot explain which skills are missing. Job seekers need both a signal and a reason.",
    approach: [
      "Extract text from a PDF resume with PyMuPDF.",
      "Embed the resume and the job description and measure semantic similarity.",
      "Match explicit skills between the two documents and surface gaps.",
      "Run an ATS-style structural heuristic over the resume text.",
      "Combine semantic, skill and readiness signals into a weighted score (40 / 40 / 20).",
    ],
    contribution:
      "Built the FastAPI analysis service, the Next.js client, the scoring model, the skill extraction and matching logic, and the ATS-style heuristic. Added input limits and stateless processing so no resume data is stored.",
    features: [
      "PDF resume upload with a 5 MB limit",
      "Job descriptions up to 20,000 characters",
      "Semantic similarity with Sentence Transformers",
      "Explicit skill matching with visible gaps",
      "ATS-style structural heuristic — not an official ATS score",
      "Weighted score: 40% semantic, 40% skills, 20% readiness",
      "In-memory document processing with no resume storage in the source implementation",
      "The deployed analysis endpoint returned 401 without a session at its last check",
      "No paid model APIs",
    ],
    architecture: [
      {
        title: "Client",
        detail:
          "A Next.js interface collects the resume PDF and job description, then renders the score breakdown and the matched and missing skills.",
      },
      {
        title: "Analysis service",
        detail:
          "FastAPI validates the upload, extracts text with PyMuPDF and prepares both documents for comparison.",
      },
      {
        title: "Scoring",
        detail:
          "Sentence Transformers produce the semantic score, a skill matcher produces explicit overlap, and an ATS-style heuristic produces the readiness score. The weighted result is returned with its components.",
      },
    ],
    challenges: [
      {
        title: "Explaining a score",
        detail:
          "One opaque number is not actionable. The result is returned with its semantic, skill and readiness components so the candidate can see what moved it.",
      },
      {
        title: "Hard input limits",
        detail:
          "Resumes are capped at 5 MB and job descriptions at 20,000 characters, which keeps extraction and embedding predictable on a small deployment.",
      },
      {
        title: "Privacy and deployed access",
        detail:
          "The source implementation processes documents in memory without resume storage. The deployed analysis endpoint returned 401 without a session during its last check, so its required account flow still needs verification.",
      },
    ],
    card: {
      problem: "A single match score explains nothing about why.",
      approach:
        "Semantic similarity, skill overlap and a structure check, weighted.",
      contribution:
        "Analysis API, scoring model and the full client experience.",
    },
    evaluation: {
      title: "Verification",
      intro:
        "The deployment was checked directly on 21 November 2026. No account was created.",
      metrics: [
        { label: "Frontend", value: "200 OK" },
        { label: "Analysis API", value: "401 · no session" },
        { label: "Scoring weights", value: "40 / 40 / 20" },
      ],
      notes: [
        "The Next.js frontend responded successfully.",
        "The FastAPI service responded on /health, /docs and /openapi.json.",
        "/api/analyze returned 401 without a session; anonymous scoring was not verified, and the required account/session flow is unconfirmed.",
        "The ATS component is a heuristic readiness check, not an official applicant tracking system score.",
      ],
      caveat:
        "The deployed analysis endpoint returned 401 without a session. Anonymous scoring was not verified, and the required account/session flow is unconfirmed.",
    },
    diagram: {
      title: "Analysis flow",
      rows: [
        {
          label: "Input",
          steps: ["Resume PDF", "PyMuPDF extraction", "Job description"],
        },
        {
          label: "Signals",
          steps: [
            "Semantic similarity",
            "Skill overlap",
            "ATS-style heuristic",
          ],
        },
        {
          label: "Result",
          steps: ["Weighted score 40 / 40 / 20", "Matched skills", "Gaps"],
        },
      ],
      caption:
        "Each signal is computed separately and returned with the final score so the candidate can see where the result comes from.",
    },
    livePreview: {
      url: "https://jobfit-ai-steel.vercel.app",
      poster: "/images/jobfit-homepage.webp",
      label: "Live homepage preview",
    },
    links: {
      live: "https://jobfit-ai-steel.vercel.app",
      liveLabel: "Visit homepage",
    },
    featured: true,
    caseStudyLabel: "Read case study",
    screenshots: [
      {
        src: "/images/jobfit-homepage.webp",
        alt: "JobFit AI homepage with a resume upload and job-description form.",
      },
    ],
  },
  {
    id: "marginpilot",
    slug: "marginpilot",
    index: "04",
    title: "MarginPilot",
    category: "Product Engineering",
    completion: {
      label: "In development",
      detail:
        "Milestones M0–M3 are implemented; the reconciliation engine is the next milestone.",
    },
    demo: {
      label: "In development",
      tone: "development",
      detail: "Private project currently in development.",
    },
    timeline: "2026 — present",
    role: "Founder & engineer — product, architecture and implementation",
    shortDescription:
      "A tool in development to help online sellers track marketplace fees, understand payouts, and see how they affect profit.",
    fullDescription:
      "MarginPilot is a product I am building for marketplace sellers who need to understand fees, payouts and discrepancies across sources. The work so far is the foundation: a Next.js workspace behind nginx, a FastAPI service layer and a PostgreSQL core with row-level security, a non-owner runtime role and append-only audit logging. Financial values use Decimal end to end. Reconciliation logic, marketplace integrations and commercial features are explicitly staged rather than presented as finished.",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Next.js",
      "React",
      "SQLAlchemy",
      "Alembic",
      "nginx",
      "pytest",
      "Vitest",
    ],
    problem:
      "Marketplace sellers reconcile fees, refunds, payouts and settlements across several sources. The data is relational, the discrepancies are hard to explain, and financial state cannot be quietly rewritten.",
    approach: [
      "Model marketplace financial entities in PostgreSQL with Decimal money types.",
      "Enforce tenant isolation with row-level security and a non-owner runtime role.",
      "Expose capabilities through database functions instead of broad table access.",
      "Record sensitive actions in an append-only audit log.",
      "Build the reconciliation engine and integrations as staged milestones, not assumptions.",
    ],
    contribution:
      "Solo founder and engineer across product definition, architecture, data model, backend and frontend. The repository documents state, architecture, API specification, database schema, reconciliation rules and a milestone roadmap.",
    features: [
      "Next.js workspace over a FastAPI service, fronted by nginx",
      "PostgreSQL row-level security with a non-owner runtime role",
      "Capability functions for privileged operations",
      "Append-only audit logging for sensitive actions",
      "CSRF protection and persistent rate limiting",
      "Decimal monetary values throughout the data layer",
      "Alembic migrations for schema change control",
      "Reconciliation rules documented alongside the code",
    ],
    architecture: [
      {
        title: "Edge",
        detail:
          "nginx terminates requests and routes them to the Next.js workspace or the FastAPI API, keeping the database off the public network.",
      },
      {
        title: "Application",
        detail:
          "Next.js renders the workspace; FastAPI owns authentication context, request validation, capability checks and audit writes.",
      },
      {
        title: "Data",
        detail:
          "PostgreSQL stores financial records with row-level security. The application connects as a non-owner role whose access is limited to explicit capabilities.",
      },
    ],
    challenges: [
      {
        title: "Financial data modelling",
        detail:
          "Marketplace finance is relational by nature. Decimal money types and controlled migrations matter more than moving fast.",
      },
      {
        title: "Tenant isolation",
        detail:
          "Row-level security only helps if the runtime role is not the owner. Capability functions keep privileged operations explicit and auditable.",
      },
      {
        title: "Reconciliation clarity",
        detail:
          "The product has to make discrepancies understandable, not just detected. That logic is staged as its own milestone.",
      },
    ],
    card: {
      problem: "Marketplace money is relational and hard to reconcile.",
      approach:
        "A secured PostgreSQL core, auditable API and staged roadmap.",
      contribution:
        "Product, architecture, backend, data model and workspace.",
    },
    evaluation: {
      title: "Engineering checks",
      intro:
        "Results recorded in the private repository at the current milestone. They were not re-run during this portfolio update.",
      metrics: [
        { label: "pytest tests", value: "115" },
        { label: "Vitest tests", value: "14" },
        { label: "Ruff + mypy", value: "Clean" },
        { label: "Next.js build", value: "Passed" },
      ],
      notes: [
        "The backend suite covers authentication context, capabilities, audit writes and database constraints.",
        "The frontend suite covers workspace components and API-state handling.",
        "Continuous integration has not been verified from a remote runner.",
      ],
      caveat:
        "These figures come from repository records; the suite was not executed as part of this site update.",
    },
    milestones: [
      {
        label: "Platform shell (M0–M1)",
        state: "implemented",
        detail:
          "Next.js workspace, FastAPI service, nginx routing and the initial PostgreSQL schema.",
      },
      {
        label: "Data security (M2)",
        state: "implemented",
        detail:
          "Row-level security, a non-owner runtime role, capability functions and Decimal money types.",
      },
      {
        label: "Audit & request safety (M3)",
        state: "implemented",
        detail:
          "Append-only audit logging, CSRF protection, persistent rate limiting and Alembic migrations.",
      },
      {
        label: "Reconciliation engine (M4)",
        state: "in-development",
        detail:
          "Reconciliation rules are documented; the engine itself has not been implemented yet.",
      },
      {
        label: "Marketplace integrations (M5+)",
        state: "planned",
        detail:
          "Target contexts, not partnerships. No marketplace integration is implemented or claimed.",
      },
      {
        label: "Commercial features",
        state: "planned",
        detail:
          "Billing, onboarding and operational tooling. Defined on the roadmap, not built.",
      },
    ],
    preview: {
      label: "Designed preview · in development",
    },
    links: {},
    featured: true,
    caseStudyLabel: "Explore product",
    screenshots: [],
  },
];

export const projects: Project[] = [...projectData].sort(
  (a, b) => Number(a.index) - Number(b.index),
);

export const projectCategories: Array<"All" | ProjectCategory> = [
  "All",
  "Applied AI",
  "Product Engineering",
  "Financial Technology",
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
