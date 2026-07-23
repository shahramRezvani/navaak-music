import type { Album, Artist, Playlist, Track } from './types';

// ---- Mock artists ----
export const artists: Artist[] = [
  { id: 'ar1', name: 'همایون شجریان', cover: 'https://picsum.photos/seed/ar1/300/300' },
  { id: 'ar2', name: 'محسن چاوشی', cover: 'https://picsum.photos/seed/ar2/300/300' },
  { id: 'ar3', name: 'سینا سرلک', cover: 'https://picsum.photos/seed/ar3/300/300' },
  { id: 'ar4', name: 'Daft Punk', cover: 'https://picsum.photos/seed/ar4/300/300' },
  { id: 'ar5', name: 'Tame Impala', cover: 'https://picsum.photos/seed/ar5/300/300' },
];

// ---- Mock albums ----
export const albums: Album[] = [
  { id: 'al1', title: 'ایران من', artistId: 'ar1', artistName: 'همایون شجریان', cover: 'https://picsum.photos/seed/al1/300/300', year: 2021, trackIds: ['t1', 't2'] },
  { id: 'al2', title: 'ابراهیم', artistId: 'ar2', artistName: 'محسن چاوشی', cover: 'https://picsum.photos/seed/al2/300/300', year: 2020, trackIds: ['t3', 't4'] },
  { id: 'al3', title: 'کوچ', artistId: 'ar3', artistName: 'سینا سرلک', cover: 'https://picsum.photos/seed/al3/300/300', year: 2019, trackIds: ['t5'] },
  { id: 'al4', title: 'Discovery', artistId: 'ar4', artistName: 'Daft Punk', cover: 'https://picsum.photos/seed/al4/300/300', year: 2001, trackIds: ['t6', 't7'] },
  { id: 'al5', title: 'Currents', artistId: 'ar5', artistName: 'Tame Impala', cover: 'https://picsum.photos/seed/al5/300/300', year: 2015, trackIds: ['t8'] },
];

// ---- Mock tracks ----
export const tracks: Track[] = [
  { id: 't1', title: 'چراغ راه', artistId: 'ar1', artistName: 'همایون شجریان', album: 'ایران من', albumId: 'al1', cover: 'https://picsum.photos/seed/al1/300/300', duration: 245 },
  { id: 't2', title: 'ابر می‌بارد', artistId: 'ar1', artistName: 'همایون شجریان', album: 'ایران من', albumId: 'al1', cover: 'https://picsum.photos/seed/al1/300/300', duration: 312 },
  { id: 't3', title: 'ابراهیم', artistId: 'ar2', artistName: 'محسن چاوشی', album: 'ابراهیم', albumId: 'al2', cover: 'https://picsum.photos/seed/al2/300/300', duration: 268 },
  { id: 't4', title: 'خودکشی ممنوع', artistId: 'ar2', artistName: 'محسن چاوشی', album: 'ابراهیم', albumId: 'al2', cover: 'https://picsum.photos/seed/al2/300/300', duration: 224 },
  { id: 't5', title: 'کوچ بنفشه‌ها', artistId: 'ar3', artistName: 'سینا سرلک', album: 'کوچ', albumId: 'al3', cover: 'https://picsum.photos/seed/al3/300/300', duration: 298 },
  { id: 't6', title: 'One More Time', artistId: 'ar4', artistName: 'Daft Punk', album: 'Discovery', albumId: 'al4', cover: 'https://picsum.photos/seed/al4/300/300', duration: 320 },
  { id: 't7', title: 'Harder Better Faster', artistId: 'ar4', artistName: 'Daft Punk', album: 'Discovery', albumId: 'al4', cover: 'https://picsum.photos/seed/al4/300/300', duration: 224 },
  { id: 't8', title: 'The Less I Know', artistId: 'ar5', artistName: 'Tame Impala', album: 'Currents', albumId: 'al5', cover: 'https://picsum.photos/seed/al5/300/300', duration: 216 },
];

// ---- Mock playlists ----
export const playlists: Playlist[] = [
  { id: 'pl1', title: 'منتخب فارسی', description: 'بهترین‌های موسیقی ایرانی', cover: 'https://picsum.photos/seed/pl1/300/300', trackIds: ['t1', 't3', 't5', 't2'] },
  { id: 'pl2', title: 'تمرکز و کار', description: 'ریتم‌های آرام برای تمرکز', cover: 'https://picsum.photos/seed/pl2/300/300', trackIds: ['t8', 't6', 't2'] },
  { id: 'pl3', title: 'انرژی صبحگاهی', description: 'شروع پرانرژی روز', cover: 'https://picsum.photos/seed/pl3/300/300', trackIds: ['t7', 't6', 't4'] },
];

// ---- Helpers ----
export const getTrackById = (id: string): Track | undefined =>
  tracks.find((t) => t.id === id);

export const getTracksByIds = (ids: string[]): Track[] =>
  ids.map((id) => getTrackById(id)).filter((t): t is Track => Boolean(t));

export interface SearchResults {
  tracks: Track[];
  albums: Album[];
  artists: Artist[];
}

export const searchAll = (query: string): SearchResults => {
  const q = query.trim().toLowerCase();
  if (!q) return { tracks: [], albums: [], artists: [] };
  return {
    tracks: tracks.filter(
      (t) => t.title.toLowerCase().includes(q) || t.artistName.toLowerCase().includes(q),
    ),
    albums: albums.filter(
      (a) => a.title.toLowerCase().includes(q) || a.artistName.toLowerCase().includes(q),
    ),
    artists: artists.filter((a) => a.name.toLowerCase().includes(q)),
  };
};

export const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};
