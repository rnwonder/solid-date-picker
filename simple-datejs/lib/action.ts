import { DateArray, DateObjectUnits, MonthDaysObject } from "./types";
import {
  CustomAccessor,
  getDatePickerRefactoredMonth,
  getDatePickerRefactoredYear,
} from "./generate";
import { convertDateToDateObject } from "./format";
import { isDateRangeDisabled, isDateRangeEnabled } from "./general";
import { getAccessorValue, modifiedDate } from "./localHelpers";

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
  disallowSameDayRange,
}: {
  startDay: DateObjectUnits | undefined;
  endDay: DateObjectUnits | undefined;
  year: CustomAccessor<number>;
  month: CustomAccessor<number>;
  day: MonthDaysObject;
  disabledDays?: DateArray[];
  enabledDays?: DateArray[];
  hover?: boolean;
  hoverEndDay?: boolean;
  disallowSameDayRange?: boolean;
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
      year: getDatePickerRefactoredYear(
        getAccessorValue(year),
        getAccessorValue(month),
        day.month,
      ),
      month: getDatePickerRefactoredMonth(getAccessorValue(month), day.month),
      day: day.value,
    };
    return {
      start: dateObject,
      end: undefined,
      initial: true,
    };
  }
  if (startDay) {
    // Ensure startDay has required properties
    if (
      startDay.year === undefined ||
      startDay.month === undefined ||
      startDay.day === undefined
    ) {
      return { start: startDay, end: endDay };
    }

    const startDayDate = modifiedDate(
      startDay.year,
      startDay.month,
      startDay.day,
    );
    const endDayDate = modifiedDate(
      getDatePickerRefactoredYear(
        getAccessorValue(year),
        getAccessorValue(month),
        day.month,
      ),
      getDatePickerRefactoredMonth(getAccessorValue(month), day.month),
      day.value,
    );

    if (startDayDate.getTime() === endDayDate.getTime()) {
      if (disallowSameDayRange) {
        return {
          start: startDay,
        };
      }

      return {
        start: startDay,
        end: convertDateToDateObject(endDayDate),
      };
    }

    // Check if the range contains disabled dates
    const rangeHasDisabledDates =
      disabledDays &&
      isDateRangeDisabled(
        startDayDate.getTime() < endDayDate.getTime()
          ? startDayDate
          : endDayDate,
        startDayDate.getTime() < endDayDate.getTime()
          ? endDayDate
          : startDayDate,
        disabledDays,
      );

    const rangeHasUnavailableDates =
      enabledDays &&
      isDateRangeEnabled(
        startDayDate.getTime() < endDayDate.getTime()
          ? startDayDate
          : endDayDate,
        startDayDate.getTime() < endDayDate.getTime()
          ? endDayDate
          : startDayDate,
        enabledDays,
      );

    // If range contains disabled/unavailable dates, don't allow the selection
    if (rangeHasDisabledDates || rangeHasUnavailableDates) {
      if (hover) {
        return {
          start: startDay,
        };
      }
      // Reset to new start date instead of invalid range
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