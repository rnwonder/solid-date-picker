import {
  ApplyDateRange,
  CustomDaysClassName,
  DateArray,
  DateObjectUnits,
  HoverRangeValue,
  MonthDaysObject,
  MakeOptionalRequired,
} from "./types";
import {
  CustomAccessor,
  getDatePickerRefactoredMonth,
  getDatePickerRefactoredYear,
} from "./generate";
import {
  checkIfItsTodayDate,
  compareObjectDate,
  isBeforeDate,
  isDayInBetweenRange,
  isDayTipRange,
  isMinMaxDate,
  isNotPartOfEnabledDays,
  isPartOfDisabledDays,
  isWeekendStatus,
} from "./general";
import { getAccessorValue, modifiedDate } from "./localHelpers";

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
  year: CustomAccessor<number>;
  month: CustomAccessor<number>;
  day: MonthDaysObject;
  customDaysClassName?: CustomDaysClassName[];
  multipleObject: DateObjectUnits[];
  hideOutSideDays?: boolean;
  hoverRangeValue: CustomAccessor<HoverRangeValue>;
  minDate?: MakeOptionalRequired<DateObjectUnits>;
  maxDate?: MakeOptionalRequired<DateObjectUnits>;
  disabledDays?: DateArray[];
  enabledDays?: DateArray[];
}): ApplyDateRange => {
  const date = `${getAccessorValue(year)}-${getDatePickerRefactoredMonth(getAccessorValue(month), day.month)}-${
    day.value
  }`;
  return {
    dayRangeEndHover: checkHoverEnd(
      hoverRangeValue,
      startDay,
      day,
      year,
      month,
    ),
    dayRangeStartEnd:
      (getAccessorValue(hoverRangeValue).start || startDay) &&
      (getAccessorValue(hoverRangeValue).end || endDay) &&
      (isDayTipRange({
        year: getAccessorValue(year),
        month: getAccessorValue(month),
        day: day.value,
        dateRange: getAccessorValue(hoverRangeValue).start || startDay,
        monthStatus: day.month,
      }) ||
        isDayTipRange({
          year: getAccessorValue(year),
          month: getAccessorValue(month),
          day: day.value,
          dateRange: getAccessorValue(hoverRangeValue).end || endDay,
          monthStatus: day.month,
        })),
    dayRangeBetween: isDayInBetweenRange({
      year: getAccessorValue(year),
      month: getAccessorValue(month),
      day: day.value,
      startDate: getAccessorValue(hoverRangeValue).start || startDay,
      endDate: getAccessorValue(hoverRangeValue).end || endDay,
      monthStatus: day.month,
    }),
    dayRangeStart: isDayTipRange({
      year: getAccessorValue(year),
      month: getAccessorValue(month),
      day: day.value,
      dateRange: getAccessorValue(hoverRangeValue).start || startDay,
      monthStatus: day.month,
    }),
    dayRangeEnd: isDayTipRange({
      year: getAccessorValue(year),
      month: getAccessorValue(month),
      day: day.value,
      dateRange: getAccessorValue(hoverRangeValue).end || endDay,
      monthStatus: day.month,
    }),
    daysCurrent:
      checkIfItsTodayDate(
        modifiedDate(
          getDatePickerRefactoredYear(
            getAccessorValue(year),
            getAccessorValue(month),
            day.month,
          ),
          getDatePickerRefactoredMonth(getAccessorValue(month), day.month),
          day.value,
        ),
      ) && day.month === "current",
    daysNotCurrentMonth: day.month !== "current",
    ...isWeekendStatus({
      year: getAccessorValue(year),
      month: getAccessorValue(month),
      day,
    }),
    customDayClass: customDaysClassName?.find(
      (customDay) =>
        customDay.year ===
          getDatePickerRefactoredYear(
            getAccessorValue(year),
            getAccessorValue(month),
            day.month,
          ) &&
        customDay.month ===
          getDatePickerRefactoredMonth(getAccessorValue(month), day.month) &&
        customDay.day === day.value,
    )?.className,
    isMultipleSelected: !!multipleObject?.find(
      (multiple) =>
        multiple.year ===
          getDatePickerRefactoredYear(
            getAccessorValue(year),
            getAccessorValue(month),
            day.month,
          ) &&
        multiple.month ===
          getDatePickerRefactoredMonth(getAccessorValue(month), day.month) &&
        multiple.day === day.value,
    ),
    hidden: hideOutSideDays ? day.month !== "current" : false,
    disabled:
      isPartOfDisabledDays({
        disabledDays,
        day,
        month: getAccessorValue(month),
        year: getAccessorValue(year),
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
        month: getAccessorValue(month),
        year: getAccessorValue(year),
      }),
    date,
    dateValue: date,
  };
};

const checkHoverEnd = (
  hoverRangeValue: CustomAccessor<HoverRangeValue>,
  startDay: DateObjectUnits | undefined,
  day: MonthDaysObject,
  year: CustomAccessor<number>,
  month: CustomAccessor<number>,
) => {
  if (!getAccessorValue(hoverRangeValue).end?.day) return false;
  if (!getAccessorValue(hoverRangeValue).start?.day) return false;
  if (!startDay?.day) return false;
  if (
    isBeforeDate(
      getAccessorValue(hoverRangeValue).start as any,
      startDay as any,
    )
  ) {
    return compareObjectDate(getAccessorValue(hoverRangeValue).start!, {
      year: getDatePickerRefactoredYear(
        getAccessorValue(year),
        getAccessorValue(month),
        day.month,
      ),
      month: getDatePickerRefactoredMonth(getAccessorValue(month), day.month),
      day: day.value,
    });
  }
  if (
    isBeforeDate(startDay as any, getAccessorValue(hoverRangeValue).end as any)
  ) {
    return compareObjectDate(getAccessorValue(hoverRangeValue).end!, {
      year: getDatePickerRefactoredYear(
        getAccessorValue(year),
        getAccessorValue(month),
        day.month,
      ),
      month: getDatePickerRefactoredMonth(getAccessorValue(month), day.month),
      day: day.value,
    });
  }
  return false;
};
