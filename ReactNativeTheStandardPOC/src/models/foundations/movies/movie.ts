export class Movie {
  description: string
  favoriteCount: number
  id: number
  itemCount: number
  iso639_1: string
  listType: string
  name: string
  posterPath?: string | null

  constructor({
    description,
    favoriteCount,
    id,
    itemCount,
    iso639_1,
    listType,
    name,
    posterPath
  }: {
    description: string
    favoriteCount: number
    id: number
    itemCount: number
    iso639_1: string
    listType: string
    name: string
    posterPath?: string | null
  }) {
    this.description = description
    this.favoriteCount = favoriteCount
    this.id = id
    this.itemCount = itemCount
    this.iso639_1 = iso639_1
    this.listType = listType
    this.name = name
    this.posterPath = posterPath ?? null
  }

  static fromJson(json: any): Movie {
    return new Movie({
      description: json.overview ?? "",
      favoriteCount: json.favorite_count ?? 0,
      id: json.id ?? 0,
      itemCount: json.item_count ?? 0,
      iso639_1: json.iso_639_1 ?? "",
      listType: json.list_type ?? "",
      name: json.title ?? "",
      posterPath: json.poster_path ?? null
    })
  }

  toJson() {
    return {
      description: this.description,
      favorite_count: this.favoriteCount,
      id: this.id,
      item_count: this.itemCount,
      iso_639_1: this.iso639_1,
      list_type: this.listType,
      name: this.name,
      poster_path: this.posterPath
    }
  }
}