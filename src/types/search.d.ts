/**
 * Types for Using Spotify's Search Endpoint
 */
export interface SpotifySearchReq {
  q: { query: string; filters: SpotifySearchQueryFilters };
  type: keyof SpotifySearchTypes;
  market?: string;
  limit?: number;
  offset?: number;
  include_external?: string;
}

export const enum SpotifySearchFilterTag {
  // The tag:new filter will return albums released in the past two weeks
  hipster = "tag:hipster",

  // The tag:hipster can be used to return only albums with the lowest 10%
  // popularity
  new = "tag:new",
}

export interface SpotifySearchQueryFilters {
  album?: string;
  artist?: string;
  track?: string;
  year?: number;
  upc?: string;
  // Can only use with albums
  tags?: SpotifySearchFilterTag;
  // Can only use with albumss
  isrc?: "isrc";
  genre?: string;
}

export const SpotifySearchTypes = {
  album = "album",
  artist = "artist",
  playlist = "playlist",
  track = "track",
  show = "show",
  episode = "episode",
  audiobook = "audiobook",
};

export interface SpotifySearchRes {
  tracks: Tracks;
  artists: Artists;
  albums: Albums;
  playlists: Playlists;
  shows: Audiobooks;
  episodes: Episodes;
  audiobooks: Audiobooks;
}

export interface Albums {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: AlbumElement[];
}

export interface AlbumElement {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: Restrictions;
  type: string;
  uri: string;
  artists: Artist[];
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export enum Href {
  String = "string",
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Restrictions {
  reason: string;
}

export interface Artists {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: ArtistElement[];
}

export interface ArtistElement {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface Followers {
  href: string;
  total: number;
}

export interface Audiobooks {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: AudiobooksItem[];
}

export interface AudiobooksItem {
  authors?: Author[];
  available_markets: Href[];
  copyrights: Copyright[];
  description: string;
  html_description: string;
  edition?: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  languages: Href[];
  media_type: string;
  name: string;
  narrators?: Author[];
  publisher: string;
  type: string;
  uri: string;
  total_chapters?: number;
  is_externally_hosted?: boolean;
  total_episodes?: number;
}

export interface Author {
  name: string;
}

export interface Copyright {
  text: string;
  type: string;
}

export interface Episodes {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: EpisodesItem[];
}

export interface EpisodesItem {
  audio_preview_url: string;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language: string;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  resume_point: ResumePoint;
  type: string;
  uri: string;
  restrictions: Restrictions;
}

export interface ResumePoint {
  fully_played: boolean;
  resume_position_ms: number;
}

export interface Playlists {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: PlaylistsItem[];
}

export interface PlaylistsItem {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  public: boolean;
  snapshot_id: string;
  tracks: Followers;
  type: string;
  uri: string;
}

export interface Owner {
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  type: string;
  uri: string;
  display_name: string;
}

export interface Tracks {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: TracksItem[];
}

export interface TracksItem {
  album: AlbumElement;
  artists: ArtistElement[];
  available_markets: Href[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: LinkedTracks;
  restrictions: Restrictions;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface ExternalIDS {
  isrc: string;
  ean: string;
  upc: string;
}

// Generated by https://quicktype.io

export interface LinkedTracks {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}
