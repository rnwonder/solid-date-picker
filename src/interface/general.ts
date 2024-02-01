import { Accessor, JSX, Setter } from "solid-js";
import { DatePickerInputSJProps } from "../components/DatePickerGroup";
import { ITimeAnalogGroupProps } from "../components/TimeAnalogGroup";
import { CalendarAreaProps } from "../components/CalendarArea";
import { MonthSelectorExportProps } from "../components/MonthSelectorExport";
import { YearSelectorExportProps } from "../components/YearSelectorExport";
import { PopoverProps } from "../components/Popover";
import { ModalProps } from "../components/CustomPortal";
import { DatePickerStandAloneProps } from "../components/DatePickerStandAloneExport";

export interface DateObjectUnits {
  // a year, such as 1987
  year?: number;
  // a month, 1-12
  month?: number;
  // a day of the month, 1-31, depending on the month
  day?: number;
  // day of the year, 1-365 or 366
}

export type IMonthStatus = "prev" | "current" | "next";

export interface IMonthDaysObject {
  value: number;
  month: IMonthStatus;
}

export type IDatePickerType = "single" | "range" | "multiple";

export type IDatePickerOnChange =
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

export interface PickerValue {
  value: IDatePickerInputValueTypes;
  label: string;
}

export interface IDatePickerInputValueTypes {
  start?: string;
  startDateObject?: DateObjectUnits;
  end?: string;
  endDateObject?: DateObjectUnits;
  selected?: string;
  selectedDateObject?: DateObjectUnits;
  multiple?: string[];
  multipleDateObject?: DateObjectUnits[];
}

export interface IRenderInputJSXProps {
  value: Accessor<PickerValue>;
  showDate: () => void;
}

export interface IRenderTimeInputJSXProps {
  value: Accessor<TimeValue>;
  showTime: () => void;
}

export type IRenderInput =
  | JSX.Element
  | ((props: IRenderInputJSXProps) => JSX.Element);

export type IRenderTimeInput =
  | JSX.Element
  | ((props: IRenderTimeInputJSXProps) => JSX.Element);

export interface IRenderJSXProps {
  month: Accessor<number>;
  setMonth: Setter<number>;
  year: Accessor<number>;
  setYear: Setter<number>;
  selectedDate: Accessor<DateObjectUnits | undefined>;
  endDate: Accessor<DateObjectUnits | undefined>;
  multipleDates: Accessor<DateObjectUnits[] | undefined>;
  handleNextMonth: () => void;
  handlePrevMonth: () => void;
  handleDayClick: HandleDayClick;
  setRefToAllowOutsideClick: Setter<HTMLDivElement | undefined>;
}

export type HandleDayClick = (
  day: IMonthDaysObject,
  month: Accessor<number>,
  year: Accessor<number>,
  nextMonth: boolean,
) => void;

export type IRenderJSX =
  | JSX.Element
  | ((props: IRenderJSXProps) => JSX.Element);

export type IMonthSelectorType = "short" | "long";

export type IMonthYearSelectorFlexDirection = "row" | "column";

export interface IYearRange {
  start: number;
  end: number;
}

export type Locale = Intl.LocalesArgument;
export type LocaleOptions = Intl.DateTimeFormatOptions;

export interface IColors {
  primaryColor?: string;
  primaryTextColor?: string;
  secondaryColor?: string;
  secondaryTextColor?: string;

  textColor?: string;
  arrowsColor?: string;

  weekEndDayBgColor?: string;
  weekEndDayTextColor?: string;

  weekDaysNameColor?: string;

  backgroundColor?: string;
}

export interface SelectorColorsAndClassNames
  extends Pick<
      IColors,
      "primaryColor" | "primaryTextColor" | "textColor" | "backgroundColor"
    >,
    Pick<
      ClassNames,
      | "monthYearTriggerBtnClass"
      | "monthYearTriggerBtnWrapperClass"
      | "monthYearSelectorWrapperClass"
      | "monthYearOptionBtnClass"
      | "monthYearOptionBtnActiveClass"
    > {}

export type DateArray =
  | MakeOptionalRequired<DateObjectUnits>
  | {
      start: MakeOptionalRequired<DateObjectUnits>;
      end: MakeOptionalRequired<DateObjectUnits>;
    };

export type MakeOptionalRequired<T> = {
  [K in keyof T]-?: T[K];
};

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

export interface CustomDaysClassName
  extends MakeOptionalRequired<DateObjectUnits> {
  className: string;
}

export type WeekDaysType = "short" | "single" | "double";

