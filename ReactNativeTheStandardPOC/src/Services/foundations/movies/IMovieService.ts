
import { MovieListResponse } from "@/models/foundations/movies/movieList";


export interface IMovieService {
    retrieveAllMovieListsAsync(): Promise<MovieListResponse>;
}
