'use client';

import { usePlayerStore } from '@/lib/player-store';
import { formatTime } from '@/lib/mock-data';
import type { Track } from '@/lib/types';
import TrackList from './TrackList';

interface Props {
  title: string;
  subtitle?: string;
  cover: string;
  tracks: Track[];
}

/** Reusable header + track list used by playlist and album pages. */
export default function PlaylistView({ title, subtitle, cover, tracks }: Props) {
  const playQueue = usePlayerStore((s) => s.playQueue);
  const totalDuration = tracks.reduce((sum, t) => sum + t.duration, 0);

  return (
    <div className="flex flex-col gap-6 p-6">
      <header className="flex flex-col items-center gap-4 sm:flex-row sm:items-end">
        <img
          src={cover}
          alt={title}
          className="h-44 w-44 rounded-lg object-cover shadow-lg"
        />
        <div className="flex flex-col items-center gap-2 sm:items-start">
          {subtitle && (
            <span className="text-xs font-semibold uppercase text-neutral-400">
              {subtitle}
            </span>
          )}
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-sm text-neutral-400">
            {tracks.length} آهنگ · {formatTime(totalDuration)}
          </p>
          <button
            onClick={() => playQueue(tracks, 0)}
            disabled={!tracks.length}
            className="mt-2 rounded-full bg-brand px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-hover disabled:opacity-50"
          >
            ▶ پخش همه
          </button>
        </div>
      </header>

      <TrackList tracks={tracks} />
    </div>
  );
}
