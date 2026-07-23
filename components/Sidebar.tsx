'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useThemeStore } from '@/lib/theme-store';
import { playlists } from '@/lib/mock-data';

const navItems = [
  { href: '/', label: 'خانه', icon: '🏠' },
  { href: '/search', label: 'جستجو', icon: '🔍' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const theme = useThemeStore((s) => s.theme);
  const toggle = useThemeStore((s) => s.toggle);

  return (
    <aside className="hidden w-64 flex-col gap-6 border-l border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900 md:flex">
      <div className="flex items-center gap-2 text-2xl font-bold text-brand">
        <span>🎵</span>
        <span>نواک</span>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? 'bg-brand/10 text-brand'
                  : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-2">
        <h2 className="px-3 text-xs font-semibold uppercase text-neutral-400">
          پلی‌لیست‌ها
        </h2>
        {playlists.map((pl) => (
          <Link
            key={pl.id}
            href={`/playlist/${pl.id}`}
            className={`rounded-lg px-3 py-2 text-sm transition-colors ${
              pathname === `/playlist/${pl.id}`
                ? 'bg-brand/10 text-brand'
                : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
            }`}
          >
            {pl.title}
          </Link>
        ))}
      </div>

      <button
        onClick={toggle}
        className="mt-auto flex items-center justify-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
      >
        {theme === 'dark' ? '☀️ حالت روشن' : '🌙 حالت تاریک'}
      </button>
    </aside>
  );
}
