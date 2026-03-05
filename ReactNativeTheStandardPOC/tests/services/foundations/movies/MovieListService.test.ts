import { runRetrieveAllMovieListsTests } from "./MovieListServiceRetrieveAllTests";
import { MovieListServiceTestBase } from "./MovieListServiceTestBase";

describe('MovieListService |', () => {
    let base: MovieListServiceTestBase;

    beforeEach(() => {
        base = new MovieListServiceTestBase();
        base.setUpMovieListServiceTests();
    });

    afterEach(() => {
        base.resetMocks();
    });

    runRetrieveAllMovieListsTests(() => base);
});