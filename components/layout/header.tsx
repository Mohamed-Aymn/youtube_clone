import Link from "next/link";
import { SearchForm } from "./search-form";

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-[var(--yt-border)] bg-[var(--yt-bg)] px-4">
      <div className="flex min-w-0 shrink-0 items-center gap-3">
        <Link href="/" className="flex items-center gap-1" aria-label="YouTube home">
          <YoutubeLogo />
          <span className="hidden text-xl font-semibold tracking-tight sm:inline">
            YouTube
          </span>
        </Link>
      </div>

      <div className="mx-auto flex w-full max-w-[640px] flex-1 justify-center px-2">
        <SearchForm />
      </div>

      <div className="hidden w-24 shrink-0 sm:block" aria-hidden />
    </header>
  );
}

function YoutubeLogo() {
  return (
    <svg
      viewBox="0 0 28 20"
      width="28"
      height="20"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M27.3 3.1A3.5 3.5 0 0 0 24.8.6C22.6 0 14 0 14 0S5.4 0 3.2.6A3.5 3.5 0 0 0 .7 3.1 36.6 36.6 0 0 0 0 10a36.6 36.6 0 0 0 .7 6.9 3.5 3.5 0 0 0 2.5 2.5C5.4 20 14 20 14 20s8.6 0 10.8-.6a3.5 3.5 0 0 0 2.5-2.5A36.6 36.6 0 0 0 28 10a36.6 36.6 0 0 0-.7-6.9Z"
        fill="#FF0000"
      />
      <path d="M11.2 14.3V5.7L18.5 10l-7.3 4.3Z" fill="#fff" />
    </svg>
  );
}
