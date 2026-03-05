export interface ILoggingBroker {
    logInformation(message: string): void;
    logError(error: Error): void;
    logWarning(message: string): void;
    logCritical(message: string): void;
}
