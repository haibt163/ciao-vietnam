"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Backpack, House, Map, Search, Sun, Moon, UtensilsCrossed, Volume2, VolumeX, X, Route } from "lucide-react";
import { searchIndex, ui } from "@/lib/content";
import { applyLang, reapplyPrefs, toggleSound, toggleTheme } from "@/lib/boot";
import { playTap } from "@/lib/sound";
import { fold } from "@/lib/fold";
import { T } from "@/components/text";

const tabs = [
  { href: "/", key: "home", icon: House },
  { href: "/regions", key: "regions", icon: Map },
  { href: "/plan", key: "plan", icon: Route },
  { href: "/eat", key: "eat", icon: UtensilsCrossed },
  { href: "/essentials", key: "essentials", icon: Backpack },
] as const;

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useLayoutEffect(() => {
    reapplyPrefs();
  }, []);

  useLayoutEffect(() => {
    const onPointer = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-sound-toggle]")) return;
      playTap();
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, []);

  const results = useMemo(() => {
    const q = fold(query.trim());
    if (!q) return searchIndex.slice(0, 6);
    return searchIndex.filter((entry) => fold(`${entry.title.en} ${entry.title.vi} ${entry.hint.en} ${entry.hint.vi} ${entry.keywords}`).includes(q));
  }, [query]);

  return (
    <div className="shell">
      <a className="skip" href="#content">
        <T text={ui.skip} />
      </a>
      <header className="topbar">
        <Link href="/" className="prompt tap mr-auto inline-flex min-h-11 items-center text-sm no-underline">
          {">"} ciao_
        </Link>
        <button type="button" className="lang-btn tap" data-lang-btn="en" onClick={() => applyLang("en")}>
          EN
        </button>
        <button type="button" className="lang-btn tap" data-lang-btn="vi" onClick={() => applyLang("vi")}>
          VI
        </button>
        <button type="button" className="icon-btn tap" onClick={() => setOpen(true)}>
          <Search size={18} />
          <span className="sr-only">
            <T text={ui.search} />
          </span>
        </button>
        <button type="button" className="icon-btn tap" onClick={toggleTheme}>
          <span className="when-light">
            <Moon size={18} />
          </span>
          <span className="when-dark">
            <Sun size={18} />
          </span>
          <span className="sr-only when-light">
            <T text={ui.themeToDark} />
          </span>
          <span className="sr-only when-dark">
            <T text={ui.themeToLight} />
          </span>
        </button>
        <button type="button" className="icon-btn tap" data-sound-toggle onClick={toggleSound}>
          <span className="when-sound">
            <Volume2 size={18} />
          </span>
          <span className="when-muted">
            <VolumeX size={18} />
          </span>
          <span className="sr-only when-sound">
            <T text={ui.soundOn} />
          </span>
          <span className="sr-only when-muted">
            <T text={ui.soundOff} />
          </span>
        </button>
      </header>
      <main id="content" className="main">
        {children}
        <footer className="mt-10 grid gap-2 border-t border-line pt-4 text-sm text-muted">
          <p className="m-0 font-mono">
            {">"} <T text={ui.pocket} />
          </p>
          <p className="lang-vi m-0">
            <T text={ui.viReview} />
          </p>
          <Link href="/credits" className="tap inline-flex min-h-11 items-center text-ink">
            <T text={ui.credits} />
          </Link>
        </footer>
      </main>
      <nav className="tabbar">
        {tabs.map((tab) => {
          const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          const Icon = tab.icon;
          return (
            <Link key={tab.href} href={tab.href} className="tab tap" data-active={active ? "true" : "false"}>
              <Icon size={18} aria-hidden />
              <T text={ui[tab.key]} />
            </Link>
          );
        })}
      </nav>
      {open ? (
        <div className="search-sheet" role="presentation" onClick={() => setOpen(false)}>
          <div
            className="search-panel"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="m-0 font-display text-2xl">
                <T text={ui.search} />
              </h2>
              <button type="button" className="icon-btn tap" onClick={() => setOpen(false)}>
                <X size={18} />
                <span className="sr-only">
                  <T text={ui.close} />
                </span>
              </button>
            </div>
            <label className="grid gap-2">
              <span className="sr-only">
                <T text={ui.search} />
              </span>
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder=""
              />
              <span className="font-mono text-[13px] text-muted">
                <T text={ui.searchPlaceholder} />
              </span>
            </label>
            <ul className="mt-4 grid list-none gap-2 p-0">
              {results.length === 0 ? (
                <li className="text-muted">
                  <T text={ui.noResults} />
                </li>
              ) : (
                results.map((entry) => (
                  <li key={entry.href}>
                    <Link
                      href={entry.href}
                      className="tap grid min-h-11 rounded-xl border border-line bg-card px-3 py-2 no-underline"
                      onClick={() => setOpen(false)}
                    >
                      <span className="font-display text-xl">
                        <T text={entry.title} />
                      </span>
                      <span className="text-sm text-muted">
                        <T text={entry.hint} />
                      </span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
