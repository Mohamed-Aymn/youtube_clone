import { AppError } from "@/src/domain/errors";

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

export type YoutubeListResponse<T> = {
  items?: T[];
  error?: {
    code: number;
    message: string;
    errors?: Array<{ reason?: string }>;
  };
};

export type YoutubeThumbnailSet = {
  default?: { url: string; width: number; height: number };
  medium?: { url: string; width: number; height: number };
  high?: { url: string; width: number; height: number };
  standard?: { url: string; width: number; height: number };
  maxres?: { url: string; width: number; height: number };
};

export type YoutubeVideoResource = {
  id: string;
  snippet: {
    title: string;
    description: string;
    channelId: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: YoutubeThumbnailSet;
  };
  contentDetails?: {
    duration: string;
  };
  statistics?: {
    viewCount?: string;
    likeCount?: string;
  };
};

export type YoutubeSearchResource = {
  id: { kind: string; videoId?: string; channelId?: string };
  snippet: {
    title: string;
    description: string;
    channelId: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: YoutubeThumbnailSet;
  };
};

export type YoutubeChannelResource = {
  id: string;
  snippet: {
    title: string;
    description: string;
    customUrl?: string;
    thumbnails: YoutubeThumbnailSet;
  };
  statistics?: {
    subscriberCount?: string;
    videoCount?: string;
  };
  brandingSettings?: {
    image?: {
      bannerExternalUrl?: string;
    };
  };
};

function getApiKey(): string {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    throw new AppError(
      "Missing YOUTUBE_API_KEY. Add it to .env.local to load videos.",
      "MISSING_API_KEY",
    );
  }
  return key;
}

export async function youtubeGet<T>(
  path: string,
  params: Record<string, string | number | undefined>,
): Promise<T> {
  const apiKey = getApiKey();
  const url = new URL(`${YOUTUBE_API_BASE}/${path}`);
  url.searchParams.set("key", apiKey);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url.toString(), {
    next: { revalidate: 300 },
  });

  const data = (await response.json()) as YoutubeListResponse<unknown> & T;

  if (!response.ok || data.error) {
    const reason = data.error?.errors?.[0]?.reason;
    if (reason === "quotaExceeded" || response.status === 403) {
      throw new AppError(
        data.error?.message ?? "YouTube API quota exceeded.",
        "QUOTA_EXCEEDED",
      );
    }
    throw new AppError(
      data.error?.message ?? `YouTube API error (${response.status})`,
      "API_ERROR",
    );
  }

  return data;
}
