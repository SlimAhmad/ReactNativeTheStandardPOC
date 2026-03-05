import { MovieListResponse } from "../../../../models/foundations/movies/movieList"

export interface IApiBrokerMovieList {
    getAllMovieListsAsync(): Promise<MovieListResponse>
}