"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail, X } from "lucide-react";
import { useRef } from "react";
import type { NavItem } from "@/lib/navigation";
import { profile } from "@/data/profile";
import { useModal } from "@/hooks/useModal";
import { Availability } from "@/components/ui/Availability";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  onOpenCommandPalette: () => void;
  navItems: NavItem[];
};

export function MobileMenu({
  open,
  onClose,
  onOpenCommandPalette,
  navItems,
}: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useModal(open, panelRef, onClose);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[90] overflow-y-auto overscroll-contain bg-ink lg:hidden"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
        >
          <div className="container-edge flex min-h-svh flex-col pb-10">
            <div className="flex h-16 items-center justify-between border-b border-hairline">
              <Link
                href="/"
                onClick={onClose}
                aria-label="Anshu — home"
                className="font-display text-[15px] font-medium tracking-[-0.02em]"
              >
                {profile.brand}
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                data-autofocus
                className="flex size-11 items-center justify-center rounded-full border border-hairline text-chalk transition-colors hover:bg-white/5"
              >
                <X aria-hidden="true" className="size-4" strokeWidth={1.5} />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-4 flex-1">
              <ul className="border-t border-hairline">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    className="border-b border-hairline"
                    initial={
                      reduceMotion ? false : { opacity: 0, y: 18 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.55,
                      delay: reduceMotion ? 0 : 0.05 + index * 0.045,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center justify-between gap-6 py-5"
                    >
                      <span className="font-display text-[2.4rem] font-medium uppercase leading-none tracking-[-0.045em] text-chalk">
                        {item.label}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 text-ash transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-chalk"
                        strokeWidth={1.5}
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.5,
                  delay: reduceMotion ? 0 : 0.3,
                }}
                className="mt-8"
              >
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    window.setTimeout(onOpenCommandPalette, 40);
                  }}
                  className="flex min-h-11 w-full items-center justify-between border border-hairline px-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ash transition-colors hover:text-chalk"
                >
                  Search the portfolio
                  <span className="mono-micro text-ash">⌘K</span>
                </button>
              </motion.div>
            </nav>

            <div className="mt-10 grid gap-6 border-t border-hairline pt-6">
              <Availability />
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ash transition-colors hover:text-chalk"
                >
                  <Mail aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
                  Email
                </a>
                <a
                  href={profile.links.github.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ash transition-colors hover:text-chalk"
                >
                  GitHub
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3"
                    strokeWidth={1.5}
                  />
                </a>
                <a
                  href={profile.links.linkedin.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ash transition-colors hover:text-chalk"
                >
                  LinkedIn
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3"
                    strokeWidth={1.5}
                  />
                </a>
                <a
                  href={profile.links.resume.href}
                  download
                  className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ash transition-colors hover:text-chalk"
                >
                  Resume / PDF
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3"
                    strokeWidth={1.5}
                  />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
