export class MovieValidationException extends Error {
    constructor(message: string, public innerException?: Error) {
        super(message);
        this.name = "MovieValidationException";
    }
}

export class MovieDependencyException extends Error {
    constructor(message: string, public innerException?: Error) {
        super(message);
        this.name = "MovieDependencyException";
    }
}

export class MovieDependencyValidationException extends Error {
    constructor(message: string, public innerException?: Error) {
        super(message);
        this.name = "MovieDependencyValidationException";
    }
}

export class MovieServiceException extends Error {
    constructor(message: string, public innerException?: Error) {
        super(message);
        this.name = "MovieServiceException";
    }
}

export class AlreadyExistsMovieException extends Error { }
export class InvalidMovieException extends Error {
  data: Record<string, string[]> = {}

  constructor(message: string) {
    super(message)
    this.name = "InvalidProductException"
  }

  upsertDataList(key: string, value: string) {
    if (!this.data[key]) {
      this.data[key] = []
    }

    this.data[key].push(value)
  }

  throwIfContainsErrors() {
    if (Object.keys(this.data).length > 0) {
      throw this
    }
  }
}
export class NotFoundMovieException extends Error { }