import { Movie } from "./movie"

export class MovieListResponse {
  page: number
  results: Movie[]
  totalPages: number
  totalResults: number

  constructor({
    page,
    results,
    totalPages,
    totalResults
  }: {
    page: number
    results: Movie[]
    totalPages: number
    totalResults: number
  }) {
    this.page = page
    this.results = results
    this.totalPages = totalPages
    this.totalResults = totalResults
  }

  static fromJson(json: any): MovieListResponse {
    return new MovieListResponse({
      page: json.page ?? 0,
      results: (json.results ?? []).map((e: any) =>
        Movie.fromJson(e)
      ),
      totalPages: json.total_pages ?? 0,
      totalResults: json.total_results ?? 0
    })
  }

  toJson() {
    return {
      page: this.page,
      results: this.results.map(r => r.toJson()),
      total_pages: this.totalPages,
      total_results: this.totalResults
    }
  }
}