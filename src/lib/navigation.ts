export type SectionId =
  | "work"
  | "about"
  | "expertise"
  | "experience"
  | "contact";

export type NavItem = {
  label: string;
  href: string;
  id: SectionId;
};

export const navItems: NavItem[] = [
  { label: "Work", href: "/#work", id: "work" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Expertise", href: "/#expertise", id: "expertise" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

export const sectionIds = navItems.map((item) => item.id);
