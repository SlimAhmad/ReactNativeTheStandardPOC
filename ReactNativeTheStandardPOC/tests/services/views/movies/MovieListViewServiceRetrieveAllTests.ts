import { MovieListResponse } from '@/models/foundations/movies/movieList';
import { MovieResponseView } from '@/models/views/movies/movieResponseView';
import { MovieViewServiceTestBase } from './MovieListViewServiceTestBase';


export function runRetrieveAllMovieViewsTests(getBase: () => MovieViewServiceTestBase): void {
    describe('retrieveAllMovieViewsAsync —', () => {
        let base: MovieViewServiceTestBase;

        beforeEach(() => {
            base = getBase();
        });

        describe('retrieveAll |', () => {
            it(
                'GIVEN MovieViews exist ' +
                'WHEN retrieveAllMovieViewsAsync is called ' +
                'THEN it should return all MovieViews',
                async () => {
                    // given
                    const randomMovieListResponse: MovieListResponse =
                        base.createRandomMovieListResponse();

                    const expectedMovieResponseView = MovieResponseView.fromModel(randomMovieListResponse);

                    base.movieServiceMock.retrieveAllMovieListsAsync.mockResolvedValueOnce(
                        randomMovieListResponse,
                    );

                    // when
                    const actualMovieResponseView =
                        await base.movieViewService.retrieveAllMovieViewsAsync();

                    // then
                    expect(actualMovieResponseView).toEqual(expectedMovieResponseView);
                    expect(base.movieServiceMock.retrieveAllMovieListsAsync).toHaveBeenCalledTimes(1);
                    expect(base.movieServiceMock.retrieveAllMovieListsAsync).toHaveBeenCalledWith();
                    expect(base.loggingBrokerMock.logError).not.toHaveBeenCalled();
                    expect(base.loggingBrokerMock.logCritical).not.toHaveBeenCalled();
                },
            );
        });

    });
}
