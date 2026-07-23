export interface Artist {
  id: string;
  name: string;
  cover: string;
}

export interface Track {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  album: string;
  albumId: string;
  cover: string;
  /** duration in seconds */
  duration: number;
}

export interface Album {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  cover: string;
  year: number;
  trackIds: string[];
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  cover: string;
  trackIds: string[];
}
