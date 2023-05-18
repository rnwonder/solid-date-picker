import { Component, JSXElement } from "solid-js";

interface DatePickerWeekDaysProps {
  children: JSXElement;
}
export const DatePickerWeek: Component<DatePickerWeekDaysProps> = (props) => {
  return (
    <div
      class={`
    calendar-row
    grid
    grid-cols-7
    my-2
    text-sm
    text-red-500
    px-4
    
  `}
      data-calendar-row={true}
      //@ts-ignore
      role={"composite"}
    >
      {props.children}
    </div>
  );
};
