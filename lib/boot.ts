/** Runs in <head> before first paint. Official flash-prevention pattern. */
export const BOOT_SCRIPT = `(function(){try{var d=document.documentElement;var l=localStorage.getItem("ciao-lang");if(l!=="en"&&l!=="vi"){var n=(navigator.languages||[navigator.language]||[""]).join(",").toLowerCase();l=n.indexOf("vi")!==-1?"vi":"en";}d.setAttribute("data-lang",l);d.lang=l==="vi"?"vi":"en";var t=localStorage.getItem("ciao-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}d.setAttribute("data-theme",t);var s=localStorage.getItem("ciao-sound");d.setAttribute("data-sound",s==="off"?"off":"on");}catch(e){}})();`;

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
  try {
    const lang = localStorage.getItem("ciao-lang");
    const theme = localStorage.getItem("ciao-theme");
    const sound = localStorage.getItem("ciao-sound");
    const root = document.documentElement;
    if (lang === "en" || lang === "vi") {
      root.setAttribute("data-lang", lang);
      root.lang = lang === "vi" ? "vi" : "en";
    } else {
      const n = (navigator.languages || [navigator.language] || [""]).join(",").toLowerCase();
      const detected = n.includes("vi") ? "vi" : "en";
      root.setAttribute("data-lang", detected);
      root.lang = detected === "vi" ? "vi" : "en";
    }
    if (theme === "light" || theme === "dark") {
      root.setAttribute("data-theme", theme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      root.setAttribute("data-theme", "dark");
    }
    root.setAttribute("data-sound", sound === "off" ? "off" : "on");
  } catch {
    /* private mode */
  }
}
