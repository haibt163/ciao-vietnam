import type { LangText } from "@/content/types";

export function T({ text, chip = false }: { text: LangText; chip?: boolean }) {
  const en = chip ? `[ ${text.en} ]` : text.en;
  const vi = chip ? `[ ${text.vi} ]` : text.vi;
  return (
    <>
      <span className="lang-en">{en}</span>
      <span className="lang-vi">{vi}</span>
    </>
  );
}
