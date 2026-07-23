import { notFound } from 'next/navigation';
import { albums, getTracksByIds } from '@/lib/mock-data';
import PlaylistView from '@/components/PlaylistView';

export function generateStaticParams() {
  return albums.map((al) => ({ id: al.id }));
}

export default function AlbumPage({ params }: { params: { id: string } }) {
  const album = albums.find((al) => al.id === params.id);
  if (!album) notFound();

  const tracks = getTracksByIds(album.trackIds);

  return (
    <PlaylistView
      title={album.title}
      subtitle={`آلبوم · ${album.year}`}
      cover={album.cover}
      tracks={tracks}
    />
  );
}
