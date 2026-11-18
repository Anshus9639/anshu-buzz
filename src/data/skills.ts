export type SkillCategory = {
  index: string;
  title: string;
  summary: string;
  detail: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    index: "01",
    title: "Generative AI & NLP",
    summary: "Retrieval-grounded language systems.",
    detail:
      "RAG, LLM integration, grounded generation and hallucination mitigation — supported by semantic search, TF-IDF and transformer-based NLP.",
    skills: [
      "Retrieval-Augmented Generation (RAG)",
      "LLM Integration",
      "Ollama",
      "Gemini API",
      "Prompt Engineering",
      "Grounded Generation",
      "Hallucination Mitigation",
      "Sentence Transformers",
      "Semantic Search",
      "Hybrid Retrieval",
      "TF-IDF",
      "BERT Fine-tuning",
      "Natural Language Processing",
    ],
  },
  {
    index: "02",
    title: "Retrieval & Evaluation",
    summary: "Making retrieval measurable.",
    detail:
      "Vector search and embeddings, with evaluation methods that test retrieval, answers, citations and refusal behaviour rather than assuming them.",
    skills: [
      "FAISS",
      "Vector Search",
      "Embeddings",
      "Hit@k",
      "Mean Reciprocal Rank (MRR)",
      "Retrieval Evaluation",
      "Regression Test Sets",
      "pytest",
      "GitHub Actions CI",
    ],
  },
  {
    index: "03",
    title: "Programming & Data",
    summary: "The base layer.",
    detail:
      "Python-first programming with SQL and JavaScript, plus the data stack used for analysis, classical machine learning and document processing.",
    skills: [
      "Python",
      "SQL",
      "JavaScript",
      "Pandas",
      "NumPy",
      "scikit-learn",
    ],
  },
  {
    index: "04",
    title: "Backend Development",
    summary: "APIs, services and data.",
    detail:
      "Python backend services with clear API contracts, relational storage and lightweight interfaces for applied AI tools.",
    skills: [
      "FastAPI",
      "Flask",
      "REST APIs",
      "PostgreSQL",
      "Streamlit",
    ],
  },
  {
    index: "05",
    title: "Tools",
    summary: "The working environment.",
    detail:
      "Version control, continuous integration, local model runtimes and model APIs used across the projects on this site.",
    skills: [
      "Git",
      "GitHub",
      "GitHub Actions",
      "Ollama",
      "Gemini API",
    ],
  },
];
