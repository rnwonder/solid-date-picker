import { Accessor, Component, For } from "solid-js";
import {
  applyDateRangeStyles,
  getMonthDaysArray,
  isMinMaxDate,
} from "../DatePickerDay/config";
import { DatePickerDay } from "../DatePickerDay";
import { DatePickerWeek } from "../DatePickerWeek";
import { DateObjectUnits, IMonthDaysObject } from "../../interface/date";

export interface CalendarDaysProps {
  month: Accessor<number>;
  year: Accessor<number>;
  handleDayClick: (day: IMonthDaysObject) => void;
  startDay: Accessor<DateObjectUnits | undefined>;
  endDay: Accessor<DateObjectUnits | undefined>;

  minDate?: DateObjectUnits;
  maxDate?: DateObjectUnits;
}
export const CalendarDays: Component<CalendarDaysProps> = (props) => {
  return (
    <DatePickerWeek>
      <For
        each={getMonthDaysArray(
          props.month(),
          props.year()
        )}
      >
        {(day) => (
          <DatePickerDay
            {...applyDateRangeStyles({
              year: props.year,
              day,
              month: props.month,
              startDay: props.startDay(),
              endDay: props.endDay(),
            })}
            onClick={() => props.handleDayClick(day)}
            disabled={isMinMaxDate({
              day,
              month: props.month,
              year: props.year,
              minDate: props.minDate,
              maxDate: props.maxDate,
            })}
          >
            {day.value}
          </DatePickerDay>
        )}
      </For>
    </DatePickerWeek>
  );
};
