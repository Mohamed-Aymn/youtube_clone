import { VideoGrid } from "@/components/video/video-grid";
import { getContainer } from "@/src/infrastructure/di/container";

export default async function HomePage() {
  const { getHomeFeed } = getContainer();
  const videos = await getHomeFeed();

  return (
    <div>
      <h1 className="sr-only">Home</h1>
      <VideoGrid videos={videos} />
    </div>
  );
}
