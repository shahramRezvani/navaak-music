'use client';

import { create } from 'zustand';
import type { Track } from './types';

interface PlayerState {
  queue: Track[];
  currentIndex: number;
  isPlaying: boolean;
  /** simulated playback progress in seconds (no real audio file — mock data) */
  progress: number;

  playTrack: (track: Track, queue?: Track[]) => void;
  playQueue: (queue: Track[], startIndex?: number) => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  setProgress: (progress: number) => void;
  addToQueue: (track: Track) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  queue: [],
  currentIndex: -1,
  isPlaying: false,
  progress: 0,

  playTrack: (track, queue) =>
    set(() => {
      const newQueue = queue ?? [track];
      const idx = newQueue.findIndex((t) => t.id === track.id);
      return {
        queue: newQueue,
        currentIndex: idx >= 0 ? idx : 0,
        isPlaying: true,
        progress: 0,
      };
    }),

  playQueue: (queue, startIndex = 0) =>
    set(() => ({
      queue,
      currentIndex: queue.length ? startIndex : -1,
      isPlaying: queue.length > 0,
      progress: 0,
    })),

  togglePlay: () =>
    set((state) => ({
      isPlaying: state.currentIndex >= 0 ? !state.isPlaying : false,
    })),

  next: () => {
    const { queue, currentIndex } = get();
    if (!queue.length) return;
    const nextIndex = (currentIndex + 1) % queue.length;
    set({ currentIndex: nextIndex, progress: 0, isPlaying: true });
  },

  prev: () => {
    const { queue, currentIndex, progress } = get();
    if (!queue.length) return;
    // restart current track if more than 3s in, otherwise go to previous
    if (progress > 3) {
      set({ progress: 0 });
      return;
    }
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    set({ currentIndex: prevIndex, progress: 0, isPlaying: true });
  },

  setProgress: (progress) => set({ progress }),

  addToQueue: (track) =>
    set((state) => ({ queue: [...state.queue, track] })),
}));

export const selectCurrentTrack = (state: PlayerState): Track | null =>
  state.currentIndex >= 0 ? state.queue[state.currentIndex] ?? null : null;
