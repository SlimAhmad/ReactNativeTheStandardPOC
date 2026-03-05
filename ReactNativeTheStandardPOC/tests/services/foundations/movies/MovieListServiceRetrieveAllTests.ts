
import { MovieServiceException } from '@/models/foundations/movies/exceptions/movieExceptions';
import { MovieListResponse } from '@/models/foundations/movies/movieList';
import { MovieListServiceTestBase } from './MovieListServiceTestBase';


export function runRetrieveAllMovieListsTests(getBase: () => MovieListServiceTestBase): void {
  describe('retrieveAllMovieListsAsync —', () => {
    let base: MovieListServiceTestBase;

    beforeEach(() => {
      base = getBase();
    });

    describe('retrieveAll |', () => {
      it(
        'GIVEN MovieLists exist in storage ' +
        'WHEN retrieveAllMovieListsAsync is called ' +
        'THEN it should return all MovieLists from storage',
        async () => {
          // given
          const expectedMovieLists: MovieListResponse = base.createRandomMovieListResponse();
          base.apiBrokerMock.getAllMovieListsAsync.mockResolvedValueOnce(expectedMovieLists);

          // when
          const actualMovieLists = await base.movieListService.retrieveAllMovieListsAsync();

          // then
          expect(actualMovieLists).toEqual(expectedMovieLists);
          expect(base.apiBrokerMock.getAllMovieListsAsync).toHaveBeenCalledTimes(1);
          expect(base.apiBrokerMock.getAllMovieListsAsync).toHaveBeenCalledWith();
          expect(base.loggingBrokerMock.logError).not.toHaveBeenCalled();
          expect(base.loggingBrokerMock.logCritical).not.toHaveBeenCalled();
        },
      );
    });

    describe('Service Exceptions |', () => {
      it(
        'GIVEN the api broker throws an exception ' +
        'WHEN retrieveAllMovieListsAsync is called ' +
        'THEN it should throw MovieListServiceException and log the error',
        async () => {
          // given
          const apiException = new Error('API unavailable.');
          base.apiBrokerMock.getAllMovieListsAsync.mockRejectedValueOnce(apiException);

          // when
          const retrieveAllAction = () => base.movieListService.retrieveAllMovieListsAsync();

          // then
          await expect(retrieveAllAction()).rejects.toThrow(MovieServiceException);

          expect(base.apiBrokerMock.getAllMovieListsAsync).toHaveBeenCalled();
          expect(base.loggingBrokerMock.logError).toHaveBeenCalled();
        },
      );
    });

  });
}
