import { Component, createSignal, For, onMount } from "solid-js";
import { DatePickerWeek } from "../DatePickerWeek";
import { DatePickerDay } from "../DatePickerDay";
import {
  ClassNames,
  IColors,
  Locale,
  WeekDaysType,
} from "../../interface/general";

interface IProps extends IColors, ClassNames {
  locale?: Locale;
  weekDaysType?: WeekDaysType;
  weekStartDay?: number;
}
export const WeekDays: Component<IProps> = (props) => {
  const [weekDaysArray, setWeekDaysArray] = createSignal<Array<string>>([]);

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
    setWeekDaysArray(dayNames);
  });
  return (
    <DatePickerWeek weekNamesRowClass={props.weekNamesRowClass}>
      <For each={weekDaysArray()}>
        {(day) => (
          <DatePickerDay
            weekDaysNameColor={props.weekDaysNameColor}
            weekNamesClass={props.weekNamesClass}
            header
          >
            {day}
          </DatePickerDay>
        )}
      </For>
    </DatePickerWeek>
  );
};
