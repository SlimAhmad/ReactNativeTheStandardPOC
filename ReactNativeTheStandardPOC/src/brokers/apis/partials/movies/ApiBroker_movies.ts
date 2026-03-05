import { MovieListResponse } from "../../../../models/foundations/movies/movieList"
import { ApiBroker } from "../../ApiBroker"
import { IApiBrokerMovieList } from "./IApiBroker_movies"

export class ApiBrokerMovieList
    extends ApiBroker
    implements IApiBrokerMovieList {
    private relativeUrl = "/trending/movie/day"

    async getAllMovieListsAsync(): Promise<MovieListResponse> {
        return this.getAsync<MovieListResponse>(
            this.relativeUrl
        )
    }
}