export interface HoverRangeValue {
  start?: DateObjectUnits;
  end?: DateObjectUnits;
}

export interface ClassNames {
  inputClass?: string;
  inputWrapperClass?: string;
  datePickerWrapperClass?: string;
  datePickerTopAreaClass?: string;
  prevNextMonthBtnClass?: string;
  prevMonthBtnClass?: string;
  nextMonthBtnClass?: string;
  datePickerTopMonthYearAreaClass?: string;
  monthYearTriggerBtnClass?: string;
  monthYearTriggerBtnWrapperClass?: string;
  monthYearSelectorWrapperClass?: string;
  monthYearOptionBtnClass?: string;
  monthYearOptionBtnActiveClass?: string;
  datePickerBodyAreaClass?: string;
  calendarWrapperClass?: string;
  calendarOneAreaClass?: string;
  calendarTwoAreaClass?: string;
  calendarDividerClass?: string;
  weekNamesRowClass?: string; //
  weekNamesClass?: string;
  daysRowClass?: string; //
  daysWrapperClass?: string;
  daysBtnClass?: string;
  daysActiveRangeBetweenBtnClass?: string;
  daysActivePrimaryBtnClass?: string;
  currentDayBtnClass?: string;
  weekEndDaysBtnClass?: string;
  sundaysBtnClass?: string;
  saturdaysBtnClass?: string;
  daysNotInCurrentMonthBtnClass?: string;
  daysActiveRangeStartBtnClass?: string;
  daysActiveRangeEndBtnClass?: string;

  daysActiveRangeStartWrapperClass?: string;
  daysActiveRangeEndWrapperClass?: string;
  daysActivePrimaryWrapperClass?: string;
  daysActiveRangeBetweenWrapperClass?: string;

  datePickerCalendarDaysArea?: string;
}

export interface DatePickerDayClassNames
  extends Pick<
    ClassNames,
    | "weekNamesClass"
    | "daysWrapperClass"
    | "daysActivePrimaryWrapperClass"
    | "datePickerBodyAreaClass"
    | "daysActivePrimaryBtnClass"
    | "daysActiveRangeBetweenBtnClass"
    | "daysActiveRangeEndBtnClass"
    | "daysActiveRangeStartBtnClass"
    | "daysActiveRangeStartWrapperClass"
    | "daysActiveRangeEndWrapperClass"
    | "daysActiveRangeBetweenWrapperClass"
    | "daysBtnClass"
    | "currentDayBtnClass"
    | "weekEndDaysBtnClass"
    | "sundaysBtnClass"
    | "saturdaysBtnClass"
    | "daysNotInCurrentMonthBtnClass"
  > {}

export interface DatePickerDayColors
  extends Omit<IColors, "arrowsColor" | "backgroundColor"> {}

export interface DatePickerDayClassNamesAndColors
  extends DatePickerDayColors,
    DatePickerDayClassNames {}

export interface CalendarDaysClassNamesAndColors
  extends DatePickerDayColors,
    DatePickerDayClassNames,
    Pick<ClassNames, "daysRowClass" | "datePickerCalendarDaysArea"> {}

export type DateOption = Date | DateObjectUnits | string | number;

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

export interface DateTimeObject extends DateObjectUnits, ITimePickerFormat {}

export interface ITimePickerFormat {
  hour?: number;
  minute?: number;
  second?: number;
}

export type ITimeView = "hour" | "minute" | "second";

export type ITimeMeridiem = "AM" | "PM";

export interface TimeValue {
  value: ITimePickerFormat;
  label: string;
}

export interface TimeAnalogClassNames {
  prevTimeViewBtnClass?: string;
  nextTimeViewBtnClass?: string;
  prevNextTimeViewBtnClass?: string;
  timeAnalogNumberClass?: string;
  timeAnalogWrapperClass?: string;
  timeAnalogClockHandClass?: string;
  timeAnalogClockCenterDotClass?: string;
  timePickerWrapperClass?: string;
  timePickerTopAreaClass?: string;
  timePickerBottomAreaClass?: string;
  timePickerMeridiemBtnClass?: string;
}

// lib type exports
export interface DatePickerProps extends DatePickerInputSJProps {}
export interface TimePickerProps extends ITimeAnalogGroupProps {}
export interface MonthSelectorProps extends MonthSelectorExportProps {}
export interface YearSelectorProps extends YearSelectorExportProps {}
export interface RnPortalProps extends ModalProps {}
export type { CalendarAreaProps, PopoverProps, DatePickerStandAloneProps };
