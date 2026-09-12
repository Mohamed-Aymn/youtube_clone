"use client";

import Image from "next/image";
import { useState } from "react";

type VideoPlayerProps = {
  videoId: string;
  title: string;
  thumbnailUrl: string;
};

export function VideoPlayer({ videoId, title, thumbnailUrl }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
      {thumbnailUrl ? (
        <Image
          src={thumbnailUrl}
          alt=""
          fill
          className={`object-cover transition-opacity ${playing ? "opacity-40" : "opacity-100"}`}
          sizes="(max-width: 1024px) 100vw, 70vw"
          priority
        />
      ) : null}

      {!playing ? (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 flex items-center justify-center"
          aria-label={`Play ${title}`}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/70 text-white transition hover:scale-105 hover:bg-red-600">
            <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden>
              <path fill="currentColor" d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/55 px-6 text-center text-white">
          <p className="text-lg font-medium">{title}</p>
          <p className="text-sm text-white/80">
            Local mock player · id: {videoId}
          </p>
          <button
            type="button"
            onClick={() => setPlaying(false)}
            className="mt-2 rounded-full bg-white/15 px-4 py-1.5 text-sm hover:bg-white/25"
          >
            Pause
          </button>
        </div>
      )}
    </div>
  );
}
