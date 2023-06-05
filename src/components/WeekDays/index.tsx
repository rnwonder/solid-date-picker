import { Component, createSignal, For, onMount } from "solid-js";
import {
  ClassNames,
  IColors,
  Locale,
  WeekDaysType,
} from "../../interface/general";
import { DatePickerDay } from "../DatePickerDay";
import { DatePickerWeek } from "../DatePickerWeek";

interface IProps extends IColors, ClassNames {
  locale?: Locale;
  weekDaysType?: WeekDaysType;
  weekStartDay?: number;
}
export const WeekDays: Component<IProps> = (props) => {
  const [weekDaysArray, setWeekDaysArray] = createSignal<Array<string>>([]);
  const [weekDaysLong, setWeekDaysLong] = createSignal<Array<string>>([]);

  onMount(() => {
    const dayNames = Array.from({ length: 7 }, (e, i) => {
      return new Date(
        0,
        0,
        i - (1 - (props.weekStartDay || 0)) + 1
      ).toLocaleDateString(props.locale || "en", {
        weekday: props.weekDaysType === "single" ? "narrow" : "short",
      });
    });
    const dayLongNames = Array.from({ length: 7 }, (e, i) => {
      return new Date(
        0,
        0,
        i - (1 - (props.weekStartDay || 0)) + 1
      ).toLocaleDateString(props.locale || "en", {
        weekday: "long",
      });
    });
    setWeekDaysLong(dayLongNames);
    setWeekDaysArray(dayNames);
  });
  return (
    <DatePickerWeek weekNamesRowClass={props.weekNamesRowClass}>
      <For each={weekDaysArray()}>
        {(day, index) => (
          <DatePickerDay
            weekDaysNameColor={props.weekDaysNameColor}
            weekNamesClass={props.weekNamesClass}
            wrapperProps={{
              "data-scope": "date-picker",
              "data-type": "column-header",
              "aria-label": weekDaysLong()[index()],
              role: "columnheader",
            }}
            header
            headerValue={weekDaysLong()[index()]}
          >
            {day}
          </DatePickerDay>
        )}
      </For>
    </DatePickerWeek>
  );
};
