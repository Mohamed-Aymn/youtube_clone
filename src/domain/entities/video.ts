export type VideoThumbnail = {
  url: string;
  width: number;
  height: number;
};

export type Video = {
  id: string;
  title: string;
  description: string;
  channelId: string;
  channelTitle: string;
  publishedAt: string;
  thumbnail: VideoThumbnail;
  duration?: string;
  viewCount?: number;
  likeCount?: number;
};
