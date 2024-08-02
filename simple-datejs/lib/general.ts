import { convertDateObjectToDate } from "./format";
import {
  DateArray,
  DateObjectUnits,
  Locale,
  MakeOptionalRequired,
  MonthDaysObject,
  MonthStatus,
} from "./types";
import {
  CustomAccessor,
  getDatePickerRefactoredMonth,
  getDatePickerRefactoredYear,
} from "./generate";
import { getAccessorValue, modifiedDate } from "./localHelpers";

export const getToday = (): MakeOptionalRequired<DateObjectUnits> => {
  const today = new Date();
  return {
    day: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
  };
};

export const checkIfItsTodayDate = (
  date: Date | MakeOptionalRequired<DateObjectUnits>,
) => {
  const today = getToday();

  if (date instanceof Date) {
    return (
      date.getDate() === today.day &&
      date.getMonth() === today.month &&
      date.getFullYear() === today.year
    );
  }
  return (
    date.day === today.day &&
    date.month === today.month &&
    date.year === today.year
  );
};

export const isBeforeDate = (
  first: MakeOptionalRequired<DateObjectUnits> | Date,
  second: MakeOptionalRequired<DateObjectUnits> | Date,
) => {
  const firstDate =
    first instanceof Date ? first : convertDateObjectToDate(first);
  const secondDate =
    second instanceof Date ? second : convertDateObjectToDate(second);
  return firstDate.getTime() < secondDate.getTime();
};

export const getMonthName = (
  month: number,
  format: "narrow" | "long" | "short" = "long",
  locale?: Locale,
) => {
  const date = new Date(2000, month, 1);
  return date.toLocaleString(locale ?? "en", { month: format });
};

export const clickOutside = (
  ref: HTMLElement,
  callback: (e: MouseEvent) => void,
) => {
  const handleClick = (e: MouseEvent) => {
    if (ref && !ref.contains(e.target as Node)) {
      callback(e);
    }
  };
  document.addEventListener("click", handleClick);

  return () => {
    document.removeEventListener("click", handleClick);
  };
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
  monthStatus: MonthStatus;
}) => {
  if (!startDate || !endDate) return false;
  const date = modifiedDate(
    getDatePickerRefactoredYear(year, month, monthStatus),
    getDatePickerRefactoredMonth(month, monthStatus),
    day,
  );
  const start = modifiedDate(startDate.year!, startDate.month!, startDate.day!);
  const end = modifiedDate(endDate.year!, endDate.month!, endDate.day!);

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
  monthStatus: MonthStatus;
}) => {
  if (!dateRange) return false;
  const date = modifiedDate(
    getDatePickerRefactoredYear(year, month, monthStatus),
    getDatePickerRefactoredMonth(month, monthStatus),
    day,
  );
  const start = modifiedDate(dateRange.year!, dateRange.month!, dateRange.day!);
  return date.getTime() === start.getTime();
};

export const isMinMaxDate = ({
  maxDate,
  minDate,
  day,
  year,
  month,
}: {
  minDate: MakeOptionalRequired<DateObjectUnits> | undefined;
  maxDate: MakeOptionalRequired<DateObjectUnits> | undefined;
  day: MonthDaysObject;
  year: CustomAccessor<number>;
  month: CustomAccessor<number>;
}): boolean => {
  if (!minDate && !maxDate) return false;

  const date = modifiedDate(
    getDatePickerRefactoredYear(
      getAccessorValue(year),
      getAccessorValue(month),
      day.month,
    ),
    getDatePickerRefactoredMonth(getAccessorValue(month), day.month),
    day.value,
  );

  if (minDate && maxDate) {
    const min = modifiedDate(minDate.year, minDate.month, minDate.day);
    const max = modifiedDate(maxDate.year, maxDate.month, maxDate.day);
    return date < min || date > max;
  } else if (minDate) {
    const min = modifiedDate(minDate.year, minDate.month, minDate.day);
    return date < min;
  } else if (maxDate) {
    const max = modifiedDate(maxDate.year, maxDate.month, maxDate.day);
    return date > max;
  }
  return false;
};

export const isPartOfDisabledDays = ({
  disabledDays,
  month,
  day,
  year,
}: {
  disabledDays?: DateArray[];
  day: MonthDaysObject;
  month: number;
  year: number;
}) => {
  if (!disabledDays) return false;
  const foundData = disabledDays.find((data) => {
    if ("start" in data && "end" in data) {
      const startDate = convertDateObjectToDate(data.start);
      const endDate = convertDateObjectToDate(data.end);
      const targetDate = convertDateObjectToDate({
        day: day.value,
        month: getDatePickerRefactoredMonth(month, day.month),
        year: getDatePickerRefactoredYear(year, month, day.month),
      });
      return targetDate >= startDate && targetDate <= endDate;
    } else {
      return (
        data.day === day.value &&
        data.month === getDatePickerRefactoredMonth(month, day.month) &&
        data.year === getDatePickerRefactoredYear(year, month, day.month)
      );
    }
  });
  return !!foundData;
};

