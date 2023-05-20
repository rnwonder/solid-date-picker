import { Component, createSignal, For, onMount } from "solid-js";
import { DatePickerWeek } from "../DatePickerWeek";
import { DatePickerDay } from "../DatePickerDay";

interface IProps {
  locale?: Intl.LocalesArgument;
}
export const WeekDays: Component<IProps> = (props) => {
  const [weekDaysArray, setWeekDaysArray] = createSignal<Array<string>>([]);

  onMount(() => {
    const dayNames = Array.from({ length: 7 }, (e, i) => {
      return new Date(0, 0, i - 1 + 1).toLocaleDateString(
        props.locale || "en",
        {
          weekday: "short",
        }
      );
    });
    setWeekDaysArray(dayNames);
  });
  return (
    <DatePickerWeek>
      <For each={weekDaysArray()}>
        {(day) => <DatePickerDay header>{day}</DatePickerDay>}
      </For>
    </DatePickerWeek>
  );
};
