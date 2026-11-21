export type SkillCategory = {
  title: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Generative AI & NLP",
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
    title: "Retrieval & Evaluation",
    skills: [
      "FAISS",
      "Vector Search",
      "Embeddings",
      "Hit@k",
      "Mean Reciprocal Rank (MRR)",
      "Retrieval Evaluation",
      "Regression Test Sets",
      "pytest",
    ],
  },
  {
    title: "Programming & Data",
    skills: ["Python", "SQL", "JavaScript", "Pandas", "NumPy", "scikit-learn"],
  },
  {
    title: "Backend & APIs",
    skills: ["FastAPI", "Flask", "REST APIs", "PostgreSQL", "Streamlit"],
  },
  {
    title: "Frontend & Infrastructure",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Git",
      "GitHub Actions",
      "nginx",
    ],
  },
];
