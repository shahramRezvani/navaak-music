'use client';

import { useEffect } from 'react';
import { usePlayerStore, selectCurrentTrack } from '@/lib/player-store';
import { formatTime } from '@/lib/mock-data';

/**
 * Bottom playback bar.
 * NOTE: This is a mock player — there are no real audio files. Playback progress
 * is simulated with a timer so the controls, progress bar and queue behave
 * realistically for demo/testing purposes.
 */
export default function Player() {
  const current = usePlayerStore(selectCurrentTrack);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const progress = usePlayerStore((s) => s.progress);
  const togglePlay = usePlayerStore((s) => s.togglePlay);
  const next = usePlayerStore((s) => s.next);
  const prev = usePlayerStore((s) => s.prev);
  const setProgress = usePlayerStore((s) => s.setProgress);

  // Simulate playback progress with a 1s tick.
  useEffect(() => {
    if (!isPlaying || !current) return;
    const id = setInterval(() => {
      const { progress: p, next: goNext } = usePlayerStore.getState();
      if (p + 1 >= current.duration) {
        goNext();
      } else {
        setProgress(p + 1);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [isPlaying, current, setProgress]);

  if (!current) {
    return (
      <footer className="fixed bottom-0 right-0 left-0 flex h-20 items-center justify-center border-t border-neutral-200 bg-white text-sm text-neutral-400 dark:border-neutral-800 dark:bg-neutral-900">
        یک آهنگ انتخاب کن تا پخش شود 🎧
      </footer>
    );
  }

  const pct = Math.min(100, (progress / current.duration) * 100);

  return (
    <footer className="fixed bottom-0 right-0 left-0 flex h-24 items-center gap-4 border-t border-neutral-200 bg-white px-4 dark:border-neutral-800 dark:bg-neutral-900">
      {/* Track info */}
      <div className="flex w-1/4 min-w-0 items-center gap-3">
        <img
          src={current.cover}
          alt={current.album}
          className="h-14 w-14 rounded-md object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{current.title}</p>
          <p className="truncate text-xs text-neutral-400">{current.artistName}</p>
        </div>
      </div>

      {/* Controls + progress */}
      <div className="flex flex-1 flex-col items-center gap-1">
        <div className="flex items-center gap-6 text-xl">
          <button onClick={next} title="بعدی" className="hover:text-brand">
            ⏭
          </button>
          <button
            onClick={togglePlay}
            title={isPlaying ? 'مکث' : 'پخش'}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-hover"
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button onClick={prev} title="قبلی" className="hover:text-brand">
            ⏮
          </button>
        </div>
        <div className="flex w-full max-w-md items-center gap-2">
          <span className="w-10 text-left text-xs text-neutral-400">
            {formatTime(progress)}
          </span>
          <input
            type="range"
            min={0}
            max={current.duration}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="flex-1 bg-neutral-200 dark:bg-neutral-700"
            style={{
              background: `linear-gradient(to left, #7c3aed ${pct}%, transparent ${pct}%)`,
            }}
          />
          <span className="w-10 text-xs text-neutral-400">
            {formatTime(current.duration)}
          </span>
        </div>
      </div>

      <div className="hidden w-1/4 justify-end md:flex" />
    </footer>
  );
}
