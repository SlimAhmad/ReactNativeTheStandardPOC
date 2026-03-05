import {
    AlreadyExistsStudentException,
    InvalidStudentException,
    NotFoundStudentException,
    StudentDependencyException,
    StudentDependencyValidationException,
    StudentServiceException,
    StudentValidationException
} from "../../../../models/foundations/students/exceptions/studentExceptions";

import { LoggingBroker } from "../../../../brokers/loggings/LoggingBroker";

export class StudentService {
    private loggingBroker = new LoggingBroker();

    private async tryCatch<T>(func: () => Promise<T>): Promise<T> {
        try {
            return await func();
        } catch (error: any) {

            if (error instanceof InvalidStudentException) {
                throw await this.createAndLogValidationException(error);
            }

            if (error instanceof AlreadyExistsStudentException) {
                throw await this.createAndLogDependencyValidationException(error);
            }

            if (error instanceof NotFoundStudentException) {
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
        const exception = new StudentValidationException(
            "Student validation error occurred",
            error
        );

        await this.loggingBroker.logError(exception);

        return exception;
    }

    private async createAndLogDependencyException(error: Error) {
        const exception = new StudentDependencyException(
            "Student dependency error occurred",
            error
        );

        await this.loggingBroker.logError(exception);

        return exception;
    }

    private async createAndLogDependencyValidationException(error: Error) {
        const exception = new StudentDependencyValidationException(
            "Student dependency validation error occurred",
            error
        );

        await this.loggingBroker.logError(exception);

        return exception;
    }

    private async createAndLogServiceException(error: Error) {
        const exception = new StudentServiceException(
            "Student service error occurred",
            error
        );

        await this.loggingBroker.logError(exception);

        return exception;
    }
}