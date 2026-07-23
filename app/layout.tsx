import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import Player from '@/components/Player';
import ThemeInit from '@/components/ThemeInit';

export const metadata: Metadata = {
  title: 'نواک | پخش موسیقی',
  description: 'اپ پخش موسیقی تمیز و کاربرمحور با داده‌های نمونه',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
        />
      </head>
      <body className="font-sans bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <ThemeInit />
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto pb-28">{children}</main>
        </div>
        <Player />
      </body>
    </html>
  );
}
