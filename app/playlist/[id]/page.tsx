import { notFound } from 'next/navigation';
import { playlists, getTracksByIds } from '@/lib/mock-data';
import PlaylistView from '@/components/PlaylistView';

export function generateStaticParams() {
  return playlists.map((pl) => ({ id: pl.id }));
}

export default function PlaylistPage({ params }: { params: { id: string } }) {
  const playlist = playlists.find((pl) => pl.id === params.id);
  if (!playlist) notFound();

  const tracks = getTracksByIds(playlist.trackIds);

  return (
    <PlaylistView
      title={playlist.title}
      subtitle="پلی‌لیست"
      cover={playlist.cover}
      tracks={tracks}
    />
  );
}
