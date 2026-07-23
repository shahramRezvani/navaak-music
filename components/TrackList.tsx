'use client';

import { usePlayerStore, selectCurrentTrack } from '@/lib/player-store';
import { formatTime } from '@/lib/mock-data';
import type { Track } from '@/lib/types';

interface Props {
  tracks: Track[];
  /** show index numbers on the right */
  numbered?: boolean;
}

export default function TrackList({ tracks, numbered = true }: Props) {
  const playTrack = usePlayerStore((s) => s.playTrack);
  const addToQueue = usePlayerStore((s) => s.addToQueue);
  const current = usePlayerStore(selectCurrentTrack);
  const isPlaying = usePlayerStore((s) => s.isPlaying);

  if (!tracks.length) {
    return (
      <p className="py-8 text-center text-sm text-neutral-400">
        آهنگی برای نمایش وجود ندارد.
      </p>
    );
  }

  return (
    <ul className="flex flex-col divide-y divide-neutral-100 dark:divide-neutral-800">
      {tracks.map((track, i) => {
        const active = current?.id === track.id;
        return (
          <li
            key={track.id}
            className="group flex items-center gap-4 px-3 py-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800/60"
          >
            {numbered && (
              <span className="w-6 text-center text-sm text-neutral-400">
                {active && isPlaying ? '▶' : i + 1}
              </span>
            )}
            <img
              src={track.cover}
              alt={track.album}
              className="h-10 w-10 rounded object-cover"
            />
            <button
              onClick={() => playTrack(track, tracks)}
              className="flex flex-1 flex-col items-start text-right"
            >
              <span
                className={`text-sm font-medium ${
                  active ? 'text-brand' : ''
                }`}
              >
                {track.title}
              </span>
              <span className="text-xs text-neutral-400">{track.artistName}</span>
            </button>
            <button
              onClick={() => addToQueue(track)}
              title="افزودن به صف"
              className="opacity-0 transition-opacity group-hover:opacity-100 text-neutral-400 hover:text-brand"
            >
              ＋
            </button>
            <span className="w-12 text-left text-xs text-neutral-400">
              {formatTime(track.duration)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
