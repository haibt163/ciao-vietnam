function applyStoredPrefs() {
  try {
    const root = document.documentElement;
    let lang = localStorage.getItem("ciao-lang");
    if (lang !== "en" && lang !== "vi") {
      const names = (navigator.languages || [navigator.language] || [""]).join(",").toLowerCase();
      lang = names.indexOf("vi") !== -1 ? "vi" : "en";
    }
    root.setAttribute("data-lang", lang);
    root.lang = lang === "vi" ? "vi" : "en";
    let theme = localStorage.getItem("ciao-theme");
    if (theme !== "light" && theme !== "dark") {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    root.setAttribute("data-theme", theme);
    const sound = localStorage.getItem("ciao-sound");
    root.setAttribute("data-sound", sound === "off" ? "off" : "on");
  } catch {
    /* private mode */
  }
}

/** Same function as reapplyPrefs, inlined so it can run before first paint. */
export const BOOT_SCRIPT = `(${applyStoredPrefs.toString()})();`;

export function readLang(): "en" | "vi" {
  if (typeof document === "undefined") return "en";
  return document.documentElement.getAttribute("data-lang") === "vi" ? "vi" : "en";
}

export function applyLang(lang: "en" | "vi") {
  const root = document.documentElement;
  root.setAttribute("data-lang", lang);
  root.lang = lang === "vi" ? "vi" : "en";
  localStorage.setItem("ciao-lang", lang);
}

export function applyTheme(theme: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("ciao-theme", theme);
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  applyTheme(current === "dark" ? "light" : "dark");
}

export function toggleSound() {
  const off = document.documentElement.getAttribute("data-sound") === "off";
  const next = off ? "on" : "off";
  document.documentElement.setAttribute("data-sound", next);
  localStorage.setItem("ciao-sound", next);
}

export function reapplyPrefs() {
  applyStoredPrefs();
}