export const isNotPartOfEnabledDays = ({
  enabledDays,
  day,
  year,
  month,
  next,
  prev,
}: {
  enabledDays?: DateArray[];
  day?: MonthDaysObject;
  month: number;
  year: number;
  next?: boolean;
  prev?: boolean;
}) => {
  if (!enabledDays) return false;
  return enabledDays.every((enabled) => {
    // for (const enabled of enabledDays) {
    const targetDate = day
      ? {
          day: day.value,
          month: getDatePickerRefactoredMonth(month, day.month),
          year: getDatePickerRefactoredYear(year, month, day.month),
        }
      : {
          year,
          month,
        };
    if ("start" in enabled && "end" in enabled) {
      // Range of enabled dates
      const startDate = enabled.start;
      const endDate = enabled.end;
      if (isDateWithinRange(targetDate, startDate, endDate, { next, prev })) {
        return false; // Date is enabled
      }
    } else {
      // Single enabled date

      if (isDatesEqual(targetDate, enabled)) {
        return false; // Date is enabled
      }
    }
    return true; // Date is not enabled
  });
};

function isDatesEqual(date1: DateObjectUnits, date2: DateObjectUnits): boolean {
  if (date1.day) {
    return (
      date1.year === date2.year &&
      date1.month === date2.month &&
      date1.day === date2.day
    );
  } else {
    return date1.year === date2.year && date1.month === date2.month;
  }
}

function isDateWithinRange(
  date: DateObjectUnits,
  startDate: DateObjectUnits,
  endDate: DateObjectUnits,
  option?: {
    next?: boolean;
    prev?: boolean;
  },
): boolean {
  if (option?.next) {
    return (
      startDate.year === undefined ||
      date.year === undefined ||
      startDate.year > date.year ||
      (date.year === startDate.year &&
        (date.month === undefined ||
          startDate.month === undefined ||
          startDate.month >= date.month))
    );
  }

  if (option?.prev) {
    return (
      endDate.year === undefined ||
      date.year === undefined ||
      endDate.year < date.year ||
      (date.year === endDate.year &&
        (date.month === undefined ||
          endDate.month === undefined ||
          endDate.month <= date.month))
    );
  }

  const isAfterStart =
    startDate.year === undefined ||
    date.year === undefined ||
    date.year > startDate.year ||
    (date.year === startDate.year &&
      (date.month === undefined ||
        startDate.month === undefined ||
        date.month > startDate.month ||
        (date.month === startDate.month &&
          (date.day
            ? startDate.day === undefined || date.day >= startDate.day
            : true))));

  const isBeforeEnd =
    endDate.year === undefined ||
    date.year === undefined ||
    date.year < endDate.year ||
    (date.year === endDate.year &&
      (date.month === undefined ||
        endDate.month === undefined ||
        date.month < endDate.month ||
        (date.month === endDate.month &&
          (date.day
            ? endDate.day === undefined || date.day <= endDate.day
            : true))));

  return isAfterStart && isBeforeEnd;
}

export const isDateRangeDisabled = (
  startDate: Date,
  endDate: Date,
  disabledDays?: DateArray[],
): boolean => {
  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    if (
      isPartOfDisabledDays({
        day: {
          month: "current",
          value: date.getDate(),
        },
        month: date.getMonth(),
        year: date.getFullYear(),
        disabledDays,
      })
    ) {
      return true;
    }
  }

  return false;
};

export const isDateRangeEnabled = (
  startDate: Date,
  endDate: Date,
  enabledDays?: DateArray[],
) => {
  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    if (
      isNotPartOfEnabledDays({
        day: {
          month: "current",
          value: date.getDate(),
        },
        month: date.getMonth(),
        year: date.getFullYear(),
        enabledDays,
      })
    ) {
      return true;
    }
  }
};

export const isWeekendStatus = ({
  year,
  month,
  day,
}: {
  day: MonthDaysObject;
  month: number;
  year: number;
}): {
  isWeekend: boolean;
  isSaturday: boolean;
  isSunday: boolean;
} => {
  const refactorMonth = getDatePickerRefactoredMonth(month, day.month);
  const refactorYear = getDatePickerRefactoredYear(year, month, day.month);
  const date = modifiedDate(refactorYear, refactorMonth, day.value);
  const dayOfWeek = date.getDay();

  return {
    isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
    isSaturday: dayOfWeek === 6,
    isSunday: dayOfWeek === 0,
  };
};

export const compareObjectDate = (
  first: DateObjectUnits,
  second: DateObjectUnits,
) => {
  return (
    first.day === second.day &&
    first.month === second.month &&
    first.year === second.year
  );
};
