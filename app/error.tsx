"use client";

import { T } from "@/components/text";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="grid gap-3 py-8" data-digest={error.digest ?? ""}>
      <p className="prompt m-0 text-muted">{">"} error</p>
      <h1 className="m-0 font-display text-4xl leading-tight">
        <T text={{ en: "Something went wrong.", vi: "Đã có lỗi." }} />
      </h1>
      <p className="m-0 text-muted">
        <T text={{ en: "This page did not load.", vi: "Trang này chưa tải được." }} />
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="tap inline-flex min-h-11 w-fit items-center rounded-xl bg-clay-fill px-4 font-mono text-sm text-on-clay"
      >
        <T text={{ en: "Try again", vi: "Thử lại" }} />
      </button>
    </div>
  );
}
