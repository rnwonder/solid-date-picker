import { Accessor, Component, For } from "solid-js";
import {
  applyDateRangeProps,
  getMonthDaysArray,
  isMinMaxDate,
  isPartOfDisabledDays,
} from "../../utils";
import { DatePickerDay } from "../DatePickerDay";
import { DatePickerWeek } from "../DatePickerWeek";
import {
  DateObjectUnits,
  IColors,
  DisableDate,
  MakeOptionalRequired,
  CustomDaysClassName,
  HandleDayClick,
} from "../../interface/general";

export interface CalendarDaysProps extends IColors {
  month: Accessor<number>;
  year: Accessor<number>;
  handleDayClick: HandleDayClick;
  startDay: Accessor<DateObjectUnits | undefined>;
  endDay: Accessor<DateObjectUnits | undefined>;

  minDate?: MakeOptionalRequired<DateObjectUnits>;
  maxDate?: MakeOptionalRequired<DateObjectUnits>;
  disabledDays?: DisableDate[];
  customDaysClassName?: CustomDaysClassName[];
  multipleObject: Accessor<DateObjectUnits[]>;
  shouldHighlightWeekends?: boolean;
  onDisabledDayError?: () => void;
  hideOutSideDays?: boolean;

  nextMonth?: boolean;
  twoMonthsDisplay?: boolean;
}
export const CalendarDays: Component<CalendarDaysProps> = (props) => {
  return (
    <DatePickerWeek>
      <For each={getMonthDaysArray(props.month(), props.year())}>
        {(day) => (
          <DatePickerDay
            {...props}
            {...applyDateRangeProps({
              year: props.year,
              day,
              month: props.month,
              startDay: props.startDay(),
              endDay: props.endDay(),
              customDaysClassName: props.customDaysClassName,
              multipleObject: props.multipleObject(),
              hideOutSideDays: props.hideOutSideDays,
            })}
            onClick={() =>
              props.handleDayClick(
                day,
                props.month,
                props.year,
                props.nextMonth || false
              )
            }
            disabled={
              isPartOfDisabledDays({
                disabledDays: props.disabledDays,
                day,
                month: props.month(),
                year: props.year(),
              }) ||
              isMinMaxDate({
                day,
                month: props.month,
                year: props.year,
                minDate: props.minDate,
                maxDate: props.maxDate,
              })
            }
            primaryColor={props.primaryColor}
            primaryTextColor={props.primaryTextColor}
            secondaryColor={props.secondaryColor}
            secondaryTextColor={props.secondaryTextColor}
            disabledDays={props.disabledDays}
            shouldHighlightWeekends={props.shouldHighlightWeekends}
            onDisabledDayError={props.onDisabledDayError}
          >
            {day.value}
          </DatePickerDay>
        )}
      </For>
    </DatePickerWeek>
  );
};
