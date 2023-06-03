import type { Accessor } from "solid-js";
import type {
  DateObjectUnits,
  IMonthDaysObject,
  IMonthStatus,
  Locale,
  LocaleOptions,
  MakeOptionalRequired,
} from "../interface/general";
import {
  ApplyDateRange,
  CustomDaysClassName,
  DateArray,
  HoverRangeValue,
} from "../interface/general";

// Gets the current month and year days array
export const getMonthDaysArray = (
  month: number,
  year: number,
  option?: {
    weekStartDay?: number;
  }
): IMonthDaysObject[] => {
  // TODO: Add Locale support

  const firstDayOfMonth = new Date(
    year,
    month,
    1 - (option?.weekStartDay || 0)
  );
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

  // Previous month days
  for (let i = 0; i < startDayOfWeekIndex; i++) {
    daysOfMonth.push({ value: prevMonthStart + i, month: "prev" });
  }

  // Current month days
  for (let i = 1; i <= numDaysInMonth; i++) {
    daysOfMonth.push({ value: i, month: "current" });
  }

  const numDaysLeft = 42 - daysOfMonth.length;

  // Next month days
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

export const applyDateRangeProps = ({
  year,
  month,
  endDay,
  day,
  startDay,
  customDaysClassName,
  multipleObject,
  hideOutSideDays,
  hoverRangeValue,
  minDate,
  maxDate,
  disabledDays,
  enabledDays,
}: {
  startDay: DateObjectUnits | undefined;
  endDay: DateObjectUnits | undefined;
  year: Accessor<number>;
  month: Accessor<number>;
  day: IMonthDaysObject;
  customDaysClassName?: CustomDaysClassName[];
  multipleObject: DateObjectUnits[];
  hideOutSideDays?: boolean;
  hoverRangeValue: Accessor<HoverRangeValue>;
  minDate?: MakeOptionalRequired<DateObjectUnits>;
  maxDate?: MakeOptionalRequired<DateObjectUnits>;
  disabledDays?: DateArray[];
  enabledDays?: DateArray[];
}): ApplyDateRange => {
  return {
    dayRangeStartEnd:
      (hoverRangeValue().start || startDay) &&
      (hoverRangeValue().end || endDay) &&
      (isDayTipRange({
        year: year(),
        month: month(),
        day: day.value,
        dateRange: hoverRangeValue().start || startDay,
        monthStatus: day.month,
      }) ||
        isDayTipRange({
          year: year(),
          month: month(),
          day: day.value,
          dateRange: hoverRangeValue().end || endDay,
          monthStatus: day.month,
        })),
    dayRangeBetween: isDayInBetweenRange({
      year: year(),
      month: month(),
      day: day.value,
      startDate: hoverRangeValue().start || startDay,
      endDate: hoverRangeValue().end || endDay,
      monthStatus: day.month,
    }),
    dayRangeStart: isDayTipRange({
      year: year(),
      month: month(),
      day: day.value,
      dateRange: hoverRangeValue().start || startDay,
      monthStatus: day.month,
    }),
    dayRangeEnd: isDayTipRange({
      year: year(),
      month: month(),
      day: day.value,
      dateRange: hoverRangeValue().end || endDay,
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
    ...isWeekendStatus({
      year: year(),
      month: month(),
      day,
    }),
    customDayClass: customDaysClassName?.find(
      (customDay) =>
        customDay.year === year() &&
        customDay.month === getDatePickerRefactoredMonth(month(), day.month) &&
        customDay.day === day.value
    )?.className,
    isMultipleSelected: !!multipleObject?.find(
      (multiple) =>
        multiple.year === year() &&
        multiple.month === getDatePickerRefactoredMonth(month(), day.month) &&
        multiple.day === day.value
    ),
    hidden: hideOutSideDays ? day.month !== "current" : false,
    disabled:
      isPartOfDisabledDays({
        disabledDays,
        day,
        month: month(),
        year: year(),
      }) ||
      isMinMaxDate({
        day,
        month: month,
        year: year,
        minDate: minDate,
        maxDate: maxDate,
      }) ||
      isNotPartOfEnabledDays({
        enabledDays,
        day,
        month: month(),
        year: year(),
      }),
  };
};

export const checkIfItsTodayDate = (
  date: Date | MakeOptionalRequired<DateObjectUnits>
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

export const getToday = (): MakeOptionalRequired<DateObjectUnits> => {
  const today = new Date();
  return {
    day: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
  };
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
  day: IMonthDaysObject;
  year: Accessor<number>;
  month: Accessor<number>;
}): boolean => {
  if (!minDate && !maxDate) return false;

  const date = new Date(
    year(),
    getDatePickerRefactoredMonth(month(), day.month),
    day.value
  );

  if (minDate && maxDate) {
    const min = new Date(minDate.year, minDate.month, minDate.day);
    const max = new Date(maxDate.year, maxDate.month, maxDate.day);
    return date < min || date > max;
  } else if (minDate) {
    const min = new Date(minDate.year, minDate.month, minDate.day);
    return date < min;
  } else if (maxDate) {
    const max = new Date(maxDate.year, maxDate.month, maxDate.day);
    return date > max;
  }
  return false;
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

export const isPartOfDisabledDays = ({
  disabledDays,
  month,
  day,
  year,
}: {
  disabledDays?: DateArray[];
  day: IMonthDaysObject;
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
        year,
      });
      return targetDate >= startDate && targetDate <= endDate;
    } else {
      return (
        data.day === day.value &&
        data.month === getDatePickerRefactoredMonth(month, day.month) &&
        data.year === year
      );
    }
  });
  return !!foundData;
};

