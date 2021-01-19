export interface GenreForState {
  value: string;
  label: string;
}
export interface GenreFromResponse {
  id: number;
  name: string;
}
export interface MediaItem {
  id: number;
  poster_path: string;
  original_title: string;
  original_name: string;
  name: string;
}
export interface QueryMap {
  [key: string]: string;
}
