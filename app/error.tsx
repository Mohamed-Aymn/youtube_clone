"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <h2 className="text-lg font-semibold">Something went wrong</h2>
      <p className="mt-2 text-sm text-[var(--yt-muted)]">
        {error.message || "Failed to load this page."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 rounded-full bg-[var(--yt-fg)] px-4 py-2 text-sm font-medium text-[var(--yt-bg)]"
      >
        Try again
      </button>
    </div>
  );
}
