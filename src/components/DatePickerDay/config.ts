import type { Accessor } from "solid-js";
import type {
  DateObjectUnits,
  IDatePickerInputDataValue,
  IMonthDaysObject,
  IMonthStatus,
} from "../../interface/date";
import type { ITimePickerFormat } from "../../interface/time";

// Gets the current month and year days array
export const getMonthDaysArray = (
  month: number,
  year: number
): IMonthDaysObject[] => {
  const firstDayOfMonth = new Date(year, month, 1);
  const startDayOfWeekIndex = firstDayOfMonth.getDay();

  const numDaysInMonth = new Date(year, month + 1, 0).getDate();

  const daysOfMonth: IMonthDaysObject[] = [];

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevMonthYear = prevMonth === 11 ? year - 1 : year;
  const numDaysInPrevMonth = new Date(
    prevMonthYear,
    prevMonth + 1,
    0
  ).getDate();

  let prevMonthStart = numDaysInPrevMonth - startDayOfWeekIndex + 1;

  if (prevMonthStart === numDaysInPrevMonth + 1) {
    prevMonthStart = 1;
  }
  for (let i = 0; i < startDayOfWeekIndex; i++) {
    daysOfMonth.push({ value: prevMonthStart + i, month: "prev" });
  }

  for (let i = 1; i <= numDaysInMonth; i++) {
    daysOfMonth.push({ value: i, month: "current" });
  }

  const numDaysLeft = 42 - daysOfMonth.length;
  for (let i = 1; i <= numDaysLeft; i++) {
    const value = i;
    const status = "next";
    daysOfMonth.push({ value, month: status });
  }

  return daysOfMonth;
};

export const getDatePickerRefactoredMonth = (
  month: number,
  monthStatus: IMonthStatus
) => {
  if (monthStatus === "prev") {
    return month === 0 ? 11 : month - 1;
  } else if (monthStatus === "next") {
    return month === 11 ? 0 : month + 1;
  }
  return month;
};

export const isDayInBetweenRange = ({
  day,
  endDate,
  startDate,
  year,
  month,
  monthStatus,
}: {
  day: number;
  month: number;
  year: number;
  startDate: DateObjectUnits | undefined;
  endDate: DateObjectUnits | undefined;
  monthStatus: IMonthStatus;
}) => {
  if (!startDate || !endDate) return false;
  const date = new Date(
    year,
    getDatePickerRefactoredMonth(month, monthStatus),
    day
  );
  const start = new Date(startDate.year!, startDate.month!, startDate.day);
  const end = new Date(endDate.year!, endDate.month!, endDate.day);

  return date > start && date < end;
};

// Checks if the day is the start of the range or end of the range
export const isDayTipRange = ({
  dateRange,
  day,
  year,
  month,
  monthStatus,
}: {
  day: number;
  month: number;
  year: number;
  dateRange: DateObjectUnits | undefined;
  monthStatus: IMonthStatus;
}) => {
  if (!dateRange) return false;
  const date = new Date(
    year,
    getDatePickerRefactoredMonth(month, monthStatus),
    day
  );
  const start = new Date(dateRange.year!, dateRange.month!, dateRange.day);
  return date.toDateString() === start.toDateString();
};

export const applyDateRangeStyles = ({
  year,
  month,
  endDay,
  day,
  startDay,
}: {
  startDay: DateObjectUnits | undefined;
  endDay: DateObjectUnits | undefined;
  year: Accessor<number>;
  month: Accessor<number>;
  day: IMonthDaysObject;
}): {
  dayRangeEnd: boolean;
  dayRangeStartEnd: undefined | boolean;
  dayRangeStart: boolean;
  dayRangeBetween: boolean;
  daysCurrent: boolean;
  daysNotCurrentMonth: boolean;
} => {
  return {
    dayRangeStartEnd:
      startDay &&
      endDay &&
      (isDayTipRange({
        year: year(),
        month: month(),
        day: day.value,
        dateRange: startDay,
        monthStatus: day.month,
      }) ||
        isDayTipRange({
          year: year(),
          month: month(),
          day: day.value,
          dateRange: endDay,
          monthStatus: day.month,
        })),
    dayRangeBetween: isDayInBetweenRange({
      year: year(),
      month: month(),
      day: day.value,
      startDate: startDay,
      endDate: endDay,
      monthStatus: day.month,
    }),
    dayRangeStart: isDayTipRange({
      year: year(),
      month: month(),
      day: day.value,
      dateRange: startDay,
      monthStatus: day.month,
    }),
    dayRangeEnd: isDayTipRange({
      year: year(),
      month: month(),
      day: day.value,
      dateRange: endDay,
      monthStatus: day.month,
    }),
    daysCurrent:
      checkIfItsTodayDate(
        new Date(
          year(),
          getDatePickerRefactoredMonth(month(), day.month),
          day.value
        )
      ) && day.month === "current",
    daysNotCurrentMonth: day.month !== "current",
  };
};

const checkIfItsTodayDate = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const isMinMaxDate = ({
  maxDate,
  minDate,
  day,
  year,
  month,
}: {
  minDate: DateObjectUnits | undefined;
  maxDate: DateObjectUnits | undefined;
  day: IMonthDaysObject;
  year: Accessor<number>;
  month: Accessor<number>;
}): boolean => {
  if (!minDate && !maxDate) return false;

  const date = new Date(year(), month() - 1, day.value);

  if (minDate && maxDate) {
    const min = new Date(minDate.year!, minDate.month!, minDate.day);
    const max = new Date(maxDate.year!, maxDate.month!, maxDate.day);
    return date < min || date > max;
  } else if (minDate) {
    const min = new Date(minDate.year!, minDate.month!, minDate.day);
    return date < min;
  } else if (maxDate) {
    const max = new Date(maxDate.year!, maxDate.month!, maxDate.day);
    return date > max;
  }
  return false;
};

export function generateYearsArray(startYear: number, endYear: number) {
  const years: number[] = [];
  for (let i = endYear; i >= startYear; i--) {
    years.push(i);
  }
  return years;
}

export const checkDateValidation = (start: IDatePickerInputDataValue) => {
  const startDate = start?.value.start!;
  const startFormat = new Date(startDate);
  const nowDate = new Date();

  if (start) {
    return (
      nowDate.getMonth() > startFormat.getMonth() ||
      nowDate.getDate() > startFormat.getDate() ||
      nowDate.getFullYear() > startFormat.getFullYear()
    );
  }
};

export const checkTimeValidation = (startTime: ITimePickerFormat) => {
  const now = new Date();

  if (startTime && startTime.minute) {
    return (
      startTime.minute - now.getMinutes() < 10 &&
      startTime.hour === now.getHours()
    );
  }
};

export const convertDateToDateObject = (date: Date) => {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
  };
};

export const convertDateObjectToDate = (date: DateObjectUnits) => {
  const now = new Date();
  return new Date(
    date?.year || now.getFullYear(),
    date?.month === 0 ? 0 : date?.month || now.getMonth(),
    date?.day || now.getDay()
  );
};
