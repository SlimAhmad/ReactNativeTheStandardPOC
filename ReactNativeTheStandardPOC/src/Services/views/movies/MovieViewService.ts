import { DateTimeBroker } from '@/brokers/dateTimes/DateTimeBroker';
import { LoggingBroker } from '@/brokers/loggings/LoggingBroker';
import { MovieResponseView } from '@/models/views/movies/movieResponseView';
import { MovieListService } from '@/Services/foundations/movies/MovieService';

import { IDateTimeBroker } from '@/brokers/dateTimes/IDateTimeBroker';
import { ILoggingBroker } from '@/brokers/loggings/ILoggingBroker';
import { IMovieService } from '@/Services/foundations/movies/IMovieService';
import { IMovieViewService } from './IMovieViewService';
import { MovieViewServiceExceptions } from './partials/MovieViewServiceException';


export class MovieViewService implements IMovieViewService {
    private movieListExceptions: MovieViewServiceExceptions;
    private movieService: IMovieService;
    private dateTimeBroker: IDateTimeBroker;
    private loggingBroker: ILoggingBroker;

    constructor(
        movieService?: IMovieService,
        dateTimeBroker?: IDateTimeBroker,
        loggingBroker?: ILoggingBroker,
    ) {
        this.movieService = movieService ?? new MovieListService();
        this.loggingBroker = loggingBroker ?? new LoggingBroker(),
            this.dateTimeBroker = dateTimeBroker ?? new DateTimeBroker(),
            this.movieListExceptions = new MovieViewServiceExceptions(loggingBroker);
    }

    async retrieveAllMovieViewsAsync(): Promise<MovieResponseView> {
        return this.movieListExceptions.tryCatchList(async () => {
            const movieListResponse = await this.movieService.retrieveAllMovieListsAsync();
            return MovieResponseView.fromModel(movieListResponse);
        });
    }
}