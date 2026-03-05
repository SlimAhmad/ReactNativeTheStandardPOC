import { IDateTimeBroker } from '@/brokers/dateTimes/IDateTimeBroker';
import { ILoggingBroker } from '@/brokers/loggings/ILoggingBroker';
import { Movie } from '@/models/foundations/movies/movie';
import { MovieListResponse } from '@/models/foundations/movies/movieList';
import { IMovieService } from '@/Services/foundations/movies/IMovieService';
import { IMovieViewService } from '@/Services/views/movies/IMovieViewService';
import { MovieViewService } from '@/Services/views/movies/MovieViewService';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

export class MovieViewServiceTestBase {
    movieServiceMock!: jest.Mocked<IMovieService>;
    loggingBrokerMock!: jest.Mocked<ILoggingBroker>;
    dateTimeBrokerMock!: jest.Mocked<IDateTimeBroker>;
    movieViewService!: IMovieViewService;

    setUpMovieViewServiceTests(): void {
        this.movieServiceMock = {
            retrieveAllMovieListsAsync: jest.fn(),
        } as jest.Mocked<IMovieService>;

        this.loggingBrokerMock = {
            logError: jest.fn(),
            logCritical: jest.fn(),
            logInformation: jest.fn(),
            logWarning: jest.fn(),
        } as jest.Mocked<ILoggingBroker>;

        this.dateTimeBrokerMock = {
            getCurrentDateTimeOffsetAsync: jest.fn(),
        } as jest.Mocked<IDateTimeBroker>;

        this.movieViewService = new MovieViewService(
            this.movieServiceMock,
            this.dateTimeBrokerMock,
            this.loggingBrokerMock,
        );
    }

    resetMocks(): void {
        jest.clearAllMocks();
    }

    randomId(): string {
        return uuidv4();
    }

    randomName(): string {
        return faker.name.fullName();
    }

    randomEmail(): string {
        return faker.internet.email();
    }

    randomString(): string {
        return faker.animal.type();
    }

    randomNumber(): number {
        return 1;
    }

    randomPastDate(): Date {
        return faker.date.past();
    }

    createRandomMovie(): Movie {
        return new Movie({
            description: this.randomName(),
            favoriteCount: this.randomNumber(),
            id: this.randomNumber(),
            itemCount: this.randomNumber(),
            iso639_1: this.randomString(),
            listType: this.randomString(),
            name: this.randomName(),
            posterPath: this.randomName(),
        });
    }

    createRandomMovieList(count = 3): Movie[] {
        return Array.from({ length: count }, () => this.createRandomMovie());
    }

    createRandomMovieListResponse(): MovieListResponse {
        return new MovieListResponse({
            results: this.createRandomMovieList(),
            page: 1,
            totalPages: 1,
            totalResults: 1,
        });
    }
}