import { Component, JSXElement } from "solid-js";

interface DatePickerWeekDaysProps {
  children: JSXElement;
}
export const DatePickerWeek: Component<DatePickerWeekDaysProps> = (props) => {
  return (
    <div
      class={`
    date-picker-calendar-row
    grid
    grid-cols-7
    my-2
    text-sm
    text-red-500
    
  `}
      data-type={"date-picker-calendar-row"}
      //@ts-ignore
      role={"composite"}
    >
      {props.children}
    </div>
  );
};
