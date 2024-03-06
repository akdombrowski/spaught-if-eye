import { PageByPathnameType } from "./pages.d";
export type PageByPathnameType = Record<
  string,
  {
    title: string;
  }
>;

export type PageByVarNameType = Record<string, { path: string; title: string }>;

export interface Pages {
  topTracks: { path: string; title: string };
  search: { path: string; title: string };
  home: { path: string; title: string };
}
