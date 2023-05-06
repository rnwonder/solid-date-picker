export interface ITimePickerFormat {
  hour: number | undefined;
  minute: number | undefined;
  second: number | undefined;
}

export interface IDate {
  day: number;
  hour: number;
  minute: number;
  month: number;
  second: number;
  year: number;
}

export interface IMinMaxDate {
  year: number;
  month: number;
  day: number;
}
