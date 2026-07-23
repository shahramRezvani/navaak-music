import Link from 'next/link';
import { albums, playlists } from '@/lib/mock-data';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <h1 className="text-3xl font-bold">سلام 👋</h1>

      <section>
        <h2 className="mb-4 text-xl font-bold">پلی‌لیست‌های پیشنهادی</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {playlists.map((pl) => (
            <Link
              key={pl.id}
              href={`/playlist/${pl.id}`}
              className="flex items-center gap-4 rounded-lg bg-white p-3 transition-colors hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
              <img
                src={pl.cover}
                alt={pl.title}
                className="h-16 w-16 rounded-md object-cover"
              />
              <div>
                <p className="font-semibold">{pl.title}</p>
                <p className="text-xs text-neutral-400">{pl.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">آلبوم‌ها</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {albums.map((al) => (
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
              <span className="text-xs text-neutral-400">
                {al.artistName} · {al.year}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
