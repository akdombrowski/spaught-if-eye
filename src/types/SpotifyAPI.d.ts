export interface SpotifyAPIUserTopResponse {
  items: Track[] | Album[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  next: string;
  previous: null;
}

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;

  /**
   * The popularity of the track. The value will be between 0 and 100, with 100
   *  being the most popular. The popularity of a track is a value between 0 and
   *  100, with 100 being the most popular. The popularity is calculated by
   *  algorithm and is based, in the most part, on the total number of plays the
   *  track has had and how recent those plays are. Generally speaking, songs
   *  that are being played a lot now will have a higher popularity than songs
   *  that were played a lot in the past. Duplicate tracks (e.g. the same track
   *  from a single and an album) are rated independently. Artist and album
   *  popularity is derived mathematically from track popularity. Note: the
   *  popularity value may lag actual popularity by a few days: the value is not
   *  updated in real time.
   */
  popularity: number;
  preview_url: string;
  track_number: number;
  type: ItemType;
  uri: string;
}

export interface Album {
  album_type: AlbumType;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: ReleaseDatePrecision;
  total_tracks: number;
  type: AlbumTypeEnum;
  uri: string;
}

export enum AlbumType {
  Album = "ALBUM",
  Single = "SINGLE",
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: ArtistType;
  uri: string;
  popularity?: number;
}

export interface ExternalUrls {
  spotify: string;
}

export enum ArtistType {
  Artist = "artist",
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export enum ReleaseDatePrecision {
  Day = "day",
  Year = "year",
}

export enum AlbumTypeEnum {
  Album = "album",
}

export interface ExternalIDS {
  isrc: string;
}

export enum ItemType {
  Track = "track",
  Album = "album",
}
