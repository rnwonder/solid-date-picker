export interface DateObjectUnits {
  // a year, such as 1987
  year?: number;
  // a month, 1-12
  month?: number;
  // a day of the month, 1-31, depending on the month
  day?: number;
  // day of the year, 1-365 or 366
}

export type DateArray =
  | MakeOptionalRequired<DateObjectUnits>
  | {
      start: MakeOptionalRequired<DateObjectUnits>;
      end: MakeOptionalRequired<DateObjectUnits>;
    };

export type DateOption = Date | DateObjectUnits | string | number;

export type Locale = Intl.LocalesArgument;

export type LocaleOptions = Intl.DateTimeFormatOptions;

export type MakeOptionalRequired<T> = {
  [K in keyof T]-?: T[K];
};

export type MonthStatus = "prev" | "current" | "next";

export interface CustomDaysClassName
  extends MakeOptionalRequired<DateObjectUnits> {
  className: string;
}

export interface HoverRangeValue {
  start?: DateObjectUnits;
  end?: DateObjectUnits;
}

export interface ApplyDateRange {
  dayRangeEnd: boolean;
  dayRangeStartEnd: undefined | boolean;
  dayRangeStart: boolean;
  dayRangeBetween: boolean;
  daysCurrent: boolean;
  daysNotCurrentMonth: boolean;
  isWeekend: boolean;
  isSaturday: boolean;
  isSunday: boolean;
  customDayClass?: string;
  isMultipleSelected: boolean;
  hidden: boolean;
  disabled: boolean;
  dayRangeEndHover: boolean;
  date: string;
  dateValue: string;
}

export type DatePickerType = "single" | "range" | "multiple";

export type DatePickerOnChange =
  | {
      selectedDate?: DateObjectUnits;
      type: "single";
    }
  | {
      startDate?: DateObjectUnits;
      endDate?: DateObjectUnits;
      type: "range";
    }
  | {
      multipleDates?: DateObjectUnits[];
      type: "multiple";
    };

export interface MonthDaysObject<T = number> {
  value: T;
  month: MonthStatus;
}

export interface ITimePickerFormat {
  hour?: number;
  minute?: number;
  second?: number;
}

export interface DateTimeObject extends DateObjectUnits, ITimePickerFormat {}

export type DateMathDiffUnit =
  | "milliseconds"
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | "weeks"
  | "months"
  | "quarters"
  | "years";

export interface DateMathDiff
  extends Partial<Record<DateMathDiffUnit, number>> {}

export type TimeMeridiem = "AM" | "PM";

export interface YearRange {
  start: number;
  end: number;
}
