export type ExperienceEntry = {
  period: string;
  role: string;
  organisation: string;
  location?: string;
  type: "Internship" | "Project";
  summary: string;
  points: string[];
  link?: {
    label: string;
    href: string;
  };
};

// Project entries are milestones, not employment. Dates are month-level only.
export const experience: ExperienceEntry[] = [
  {
    period: "Feb 2026 – Jun 2026",
    role: "Software Developer Intern",
    organisation: "Codolog",
    location: "Mumbai, India",
    type: "Internship",
    summary:
      "A software development internship focused on Python backend services and data-driven application workflows.",
    points: [
      "Developed RESTful APIs using Python, FastAPI and PostgreSQL for LMS data.",
      "Built Flask and React application workflows connecting backend services.",
      "Worked on structured-data processing and visualization.",
    ],
  },
  {
    period: "Aug 2025 – Oct 2025",
    role: "AI-Powered Legal Document Analysis",
    organisation: "Independent project",
    type: "Project",
    summary:
      "BERT-based legal clause classification and document analysis.",
    points: [
      "Fine-tuned a BERT-based transformer to classify legal clauses on a custom dataset.",
      "Reached approximately 79% classification accuracy.",
      "Built a pipeline for analyzing new legal text.",
    ],
  },
  {
    period: "Sep 2026 – Oct 2026",
    role: "RAG Document Q&A",
    organisation: "Independent project",
    type: "Project",
    summary:
      "Development of a local multi-document RAG application using FAISS, Sentence Transformers and Ollama.",
    points: [
      "Built a fully local system over PDF and TXT documents, with a persistent FAISS index and metadata-built citations.",
      "Implemented four retrieval routes and heading-aware chunking at 800 characters with 150-character overlap.",
      "Wrote 18 pytest tests with mocked LLM responses and GitHub Actions CI.",
    ],
    link: {
      label: "Open case study",
      href: "/projects/rag-doc-qa",
    },
  },
  {
    period: "Nov 2026",
    role: "Recipe Intelligence Chatbot",
    organisation: "Independent project",
    type: "Project",
    summary:
      "Development of a dataset-grounded conversational recipe assistant.",
    points: [
      "Built a conversational assistant over 122,938 usable recipes where facts are retrieved or computed, never generated.",
      "Applied hard constraints over the full dataset before TF-IDF ranking, with explainable ingredient matching.",
      "Validated with 12 scripted conversations, 25 turns and 57 programmatic checks.",
    ],
    link: {
      label: "View repository",
      href: "https://github.com/Anshus9639/recipe-chatbot",
    },
  },
];
