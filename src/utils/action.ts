import {
  DateArray,
  DateObjectUnits,
  MonthDaysObject,
} from "../interface/general";
import { Accessor } from "solid-js";
import {
  getDatePickerRefactoredMonth,
  getDatePickerRefactoredYear,
} from "./generate";
import { convertDateToDateObject } from "./format";
import { isDateRangeDisabled, isDateRangeEnabled } from "./general";

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
  day: MonthDaysObject;
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
      year: getDatePickerRefactoredYear(year(), month(), day.month),
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
      startDay?.day,
    );
    const endDayDate = new Date(
      getDatePickerRefactoredYear(year(), month(), day.month),
      getDatePickerRefactoredMonth(month(), day.month),
      day.value,
    );

    if (startDayDate.getTime() === endDayDate.getTime()) {
      return {
        start: startDay,
        end: convertDateToDateObject(endDayDate),
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
