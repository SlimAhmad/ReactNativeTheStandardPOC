import { ILoggingBroker } from './ILoggingBroker';

export class LoggingBroker implements ILoggingBroker {
    public logInformation(message: string): void {
        console.info(`INFO: ${message}`);
    }

    public logError(error: Error): void {
        console.error(`ERROR: ${error.message}`, error);
    }

    public logWarning(message: string): void {
        console.warn(`WARNING: ${message}`);
    }

    public logCritical(message: string): void {
        console.error(`CRITICAL: ${message}`);
    }
}
