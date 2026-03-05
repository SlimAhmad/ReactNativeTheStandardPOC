// movie-list-service.ts

import { ApiBrokerMovieList } from "@/brokers/apis/partials/movies/ApiBroker_movies";
import { IApiBrokerMovieList } from "@/brokers/apis/partials/movies/IApiBroker_movies";
import { ILoggingBroker } from "@/brokers/loggings/ILoggingBroker";
import { LoggingBroker } from "@/brokers/loggings/LoggingBroker";
import { MovieListResponse } from "@/models/foundations/movies/movieList";
import { IMovieService } from "./IMovieService";
import { MovieServiceExceptions } from "./partials/MovieServiceExceptions";


export class MovieListService implements IMovieService {
    private movieListExceptions: MovieServiceExceptions;
    private apiBrokerMovieList: IApiBrokerMovieList;
    private loggingBroker: ILoggingBroker;

    constructor(
        apiBrokerMovieList?: IApiBrokerMovieList,
        loggingBroker?: ILoggingBroker) {
        this.apiBrokerMovieList = apiBrokerMovieList ?? new ApiBrokerMovieList();
        this.loggingBroker = loggingBroker ?? new LoggingBroker();
        this.movieListExceptions = new MovieServiceExceptions(loggingBroker);
    }

    async retrieveAllMovieListsAsync(): Promise<MovieListResponse> {
        return this.movieListExceptions.tryCatch(async () => {
            const response = await this.apiBrokerMovieList.getAllMovieListsAsync();
            return response;
        });
    }
}