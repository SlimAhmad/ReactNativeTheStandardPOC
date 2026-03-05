import { IApiBrokerMovieList } from '@/brokers/apis/partials/movies/IApiBroker_movies';
import { ILoggingBroker } from '@/brokers/loggings/ILoggingBroker';
import { Movie } from '@/models/foundations/movies/movie';
import { MovieListResponse } from '@/models/foundations/movies/movieList';
import { IMovieService } from '@/Services/foundations/movies/IMovieService';
import { MovieListService } from '@/Services/foundations/movies/MovieService';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';


export class MovieListServiceTestBase {
    apiBrokerMock: jest.Mocked<IApiBrokerMovieList>;
    loggingBrokerMock: jest.Mocked<ILoggingBroker>;
    movieListService: IMovieService;

    constructor() {
        this.apiBrokerMock = {
            getAllMovieListsAsync: jest.fn(),
        } as any;

        this.loggingBrokerMock = {
            logInformation: jest.fn(),
            logError: jest.fn(),
            logWarning: jest.fn(),
            logCritical: jest.fn(),
        } as any;

        this.movieListService = new MovieListService(
            this.apiBrokerMock,
            this.loggingBrokerMock,
        );
    }

    setUpMovieListServiceTests(): void {
        this.apiBrokerMock = {
            getAllMovieListsAsync: jest.fn(),
        } as jest.Mocked<IApiBrokerMovieList>;

        this.loggingBrokerMock = {
            logError: jest.fn(),
            logCritical: jest.fn(),
            logInformation: jest.fn(),
            logWarning: jest.fn(),
        } as jest.Mocked<ILoggingBroker>;

        this.movieListService = new MovieListService(
            this.apiBrokerMock,
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
