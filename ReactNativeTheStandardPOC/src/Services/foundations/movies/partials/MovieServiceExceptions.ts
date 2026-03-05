import {
    AlreadyExistsMovieException,
    InvalidMovieException,
    MovieDependencyException,
    MovieDependencyValidationException,
    MovieServiceException,
    MovieValidationException,
    NotFoundMovieException
} from "../../../../models/foundations/movies/exceptions/movieExceptions";

import { ILoggingBroker } from "@/brokers/loggings/ILoggingBroker";
import { LoggingBroker } from "../../../../brokers/loggings/LoggingBroker";

export class MovieServiceExceptions {
    private loggingBroker: ILoggingBroker;

    constructor(loggingBroker?: ILoggingBroker) {
        this.loggingBroker = loggingBroker ?? new LoggingBroker();
    }

    async tryCatch<MovieListResponse>(func: () => Promise<MovieListResponse>): Promise<MovieListResponse> {
        try {
            return await func();
        } catch (error: any) {

            if (error instanceof InvalidMovieException) {
                throw await this.createAndLogValidationException(error);
            }

            if (error instanceof AlreadyExistsMovieException) {
                throw await this.createAndLogDependencyValidationException(error);
            }

            if (error instanceof NotFoundMovieException) {
                throw await this.createAndLogDependencyValidationException(error);
            }

            if (error.response?.status === 404) {
                throw await this.createAndLogDependencyException(error);
            }

            if (error.response?.status === 401) {
                throw await this.createAndLogDependencyException(error);
            }

            if (error.response?.status === 403) {
                throw await this.createAndLogDependencyException(error);
            }

            throw await this.createAndLogServiceException(error);
        }
    }

    private async createAndLogValidationException(error: Error) {
        const exception = new MovieValidationException(
            "Movie validation error occurred",
            error
        );

        await this.loggingBroker.logError(exception);

        return exception;
    }

    private async createAndLogDependencyException(error: Error) {
        const exception = new MovieDependencyException(
            "Movie dependency error occurred",
            error
        );

        await this.loggingBroker.logError(exception);

        return exception;
    }

    private async createAndLogDependencyValidationException(error: Error) {
        const exception = new MovieDependencyValidationException(
            "Movie dependency validation error occurred",
            error
        );

        await this.loggingBroker.logError(exception);

        return exception;
    }

    private async createAndLogServiceException(error: Error) {
        const exception = new MovieServiceException(
            "Movie service error occurred",
            error
        );

        await this.loggingBroker.logError(exception);

        return exception;
    }
}