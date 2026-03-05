import { runRetrieveAllMovieViewsTests } from "./MovieListViewServiceRetrieveAllTests";
import { MovieViewServiceTestBase } from "./MovieListViewServiceTestBase";


describe('MovieViewService |', () => {
    let base: MovieViewServiceTestBase;

    beforeEach(() => {
        base = new MovieViewServiceTestBase();
        base.setUpMovieViewServiceTests();
    });

    afterEach(() => {
        base.resetMocks();
    });

    runRetrieveAllMovieViewsTests(() => base);
});