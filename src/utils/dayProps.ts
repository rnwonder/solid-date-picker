import {
  ApplyDateRange,
  CustomDaysClassName,
  DateArray,
  DateObjectUnits,
  HoverRangeValue,
  IMonthDaysObject,
  MakeOptionalRequired,
} from "../interface/general";
import { Accessor } from "solid-js";
import { getDatePickerRefactoredMonth } from "./generate";
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
  const date = `${year()}-${getDatePickerRefactoredMonth(month(), day.month)}-${
    day.value
  }`;
  return {
    dayRangeEndHover: checkHoverEnd(
      hoverRangeValue,
      startDay,
      day,
      year,
      month
    ),
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
    date,
    dateValue: date,
  };
};

const checkHoverEnd = (
  hoverRangeValue: Accessor<HoverRangeValue>,
  startDay: DateObjectUnits | undefined,
  day: IMonthDaysObject,
  year: Accessor<number>,
  month: Accessor<number>
) => {
  if (!hoverRangeValue().end?.day) return false;
  if (!hoverRangeValue().start?.day) return false;
  if (!startDay?.day) return false;
  if (isBeforeDate(hoverRangeValue().start as any, startDay as any)) {
    return compareObjectDate(hoverRangeValue().start!, {
      year: year(),
      month: getDatePickerRefactoredMonth(month(), day.month),
      day: day.value,
    });
  }
  if (isBeforeDate(startDay as any, hoverRangeValue().end as any)) {
    return compareObjectDate(hoverRangeValue().end!, {
      year: year(),
      month: getDatePickerRefactoredMonth(month(), day.month),
      day: day.value,
    });
  }
  return false;
};
