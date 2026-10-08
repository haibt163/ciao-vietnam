"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        data-digest={error.digest ?? ""}
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#f6f1e7",
          color: "#1c1917",
          fontFamily: "Georgia, serif",
          padding: 24,
        }}
      >
        <p style={{ fontFamily: "ui-monospace, monospace", color: "#5c564e" }}>{">"} error</p>
        <h1 style={{ fontSize: 36, lineHeight: 1.15, margin: "8px 0" }}>Something went wrong.</h1>
        <p lang="vi" style={{ fontSize: 22, margin: "0 0 8px" }}>
          Đã có lỗi.
        </p>
        <p style={{ color: "#5c564e" }}>This page did not load. Trang này chưa tải được.</p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            minHeight: 44,
            padding: "0 16px",
            border: 0,
            borderRadius: 12,
            background: "#9c4320",
            color: "#fffbf6",
            fontFamily: "ui-monospace, monospace",
            fontSize: 14,
          }}
        >
          Try again · Thử lại
        </button>
      </body>
    </html>
  );
}
