export type SectionId =
  | "work"
  | "about"
  | "expertise"
  | "experience"
  | "contact";

export type NavItem = {
  label: string;
  href: string;
  id?: SectionId;
};

export const sectionNavItems: NavItem[] = [
  { label: "Work", href: "/#work", id: "work" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Expertise", href: "/#expertise", id: "expertise" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

const blogNavItem: NavItem = { label: "Blog", href: "/blog" };

export function getNavItems(includeBlog: boolean): NavItem[] {
  return includeBlog ? [...sectionNavItems, blogNavItem] : sectionNavItems;
}

export const sectionIds = sectionNavItems.flatMap((item) =>
  item.id ? [item.id] : [],
);