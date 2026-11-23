"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { navItems, sectionIds } from "@/lib/navigation";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/useActiveSection";

const CommandPalette = dynamic(
  () =>
    import("@/components/navigation/CommandPalette").then(
      (module) => module.CommandPalette,
    ),
  { ssr: false },
);

const MobileMenu = dynamic(
  () =>
    import("@/components/navigation/MobileMenu").then(
      (module) => module.MobileMenu,
    ),
  { ssr: false },
);

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteSession, setPaletteSession] = useState(0);
  const activeSection = useActiveSection(sectionIds, isHome);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateOffset = () => {
      document.documentElement.style.setProperty(
        "--header-offset",
        `${header.getBoundingClientRect().height + 24}px`,
      );
    };

    updateOffset();
    const observer = new ResizeObserver(updateOffset);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 12);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handlePopState() {
      setMenuOpen(false);
      setPaletteOpen(false);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const closePalette = useCallback(() => setPaletteOpen(false), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const openCommandPalette = useCallback(() => {
    setMenuOpen(false);
    setPaletteSession((session) => session + 1);
    setPaletteOpen(true);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        (event.metaKey || event.ctrlKey) &&
        !event.altKey &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        setMenuOpen(false);
        if (paletteOpen) {
          closePalette();
        } else {
          openCommandPalette();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paletteOpen, closePalette, openCommandPalette]);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "site-header fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500",
          scrolled
            ? "border-hairline bg-ink/95"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="container-edge flex h-16 items-center justify-between gap-6 lg:h-20">
          <Link
            href="/"
            aria-label="Anshu — home"
            className="shrink-0 font-display text-[15px] font-medium tracking-[-0.02em] text-chalk"
          >
            {profile.brand}
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-7 lg:flex xl:gap-9"
          >
            {navItems.map((item) => {
              const isActive =
                item.kind === "page"
                  ? pathname === item.href ||
                    pathname.startsWith(`${item.href}/`)
                  : isHome && activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={
                    isActive ? (item.kind === "page" ? "page" : "location") : undefined
                  }
                  className={cn(
                    "group/link relative py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-300",
                    isActive ? "text-chalk" : "text-ash hover:text-chalk",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-chalk transition-transform duration-500 ease-editorial",
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover/link:scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={openCommandPalette}
              aria-haspopup="dialog"
              aria-keyshortcuts="Control+K Meta+K"
              className="hidden min-h-9 items-center gap-2 rounded-full border border-hairline px-3 text-ash transition-colors duration-300 hover:border-dust hover:text-chalk sm:flex"
            >
              <Search
                aria-hidden="true"
                className="size-3.5"
                strokeWidth={1.5}
              />
              <span className="font-mono text-[9px] uppercase tracking-[0.16em]">
                Search
              </span>
              <span
                aria-hidden="true"
                className="font-mono text-[9px] tracking-[0.16em]"
              >
                ⌘K
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="flex min-h-11 items-center gap-2 rounded-full border border-hairline px-4 font-mono text-[10px] uppercase tracking-[0.16em] text-chalk transition-colors duration-300 hover:border-dust lg:hidden"
            >
              <Menu aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
              Menu
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <MobileMenu
          open
          onClose={closeMenu}
          onOpenCommandPalette={openCommandPalette}
        />
      ) : null}
      {paletteOpen ? (
        <CommandPalette
          key={paletteSession}
          open
          onClose={closePalette}
        />
      ) : null}
    </>
  );
}
