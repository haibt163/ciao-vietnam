"use client";

import { useLayoutEffect, useState } from "react";

export function useLang(): "en" | "vi" {
  const [lang, setLang] = useState<"en" | "vi">("en");
  useLayoutEffect(() => {
    const read = () => {
      setLang(document.documentElement.getAttribute("data-lang") === "vi" ? "vi" : "en");
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-lang"] });
    return () => observer.disconnect();
  }, []);
  return lang;
}