export const getRefactoredPrevDate = (year: number, month: number) => {
  return {
    year: month === 0 ? year - 1 : year,
    month: month === 0 ? 11 : month - 1,
  };
};

export const getRefactoredNextDate = (year: number, month: number) => {
  return {
    year: month === 11 ? year + 1 : year,
    month: month === 11 ? 0 : month + 1,
  };
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
  day?: IMonthDaysObject;
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
          year,
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

function isDatesEqual(
  date1: DateObjectUnits,
  date2: DateObjectUnits,
): boolean {
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
  }
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
  disabledDays?: DateArray[]
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
  enabledDays?: DateArray[]
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
  day: IMonthDaysObject;
  month: number;
  year: number;
}): {
  isWeekend: boolean;
  isSaturday: boolean;
  isSunday: boolean;
} => {
  const refactorMonth = getDatePickerRefactoredMonth(month, day.month);
  const date = new Date(year, refactorMonth, day.value);
  const dayOfWeek = date.getDay();

  return {
    isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
    isSaturday: dayOfWeek === 6,
    isSunday: dayOfWeek === 0,
  };
};

export const compareObjectDate = (
  first: DateObjectUnits,
  second: DateObjectUnits
) => {
  return (
    first.day === second.day &&
    first.month === second.month &&
    first.year === second.year
  );
};

export const isBeforeDate = (
  first: MakeOptionalRequired<DateObjectUnits> | Date,
  second: MakeOptionalRequired<DateObjectUnits> | Date
) => {
  const firstDate =
    first instanceof Date ? first : convertDateObjectToDate(first);
  const secondDate =
    second instanceof Date ? second : convertDateObjectToDate(second);
  return firstDate < secondDate;
};

export function generateYearsArray(startYear: number, endYear: number) {
  const years: number[] = [];
  for (let i = endYear; i >= startYear; i--) {
    years.push(i);
  }
  return years;
}

const now = new Date();
export const currentYear = now.getFullYear();

export const getMonthName = (
  month: number,
  format: "narrow" | "long" | "short" = "long",
  locale?: Locale
) => {
  const date = new Date(2000, month, 1);
  return date.toLocaleString(locale ?? "en", { month: format });
};

export const formatDateObject = (
  date: DateObjectUnits,
  localeOptions?: LocaleOptions,
  locale?: Locale
) =>
  convertDateObjectToDate(date).toLocaleDateString(
    locale ?? "en-US",
    localeOptions || {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

export const handleDateRange = ({
  year,
  day,
  startDay,
  endDay,
  disabledDays,
  month,
  hover,
  hoverEndDay,
  enabledDays,
}: {
  startDay: DateObjectUnits | undefined;
  endDay: DateObjectUnits | undefined;
  year: Accessor<number>;
  month: Accessor<number>;
  day: IMonthDaysObject;
  disabledDays?: DateArray[];
  enabledDays?: DateArray[];
  hover?: boolean;
  hoverEndDay?: boolean;
}): {
  start?: DateObjectUnits;
  end?: DateObjectUnits;
  initial?: boolean;
} => {
  if (
    ((startDay && endDay) || (!startDay && !endDay)) &&
    !hover &&
    !hoverEndDay
  ) {
    const dateObject = {
      year: year(),
      month: getDatePickerRefactoredMonth(month(), day.month),
      day: day.value,
    };
    return {
      start: dateObject,
      end: undefined,
      initial: true,
    };
  }
  if (startDay && !endDay) {
    const startDayDate = new Date(
      startDay?.year!,
      startDay?.month!,
      startDay?.day
    );
    const endDayDate = new Date(
      year(),
      getDatePickerRefactoredMonth(month(), day.month),
      day.value
    );

    if (startDayDate.getTime() === endDayDate.getTime()) {
      return {
        start: startDay,
      };
    }

    if (
      startDayDate.getTime() < endDayDate.getTime() &&
      ((disabledDays &&
        isDateRangeDisabled(startDayDate, endDayDate, disabledDays)) ||
        (enabledDays &&
          isDateRangeEnabled(startDayDate, endDayDate, enabledDays)))
    ) {
      if (hover) {
        return {
          start: startDay,
        };
      }
      return {
        start: convertDateToDateObject(endDayDate),
        initial: true,
      };
    }

    if (
      startDayDate.getTime() > endDayDate.getTime() &&
      ((disabledDays &&
        isDateRangeDisabled(startDayDate, endDayDate, disabledDays)) ||
        (enabledDays &&
          isDateRangeEnabled(endDayDate, startDayDate, enabledDays)))
    ) {
      if (hover) {
        return {
          start: startDay,
        };
      }
      return {
        start: convertDateToDateObject(endDayDate),
        initial: true,
      };
    }

    if (startDayDate.getTime() < endDayDate.getTime()) {
      return {
        end: convertDateToDateObject(endDayDate),
        start: startDay,
      };
    }

    if (startDayDate.getTime() > endDayDate.getTime()) {
      return {
        start: convertDateToDateObject(endDayDate),
        end: convertDateToDateObject(startDayDate),
      };
    }
  }
  return {
    start: startDay,
    end: endDay,
  };
};
