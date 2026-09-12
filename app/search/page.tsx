import type { Metadata } from "next";
import { VideoGrid } from "@/components/video/video-grid";
import { getContainer } from "@/src/infrastructure/di/container";

type SearchPageProps = PageProps<"/search">;

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q : "";
  return { title: query ? `${query}` : "Search" };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";

  if (!query) {
    return (
      <p className="py-16 text-center text-[var(--yt-muted)]">
        Enter a search term to find videos.
      </p>
    );
  }

  const { searchVideos } = getContainer();
  const videos = await searchVideos(query);

  return (
    <div>
      <h1 className="mb-6 text-lg font-medium">
        Results for &ldquo;{query}&rdquo;
      </h1>
      <VideoGrid videos={videos} />
    </div>
  );
}
