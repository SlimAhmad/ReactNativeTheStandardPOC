// movie-list-view-service-exceptions.ts

import {
    MovieListViewDependencyException,
    MovieListViewDependencyValidationException,
    MovieListViewServiceException,
    MovieListViewValidationException
} from '../../../../models/views/movies/exceptions/movieViewExceptions';

import { ILoggingBroker } from '@/brokers/loggings/ILoggingBroker';
import { MovieDependencyException, MovieServiceException } from '@/models/foundations/movies/exceptions/movieExceptions';
import { LoggingBroker } from '../../../../brokers/loggings/LoggingBroker';
import { MovieResponseView } from '../../../../models/views/movies/movieResponseView';

export class MovieViewServiceExceptions {
    private loggingBroker: ILoggingBroker;

    constructor(loggingBroker?: ILoggingBroker) {
        this.loggingBroker = loggingBroker ?? new LoggingBroker();
    }

    async tryCatchList(
        returningMovieListViewsFunction: () => Promise<MovieResponseView>
    ): Promise<MovieResponseView> {
        try {
            return await returningMovieListViewsFunction();
        } catch (error) {
            if (error instanceof MovieDependencyException) {
                throw await this.createAndLogDependencyExceptionAsync(error);
            }
            if (error instanceof MovieServiceException) {
                throw await this.createAndLogServiceExceptionAsync(error);
            }

            throw await this.createAndLogServiceExceptionAsync(
                error instanceof Error ? error : new Error(String(error))
            );
        }
    }

    private async createAndLogValidationExceptionAsync(
        exception: Error
    ): Promise<MovieListViewValidationException> {
        const movieListViewValidationException = new MovieListViewValidationException(
            exception,
            "MovieList validation error occurred, fix the errors and try again.",
        );
        this.loggingBroker.logError(movieListViewValidationException);
        return movieListViewValidationException;
    }

    private async createAndLogDependencyValidationExceptionAsync(
        exception: Error
    ): Promise<MovieListViewDependencyValidationException> {
        const movieListViewDependencyValidationException =
            new MovieListViewDependencyValidationException(
                exception,
                "MovieList validation error occurred, fix errors and try again.",
            );
        this.loggingBroker.logError(movieListViewDependencyValidationException);
        return movieListViewDependencyValidationException;
    }

    private async createAndLogDependencyExceptionAsync(
        exception: Error
    ): Promise<MovieListViewDependencyException> {
        const movieListViewDependencyException = new MovieListViewDependencyException(
            exception,
            "MovieList dependency error occurred, contact support.",
        );
        this.loggingBroker.logError(movieListViewDependencyException);
        return movieListViewDependencyException;
    }

    private async createAndLogServiceExceptionAsync(
        exception: Error
    ): Promise<MovieListViewServiceException> {
        const movieListViewServiceException = new MovieListViewServiceException(
            exception,
            "MovieList service error occurred, contact support.",
        );
        this.loggingBroker.logError(movieListViewServiceException);
        return movieListViewServiceException;
    }
}