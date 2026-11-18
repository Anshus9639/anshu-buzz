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
  index: string;
};

export const navItems: NavItem[] = [
  { label: "Work", href: "/#work", id: "work", index: "01" },
  { label: "About", href: "/#about", id: "about", index: "02" },
  { label: "Expertise", href: "/#expertise", id: "expertise", index: "03" },
  { label: "Experience", href: "/#experience", id: "experience", index: "04" },
  { label: "Contact", href: "/#contact", id: "contact", index: "05" },
];

export const sectionIds = navItems.map((item) => item.id);
