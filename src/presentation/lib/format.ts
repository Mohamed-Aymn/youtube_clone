export function formatViewCount(count?: number): string {
  if (count === undefined) return "";
  if (count >= 1_000_000_000) {
    return `${(count / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B views`;
  }
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, "")}M views`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1).replace(/\.0$/, "")}K views`;
  }
  return `${count} views`;
}

export function formatSubscriberCount(count?: number): string {
  if (count === undefined) return "";
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, "")}M subscribers`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1).replace(/\.0$/, "")}K subscribers`;
  }
  return `${count} subscribers`;
}

export function formatRelativeTime(isoDate: string): string {
  const published = new Date(isoDate).getTime();
  const now = Date.now();
  const seconds = Math.max(0, Math.floor((now - published) / 1000));

  const units: Array<[number, Intl.RelativeTimeFormatUnit]> = [
    [60 * 60 * 24 * 365, "year"],
    [60 * 60 * 24 * 30, "month"],
    [60 * 60 * 24 * 7, "week"],
    [60 * 60 * 24, "day"],
    [60 * 60, "hour"],
    [60, "minute"],
  ];

  for (const [unitSeconds, unit] of units) {
    if (seconds >= unitSeconds) {
      const value = Math.floor(seconds / unitSeconds);
      return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
        -value,
        unit,
      );
    }
  }

  return "just now";
}

/** Parse ISO 8601 duration (PT#H#M#S) to m:ss / h:mm:ss */
export function formatDuration(isoDuration?: string): string {
  if (!isoDuration) return "";

  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "";

  const hours = Number(match[1] ?? 0);
  const minutes = Number(match[2] ?? 0);
  const seconds = Number(match[3] ?? 0);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
