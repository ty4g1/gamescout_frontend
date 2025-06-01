export interface GameApiResponse {
  count: number
  games: Game[]
}

export interface Game {
  AppId: number
  Name: string
  ShortDesc: string
  Price: number
  InitialPrice: number
  Discount: number
  ReleaseDate: string
  Genres: string[]
  Tags: Record<string, number>
  Positive: number
  Negative: number
  Platforms: string[]
  FeatureVector: number[]
  media: Media
}

export interface Media {
  AppID: number
  ThumbnailURL: string
  BackgroundURL: string
  Screenshots: Screenshot[]
  Movies: Movie[]
}

export interface Screenshot {
  id: number
  path_thumbnail: string
  path_full: string
}

export interface Movie {
  id: number
  name: string
  thumbnail: string
  webm: Video
  mp4: Video
  highlight: boolean
}

export interface Video {
  "480": string
  max: string
}

export interface UserApiResponse {
  user: User
}

export interface User {
  ID: string
  SwipeHistory: number[]
  PreferenceVector: number[]
}

export interface PreferenceApiResponse {
  PreferenceVector: number[]
}

export interface TagsApiResponse {
  count: number
  tags: string[]
}

export interface GenresApiResponse {
  count: number
  genres: string[]
}

export interface Filters {
  limit: number
  min_price: number
  max_price: number
  release_date: string // format is 2006-01-02
  before: boolean
  tags: string[] // to be comma separated in query
  genres: string[] // to be comma separated in query
  platforms: string[] // to be comma separated in query
}