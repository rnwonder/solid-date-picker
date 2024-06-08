import { Accessor, Component, For, Setter } from "solid-js";
import { applyDateRangeProps } from "@rnwonder/simple-datejs/datePicker";
import { DatePickerDay } from "../DatePickerDay";
import { DatePickerWeek } from "../DatePickerWeek";
import {
  DateObjectUnits,
  DateArray,
  MakeOptionalRequired,
  CustomDaysClassName,
  HandleDayClick,
  HoverRangeValue,
  CalendarDaysClassNamesAndColors,
  Locale,
  MonthDaysObject,
} from "../../interface/general";
import { cn, convertFormattedNumberBackToNumber } from "../../utils";
import { createDaysArray } from "../../hooks/createDaysArray";

export interface CalendarDaysProps extends CalendarDaysClassNamesAndColors {
  month: Accessor<number>;
  year: Accessor<number>;
  handleDayClick: HandleDayClick;
  startDay: Accessor<DateObjectUnits | undefined>;
  endDay: Accessor<DateObjectUnits | undefined>;

  minDate?: MakeOptionalRequired<DateObjectUnits>;
  maxDate?: MakeOptionalRequired<DateObjectUnits>;
  disabledDays?: DateArray[];
  enabledDays?: DateArray[];
  customDaysClassName?: CustomDaysClassName[];
  multipleObject: Accessor<DateObjectUnits[]>;
  shouldHighlightWeekends?: boolean;
  onDisabledDayError?: (data: DateObjectUnits) => void;
  hideOutSideDays?: boolean;

  nextMonth?: boolean;
  twoMonthsDisplay?: boolean;
  onHoverDay: HandleDayClick;
  onHoverDayEnd: HandleDayClick;
  hoverRangeValue: Accessor<HoverRangeValue>;

  weekStartDay?: number;

  showSelectorTwo?: Accessor<boolean>;
  locale?: Locale;
  setDayRowsArray: Setter<MonthDaysObject<string>[][]>;
  dayRowsArray: Accessor<MonthDaysObject<string>[][]>;
}
export const CalendarDays: Component<CalendarDaysProps> = (props) => {
  createDaysArray({
    month: props.month,
    year: props.year,
    weekStartDay: props.weekStartDay,
    locale: props.locale || "en-US",
    setDayRowsArray: props.setDayRowsArray,
    dayRowsArray: props.dayRowsArray,
  });
  return (
    <div
      data-type={"calendar-days-area"}
      data-scope={"date-picker"}
      class={cn(
        "date-picker-calendar-days-area",
        props.datePickerCalendarDaysArea,
      )}
    >
      <For each={props.dayRowsArray()}>
        {(daysRow, index) => (
          <DatePickerWeek
            daysRowClass={cn(
              {
                "rn-hidden": props.showSelectorTwo?.() && index() > 0,
              },
              props.daysRowClass,
            )}
          >
            <For each={daysRow}>
              {(day) => {
                const correctedDay = convertFormattedNumberBackToNumber(
                  props.locale || "en-US",
                  day,
                );

                return (
                  <DatePickerDay
                    {...{ ...props, calendarWeekDaysNameClass: undefined }}
                    {...applyDateRangeProps({
                      year: props.year,
                      day: correctedDay,
                      month: props.month,
                      startDay: props.startDay(),
                      endDay: props.endDay(),
                      customDaysClassName: props.customDaysClassName,
                      multipleObject: props.multipleObject(),
                      hideOutSideDays: props.hideOutSideDays,
                      hoverRangeValue: props.hoverRangeValue,
                      enabledDays: props.enabledDays,
                      minDate: props.minDate,
                      maxDate: props.maxDate,
                      disabledDays: props.disabledDays,
                    })}
                    year={props.year}
                    month={props.month}
                    day={correctedDay.value}
                    onClick={() =>
                      props.handleDayClick(
                        correctedDay,
                        props.month,
                        props.year,
                        props.nextMonth || false,
                      )
                    }
                    onHover={() =>
                      props.onHoverDay(
                        correctedDay,
                        props.month,
                        props.year,
                        props.nextMonth || false,
                      )
                    }
                    onHoverEnd={() =>
                      props.onHoverDayEnd(
                        correctedDay,
                        props.month,
                        props.year,
                        props.nextMonth || false,
                      )
                    }
                    primaryColor={props.primaryColor}
                    primaryTextColor={props.primaryTextColor}
                    secondaryColor={props.secondaryColor}
                    secondaryTextColor={props.secondaryTextColor}
                    disabledDays={props.disabledDays}
                    shouldHighlightWeekends={props.shouldHighlightWeekends}
                    onDisabledDayError={props.onDisabledDayError}
                    hoverRangeValue={props.hoverRangeValue}
                  >
                    {day.value}
                  </DatePickerDay>
                );
              }}
            </For>
          </DatePickerWeek>
        )}
      </For>
    </div>
  );
};
