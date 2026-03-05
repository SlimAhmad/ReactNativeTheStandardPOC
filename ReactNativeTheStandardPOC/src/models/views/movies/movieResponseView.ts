import { MovieListResponse } from "@/models/foundations/movies/movieList"
import { Movie } from "../../../models/foundations/movies/movie"

export class MovieResponseView {
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

    static fromModel(response: MovieListResponse): MovieResponseView {
        return new MovieResponseView({
            page: response.page,
            results: response.results,
            totalPages: response.totalPages,
            totalResults: response.totalResults,
        });
    }
}
