export interface IDateTimeBroker {
  getCurrentDateTimeOffsetAsync(): Promise<Date>;
}