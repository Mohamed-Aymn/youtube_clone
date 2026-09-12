import { createGetChannel } from "@/src/application/use-cases/get-channel";
import { createGetChannelVideos } from "@/src/application/use-cases/get-channel-videos";
import { createGetHomeFeed } from "@/src/application/use-cases/get-home-feed";
import { createGetRelatedVideos } from "@/src/application/use-cases/get-related-videos";
import { createGetVideo } from "@/src/application/use-cases/get-video";
import { createSearchVideos } from "@/src/application/use-cases/search-videos";
import { createMockChannelRepository } from "@/src/infrastructure/mock/channel-repository";
import { createMockVideoRepository } from "@/src/infrastructure/mock/video-repository";

export type Container = {
  getHomeFeed: ReturnType<typeof createGetHomeFeed>;
  getVideo: ReturnType<typeof createGetVideo>;
  getRelatedVideos: ReturnType<typeof createGetRelatedVideos>;
  searchVideos: ReturnType<typeof createSearchVideos>;
  getChannel: ReturnType<typeof createGetChannel>;
  getChannelVideos: ReturnType<typeof createGetChannelVideos>;
};

let container: Container | null = null;

export function getContainer(): Container {
  if (container) return container;

  const videoRepository = createMockVideoRepository();
  const channelRepository = createMockChannelRepository();

  container = {
    getHomeFeed: createGetHomeFeed(videoRepository),
    getVideo: createGetVideo(videoRepository, channelRepository),
    getRelatedVideos: createGetRelatedVideos(videoRepository),
    searchVideos: createSearchVideos(videoRepository),
    getChannel: createGetChannel(channelRepository),
    getChannelVideos: createGetChannelVideos(videoRepository),
  };

  return container;
}
