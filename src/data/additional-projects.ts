export type AdditionalProject = {
  id: string;
  title: string;
  timeline: string;
  category: string;
  summary: string;
  detail: string;
  highlights: { label: string; value: string }[];
  technologies: string[];
  link?: { label: string; href: string };
};

export const additionalProjects: AdditionalProject[] = [
  {
    id: "recipe-intelligence-chatbot",
    title: "Recipe Intelligence Chatbot",
    timeline: "Nov 2026",
    category: "Applied AI",
    summary:
      "A conversational recipe assistant that answers only from a 122,938-recipe dataset, retrieving or computing facts instead of generating them.",
    detail:
      "The chatbot applies hard constraints across the full dataset before TF-IDF ranking, so dietary restrictions, available ingredients and other conditions are enforced rather than suggested. Ingredient matching is explainable: each result shows why a recipe was selected. Validation used 12 scripted conversations, 25 turns and 57 programmatic checks, including a test where four of five titles suggested by a plain LLM were absent from the dataset.",
    highlights: [
      { label: "Recipes", value: "122,938" },
      { label: "Scripted conversations", value: "12" },
      { label: "Turns", value: "25" },
      { label: "Programmatic checks", value: "57" },
    ],
    technologies: ["Python", "TF-IDF", "Dataset constraints", "Conversational search"],
    link: {
      label: "Repository",
      href: "https://github.com/Anshus9639/recipe-chatbot",
    },
  },
  {
    id: "legal-document-analysis",
    title: "AI-Powered Legal Document Analysis",
    timeline: "Aug 2025 – Oct 2025",
    category: "Applied AI",
    summary:
      "A BERT-based legal clause classifier trained on a custom dataset, with a pipeline for analysing new legal text.",
    detail:
      "The project fine-tuned a BERT-based transformer to classify legal clauses, reaching approximately 79% classification accuracy on the custom dataset. A surrounding pipeline prepared new legal text for inference and returned clause-level analysis. This was an early exploration of domain-specific NLP and became the basis for later work in retrieval-grounded systems.",
    highlights: [
      { label: "Model", value: "BERT" },
      { label: "Accuracy", value: "~79%" },
      { label: "Task", value: "Clause classification" },
    ],
    technologies: ["Python", "BERT", "Hugging Face Transformers", "Pandas"],
  },
];
