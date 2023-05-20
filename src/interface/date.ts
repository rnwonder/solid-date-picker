import { Accessor, JSX, Setter } from "solid-js";

export interface DateObjectUnits {
  // a year, such as 1987
  year?: number | undefined;
  // a month, 1-12
  month?: number | undefined;
  // a day of the month, 1-31, depending on the month
  day?: number | undefined;
  // day of the year, 1-365 or 366
}

export type IMonthStatus = "prev" | "current" | "next";

export interface IMonthDaysObject {
  value: number;
  month: IMonthStatus;
}

export type IDatePickerType = "single" | "range";

export type IDatePickerOnChange =
  | {
      selectedDate?: DateObjectUnits;
      type: "single";
    }
  | {
      startDate?: DateObjectUnits;
      endDate?: DateObjectUnits;
      type: "range";
    };

export interface IDatePickerInputDataValue {
  value: IDatePickerInputValueTypes;
  label: string;
}

export interface IDatePickerInputValueTypes {
  start?: string;
  end?: string;
  selected?: string;
}

export interface IRenderInputJSXProps {
  value: Accessor<IDatePickerInputDataValue>;
  showDate: () => void;
}

export type IRenderInput =
  | JSX.Element
  | ((props: IRenderInputJSXProps) => JSX.Element);

export interface IRenderJSXProps {
  month: Accessor<number>;
  setMonth: Setter<number>;
  year: Accessor<number>;
  setYear: Setter<number>;
  handleNextMonth: () => void;
  handlePrevMonth: () => void;
  handleDayClick: (day: IMonthDaysObject) => void;
  setRefToAllowOutsideClick: Setter<HTMLElement | undefined>;
}

export type IRenderJSX =
  | JSX.Element
  | ((props: IRenderJSXProps) => JSX.Element);

export type IMonthSelectorType = "short" | "long";

export type IMonthYearSelectorFlexDirection = "row" | "column";

export interface IYearRange {
  start: number;
  end: number;
}
