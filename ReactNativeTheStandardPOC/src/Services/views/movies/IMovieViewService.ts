// movie-list-view-service.ts


import { MovieResponseView } from '@/models/views/movies/movieResponseView';

export interface IMovieViewService {
    retrieveAllMovieViewsAsync(): Promise<MovieResponseView>;
}

