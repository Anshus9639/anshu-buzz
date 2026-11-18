"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  Briefcase,
  Check,
  Copy,
  Download,
  FileText,
  GitBranch,
  Home,
  Layers,
  Search,
  User,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { navItems } from "@/lib/navigation";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { cn, copyToClipboard, scrollToSection } from "@/lib/utils";
import { useModal } from "@/hooks/useModal";

type CommandGroup = "Navigate" | "Projects" | "Connect";

type CommandItem = {
  id: string;
  label: string;
  group: CommandGroup;
  hint?: string;
  icon: LucideIcon;
  keywords: string;
  run: () => void | Promise<void>;
};

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
};

const groupOrder: CommandGroup[] = ["Navigate", "Projects", "Connect"];

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  useModal(open, panelRef, onClose);

  const goToSection = useCallback(
    (id: string) => {
      onClose();
      if (pathname === "/") {
        window.setTimeout(() => scrollToSection(id), 30);
      } else {
        router.push(`/#${id}`);
      }
    },
    [onClose, pathname, router],
  );

  const commands: CommandItem[] = [
    ...navItems.map((item) => ({
      id: `nav-${item.id}`,
      label: item.label,
      group: "Navigate" as const,
      hint: item.index,
      icon: item.id === "about" ? User : item.id === "work" ? Layers : Home,
      keywords: `${item.label} section ${item.index}`,
      run: () => goToSection(item.id),
    })),
    ...projects.map((project) => ({
      id: `project-${project.slug}`,
      label: project.title,
      group: "Projects" as const,
      hint: `Case ${project.index}`,
      icon: Layers,
      keywords: `${project.title} ${project.category} ${project.technologies.join(" ")} project case study`,
      run: () => {
        onClose();
        router.push(`/projects/${project.slug}`);
      },
    })),
    {
      id: "copy-email",
      label: "Copy email address",
      group: "Connect",
      hint: profile.email,
      icon: copyState === "copied" ? Check : Copy,
      keywords: "email contact copy mail",
      run: async () => {
        const copied = await copyToClipboard(profile.email);
        setCopyState(copied ? "copied" : "error");
      },
    },
    {
      id: "github",
      label: "GitHub",
      group: "Connect",
      hint: "New tab",
      icon: GitBranch,
      keywords: "github code repository source",
      run: () => {
        onClose();
        window.open(
          profile.links.github.href,
          "_blank",
          "noopener,noreferrer",
        );
      },
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      group: "Connect",
      hint: "New tab",
      icon: Briefcase,
      keywords: "linkedin professional profile work",
      run: () => {
        onClose();
        window.open(
          profile.links.linkedin.href,
          "_blank",
          "noopener,noreferrer",
        );
      },
    },
    {
      id: "resume",
      label: "Resume",
      group: "Connect",
      hint: "PDF / print",
      icon: FileText,
      keywords: "resume cv print pdf",
      run: () => {
        onClose();
        router.push("/resume");
      },
    },
    {
      id: "resume-pdf",
      label: "Download resume PDF",
      group: "Connect",
      hint: "Download",
      icon: Download,
      keywords: "resume cv download pdf file",
      run: () => {
        onClose();
        const link = document.createElement("a");
        link.href = profile.links.resume.href;
        link.download = "";
        link.click();
      },
    },
  ];

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = normalizedQuery
    ? commands.filter((command) =>
        `${command.label} ${command.keywords} ${command.group}`
          .toLowerCase()
          .includes(normalizedQuery),
      )
    : commands;

  const grouped = groupOrder
    .map((group) => ({
      group,
      items: filtered.filter((command) => command.group === group),
    }))
    .filter((section) => section.items.length > 0);

  const activeCommand = filtered[activeIndex];

  useEffect(() => {
    if (!open) return;
    const activeOption = document.getElementById(
      `command-option-${activeIndex}`,
    );
    activeOption?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open, filtered.length]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) =>
        filtered.length === 0 ? 0 : (index + 1) % filtered.length,
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) =>
        filtered.length === 0
          ? 0
          : (index - 1 + filtered.length) % filtered.length,
      );
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(Math.max(filtered.length - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (activeCommand) {
        void activeCommand.run();
      }
    }
  }

  function handleOptionClick(command: CommandItem) {
    void command.run();
  }

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.24, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
        >
          <div
            className="absolute inset-0 bg-black/80"
            aria-hidden="true"
            onMouseDown={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="command-title"
            className="relative mx-auto mt-[10vh] w-[calc(100%-1.5rem)] max-w-xl border border-hairline bg-[#0d0d0d] shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
            initial={reduceMotion ? false : { opacity: 0, y: -10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.99 }}
            transition={transition}
          >
            <h2 id="command-title" className="sr-only">
              Command palette
            </h2>

            <div className="flex items-center gap-3 border-b border-hairline px-4">
              <Search
                aria-hidden="true"
                className="size-4 shrink-0 text-ash"
                strokeWidth={1.5}
              />
              <input
                ref={inputRef}
                data-autofocus
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-listbox"
                aria-autocomplete="list"
                aria-activedescendant={
                  activeCommand ? `command-option-${activeIndex}` : undefined
                }
                placeholder="Search the portfolio or jump to a section…"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleKeyDown}
                className="h-14 min-w-0 flex-1 bg-transparent font-mono text-xs tracking-wide text-chalk placeholder:text-ash focus-visible:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close command palette"
                className="flex size-8 shrink-0 items-center justify-center rounded-full text-ash transition-colors hover:bg-white/5 hover:text-chalk"
              >
                <X aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
              </button>
            </div>

            <div
              ref={listRef}
              id="command-listbox"
              role="listbox"
              aria-label="Commands"
              className="max-h-[52vh] overflow-y-auto overscroll-contain p-2"
            >
              {grouped.length === 0 ? (
                <p className="px-3 py-10 text-center text-xs text-ash">
                  No commands found for “{query}”.
                </p>
              ) : (
                grouped.map((section) => (
                  <div key={section.group} className="mb-2 last:mb-0">
                    <p
                      className="mono-micro px-3 py-2 text-ash"
                      role="presentation"
                    >
                      {section.group}
                    </p>
                    {section.items.map((command) => {
                      const index = filtered.findIndex(
                        (item) => item.id === command.id,
                      );
                      const isActive = index === activeIndex;
                      const Icon = command.icon;

                      return (
                        <div
                          key={command.id}
                          id={`command-option-${index}`}
                          role="option"
                          aria-selected={isActive}
                          tabIndex={-1}
                          onClick={() => handleOptionClick(command)}
                          onMouseEnter={() => setActiveIndex(index)}
                          onMouseDown={(event) => event.preventDefault()}
                          className={cn(
                            "flex cursor-pointer items-center gap-3 px-3 py-2.5 transition-colors",
                            isActive
                              ? "bg-white/[0.06] text-chalk"
                              : "text-ash hover:text-chalk",
                          )}
                        >
                          <Icon
                            aria-hidden="true"
                            className="size-3.5 shrink-0"
                            strokeWidth={1.5}
                          />
                          <span className="min-w-0 flex-1 truncate text-xs">
                            {command.label}
                          </span>
                          {command.hint ? (
                            <span className="mono-micro hidden shrink-0 text-ash sm:block">
                              {command.id === "copy-email" && copyState !== "idle"
                                ? copyState === "copied"
                                  ? "Copied"
                                  : "Copy failed"
                                : command.hint}
                            </span>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-hairline px-4 py-3">
              <p className="mono-micro text-ash" aria-live="polite">
                {copyState === "copied"
                  ? `Copied ${profile.email}`
                  : copyState === "error"
                    ? "Clipboard unavailable — select the email manually"
                    : "ANSHU / COMMAND"}
              </p>
              <div className="mono-micro hidden items-center gap-4 text-ash sm:flex">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
                <span>Esc Close</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
