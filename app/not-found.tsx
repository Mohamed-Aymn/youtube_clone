import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <h2 className="text-lg font-semibold">Page not found</h2>
      <p className="mt-2 text-sm text-[var(--yt-muted)]">
        The video or channel you requested does not exist.
      </p>
      <Link
        href="/"
        className="mt-4 inline-block rounded-full bg-[var(--yt-fg)] px-4 py-2 text-sm font-medium text-[var(--yt-bg)]"
      >
        Go home
      </Link>
    </div>
  );
}
