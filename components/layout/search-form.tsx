"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

type SearchFormProps = {
  initialQuery?: string;
};

export function SearchForm({ initialQuery = "" }: SearchFormProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full" role="search">
      <input
        type="search"
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        className="h-10 w-full rounded-l-full border border-[var(--yt-border)] bg-[var(--yt-bg)] px-4 text-sm outline-none focus:border-[var(--yt-accent)]"
        aria-label="Search"
      />
      <button
        type="submit"
        className="flex h-10 w-16 items-center justify-center rounded-r-full border border-l-0 border-[var(--yt-border)] bg-[var(--yt-surface)] hover:bg-[var(--yt-hover)]"
        aria-label="Search"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
          <path
            fill="currentColor"
            d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"
          />
        </svg>
      </button>
    </form>
  );
}
