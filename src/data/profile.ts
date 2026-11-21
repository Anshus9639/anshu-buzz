export type ExternalLink = {
  label: string;
  href: string;
  handle?: string;
  note?: string;
  download?: boolean;
};

export type Profile = {
  name: string;
  brand: string;
  domain: string;
  url: string;
  role: string;
  roles: readonly string[];
  headline: string;
  statement: string;
  position: string;
  location: string;
  availability: {
    label: string;
    detail: string;
  };
  email: string;
  links: {
    github: ExternalLink;
    linkedin: ExternalLink;
    resume: ExternalLink;
    resumePage: ExternalLink;
  };
  interests: readonly string[];
  facts: readonly {
    label: string;
    value: string;
  }[];
};

export const profile: Profile = {
  name: "Anshu Saini",
  brand: "ANSHU",
  domain: "anshu.buzz",
  url: "https://anshu.buzz",
  role: "Entry-Level Applied AI / Generative AI Engineer",
  roles: ["Applied AI Engineer", "Python Developer", "Software Builder"],
  headline: "ENGINEERING WHAT’S NEXT.",
  statement:
    "An AI & Robotics-specialized IT graduate building retrieval-grounded LLM applications, Python backends and practical software products.",
  position:
    "An AI & Robotics-specialized Information Technology graduate building reliable AI systems and practical software products across applied AI, Python backend engineering and full-stack development.",
  location: "India — Open to relocation",
  availability: {
    label: "Open to entry-level opportunities",
    detail:
      "Applied AI, generative AI and Python development. India — open to relocation.",
  },
  email: "ash911672@gmail.com",
  links: {
    github: {
      label: "GitHub",
      handle: "@Anshus9639",
      href: "https://github.com/Anshus9639",
    },
    linkedin: {
      label: "LinkedIn",
      handle: "anshu-saini",
      href: "https://linkedin.com/in/anshu-saini-4089a0292",
    },
    resume: {
      label: "Resume",
      href: "/Anshu-Saini-Resume.pdf",
      note: "PDF / one page",
      download: true,
    },
    resumePage: {
      label: "Print view",
      href: "/resume",
    },
  },
  interests: [
    "Applied AI",
    "Generative AI",
    "LLM applications",
    "RAG architectures",
    "Semantic retrieval",
    "Python engineering",
    "Backend development",
    "Full-stack development",
    "Product engineering",
  ],
  facts: [
    { label: "Location", value: "India — Open to relocation" },
    { label: "Currently", value: "Building MarginPilot" },
  ],
};
