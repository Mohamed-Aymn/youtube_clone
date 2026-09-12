import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChannelHeader } from "@/components/channel/channel-header";
import { VideoGrid } from "@/components/video/video-grid";
import type { Channel } from "@/src/domain/entities/channel";
import type { Video } from "@/src/domain/entities/video";
import { AppError } from "@/src/domain/errors";
import { getContainer } from "@/src/infrastructure/di/container";

type ChannelPageProps = PageProps<"/channel/[id]">;

export async function generateMetadata({
  params,
}: ChannelPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const { getChannel } = getContainer();
    const channel = await getChannel(id);
    return { title: channel.title };
  } catch {
    return { title: "Channel" };
  }
}

export default async function ChannelPage({ params }: ChannelPageProps) {
  const { id } = await params;
  const { getChannel, getChannelVideos } = getContainer();

  let channel: Channel | null = null;
  let videos: Video[] = [];

  try {
    channel = await getChannel(id);
    videos = await getChannelVideos(id);
  } catch (error) {
    if (error instanceof AppError && error.code === "NOT_FOUND") {
      notFound();
    }
    throw error;
  }

  if (!channel) {
    notFound();
  }

  return (
    <div>
      <ChannelHeader channel={channel} />
      <h2 className="mb-4 text-lg font-medium">Videos</h2>
      <VideoGrid videos={videos} />
    </div>
  );
}
