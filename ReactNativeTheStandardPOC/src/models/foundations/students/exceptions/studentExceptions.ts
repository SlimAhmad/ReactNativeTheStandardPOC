export class StudentValidationException extends Error {
    constructor(message: string, public innerException?: Error) {
        super(message);
        this.name = "StudentValidationException";
    }
}

export class StudentDependencyException extends Error {
    constructor(message: string, public innerException?: Error) {
        super(message);
        this.name = "StudentDependencyException";
    }
}

export class StudentDependencyValidationException extends Error {
    constructor(message: string, public innerException?: Error) {
        super(message);
        this.name = "StudentDependencyValidationException";
    }
}

export class StudentServiceException extends Error {
    constructor(message: string, public innerException?: Error) {
        super(message);
        this.name = "StudentServiceException";
    }
}

export class AlreadyExistsStudentException extends Error { }
export class InvalidStudentException extends Error {
    data: Record<string, string[]> = {}

    constructor(message: string) {
        super(message)
        this.name = "InvalidStudentException"
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
export class NotFoundStudentException extends Error { }
export class NullStudentException extends Error { }