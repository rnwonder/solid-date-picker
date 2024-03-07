import { Accessor, Component, For } from "solid-js";
import { applyDateRangeProps } from "../../utils";
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
} from "../../interface/general";
import { cn } from "../../utils";
import { createDaysArray, dayRowsArray } from "../../hooks/createDaysArray";
import { showSelectorTwo } from "../SelectorTwo";

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
  onDisabledDayError?: () => void;
  hideOutSideDays?: boolean;

  nextMonth?: boolean;
  twoMonthsDisplay?: boolean;
  onHoverDay: HandleDayClick;
  onHoverDayEnd: HandleDayClick;
  hoverRangeValue: Accessor<HoverRangeValue>;

  weekStartDay?: number;
}
export const CalendarDays: Component<CalendarDaysProps> = (props) => {
  createDaysArray({
    month: props.month,
    year: props.year,
    weekStartDay: props.weekStartDay,
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
      <For each={dayRowsArray()}>
        {(daysRow, index) => (
          <DatePickerWeek
            daysRowClass={cn(
              {
                "rn-hidden": showSelectorTwo() && index() > 0,
              },
              props.daysRowClass,
            )}
          >
            <For each={daysRow}>
              {(day) => (
                <DatePickerDay
                  {...{ ...props, calendarWeekDaysNameClass: undefined }}
                  {...applyDateRangeProps({
                    year: props.year,
                    day,
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
                  onClick={() =>
                    props.handleDayClick(
                      day,
                      props.month,
                      props.year,
                      props.nextMonth || false,
                    )
                  }
                  onHover={() =>
                    props.onHoverDay(
                      day,
                      props.month,
                      props.year,
                      props.nextMonth || false,
                    )
                  }
                  onHoverEnd={() =>
                    props.onHoverDayEnd(
                      day,
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
              )}
            </For>
          </DatePickerWeek>
        )}
      </For>
    </div>
  );
};
