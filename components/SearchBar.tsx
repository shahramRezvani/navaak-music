'use client';

import { useMemo, useState } from 'react';
import { searchAll } from '@/lib/mock-data';
import TrackList from './TrackList';
import Link from 'next/link';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchAll(query), [query]);
  const hasQuery = query.trim().length > 0;
  const empty =
    hasQuery &&
    !results.tracks.length &&
    !results.albums.length &&
    !results.artists.length;

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400">
          🔍
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="نام آهنگ، آلبوم یا آرتیست..."
          autoFocus
          className="w-full rounded-full border border-neutral-200 bg-white py-3 pr-12 pl-4 text-sm outline-none transition-colors focus:border-brand dark:border-neutral-700 dark:bg-neutral-900"
        />
      </div>

      {!hasQuery && (
        <p className="text-sm text-neutral-400">
          برای شروع، چیزی بنویس. مثلاً «چاوشی» یا «Daft».
        </p>
      )}

      {empty && (
        <p className="text-sm text-neutral-400">
          نتیجه‌ای برای «{query}» پیدا نشد.
        </p>
      )}

      {!!results.artists.length && (
        <section>
          <h2 className="mb-3 text-lg font-bold">آرتیست‌ها</h2>
          <div className="flex flex-wrap gap-4">
            {results.artists.map((a) => (
              <div key={a.id} className="flex w-28 flex-col items-center gap-2">
                <img
                  src={a.cover}
                  alt={a.name}
                  className="h-24 w-24 rounded-full object-cover"
                />
                <span className="text-center text-sm">{a.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {!!results.albums.length && (
        <section>
          <h2 className="mb-3 text-lg font-bold">آلبوم‌ها</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {results.albums.map((al) => (
              <Link
                key={al.id}
                href={`/album/${al.id}`}
                className="flex flex-col gap-2 rounded-lg p-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <img
                  src={al.cover}
                  alt={al.title}
                  className="aspect-square w-full rounded-md object-cover"
                />
                <span className="text-sm font-medium">{al.title}</span>
                <span className="text-xs text-neutral-400">{al.artistName}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {!!results.tracks.length && (
        <section>
          <h2 className="mb-3 text-lg font-bold">آهنگ‌ها</h2>
          <TrackList tracks={results.tracks} />
        </section>
      )}
    </div>
  );
}
