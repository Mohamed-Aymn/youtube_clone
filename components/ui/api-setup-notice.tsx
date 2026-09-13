type ApiSetupNoticeProps = {
  title: string;
  message: string;
};

export function ApiSetupNotice({ title, message }: ApiSetupNoticeProps) {
  return (
    <div className="mx-auto max-w-xl rounded-xl border border-[var(--yt-border)] bg-[var(--yt-surface)] p-8 text-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--yt-muted)]">
        {message}
      </p>
      <pre className="mt-4 overflow-x-auto rounded-lg bg-[var(--yt-bg)] p-3 text-left text-xs text-[var(--yt-fg)]">
        YOUTUBE_API_KEY=your_key_here
      </pre>
    </div>
  );
}
