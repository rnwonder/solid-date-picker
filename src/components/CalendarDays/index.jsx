import { For } from "solid-js";
import { applyDateRangeStyles, getMonthDaysArray, isMinMaxDate, } from "../DatePickerDay/config";
import { DatePickerDay } from "../DatePickerDay";
import { DatePickerWeek } from "../DatePickerWeek";
export const CalendarDays = (props) => {
    return (<DatePickerWeek>
      <For each={getMonthDaysArray(props.month(), props.year())}>
        {(day) => (<DatePickerDay {...applyDateRangeStyles({
            year: props.year,
            day,
            month: props.month,
            startDay: props.startDay(),
            endDay: props.endDay(),
        })} onClick={() => props.handleDayClick(day)} disabled={isMinMaxDate({
                day,
                month: props.month,
                year: props.year,
                minDate: props.minDate,
                maxDate: props.maxDate,
            })}>
            {day.value}
          </DatePickerDay>)}
      </For>
    </DatePickerWeek>);
};
