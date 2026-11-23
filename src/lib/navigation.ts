export type SectionId =
  | "work"
  | "about"
  | "expertise"
  | "experience"
  | "contact";

export type NavItem = {
  label: string;
  href: string;
  id: SectionId | "writing";
  /** "section" scrolls within the home page; "page" is its own route. */
  kind: "section" | "page";
};

export const navItems: NavItem[] = [
  { label: "Work", href: "/#work", id: "work", kind: "section" },
  { label: "About", href: "/#about", id: "about", kind: "section" },
  { label: "Expertise", href: "/#expertise", id: "expertise", kind: "section" },
  {
    label: "Experience",
    href: "/#experience",
    id: "experience",
    kind: "section",
  },
  { label: "Writing", href: "/writing", id: "writing", kind: "page" },
  { label: "Contact", href: "/#contact", id: "contact", kind: "section" },
];

export const sectionIds: SectionId[] = navItems
  .filter((item) => item.kind === "section")
  .map((item) => item.id as SectionId);
