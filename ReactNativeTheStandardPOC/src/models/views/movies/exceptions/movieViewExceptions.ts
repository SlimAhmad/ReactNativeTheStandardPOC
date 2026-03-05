export class NullMovieListViewException extends Error {
    constructor(message: string = "MovieList is null.") {
        super(message)
        this.name = "NullMovieListViewException"
    }
}

export class InvalidMovieListViewException extends Error {
    constructor(
        message: string = "Invalid MovieList view. Please correct the errors and try again."
    ) {
        super(message)
        this.name = "InvalidMovieListViewException"
    }
}

export class FailedMovieListViewServiceException extends Error {
    innerException: Error

    constructor(
        innerException: Error,
        message: string =
            "Failed MovieList view service error occurred, contact support."
    ) {
        super(message)
        this.name = "FailedMovieListViewServiceException"
        this.innerException = innerException
    }
}


export class MovieListViewValidationException extends Error {
    innerException: Error

    constructor(
        innerException: Error,
        message: string =
            "MovieList validation error occurred, please try again."
    ) {
        super(message)
        this.name = "MovieListViewValidationException"
        this.innerException = innerException
    }
}

export class MovieListViewServiceException extends Error {
    innerException: Error

    constructor(
        innerException: Error,
        message: string =
            "MovieList service error occurred, contact support."
    ) {
        super(message)
        this.name = "MovieListViewServiceException"
        this.innerException = innerException
    }
}

export class MovieListViewDependencyValidationException extends Error {
    innerException: Error

    constructor(
        innerException: Error,
        message: string =
            "MovieList dependency validation error occurred, please try again."
    ) {
        super(message)
        this.name = "MovieListViewDependencyValidationException"
        this.innerException = innerException
    }
}

export class MovieListViewDependencyException extends Error {
    innerException: Error

    constructor(
        innerException: Error,
        message: string =
            "MovieList dependency error occurred, contact support."
    ) {
        super(message)
        this.name = "MovieListViewDependencyException"
        this.innerException = innerException
    }
}