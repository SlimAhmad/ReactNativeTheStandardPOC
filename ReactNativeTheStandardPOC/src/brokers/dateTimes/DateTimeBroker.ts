import { IDateTimeBroker } from "./IDateTimeBroker";

export class DateTimeBroker implements IDateTimeBroker {
    public async getCurrentDateTimeOffsetAsync(): Promise<Date> {
        return new Date();
    }
}