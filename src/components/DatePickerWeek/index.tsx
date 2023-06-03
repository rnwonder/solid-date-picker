import { Component, JSXElement } from "solid-js";
import { ClassNames } from "../../interface/general";
import clsx from "clsx";

interface DatePickerWeekDaysProps extends ClassNames {
  children: JSXElement;
}
export const DatePickerWeek: Component<DatePickerWeekDaysProps> = (props) => {
  return (
    <div
      class={clsx(
        `
    date-picker-calendar-row
    grid
    grid-cols-7
    my-2
    text-sm
    text-red-500
    
  `,
        props.weekNamesRowClass
      )}
      data-type={"date-picker-calendar-row"}
      //@ts-ignore
      role={"composite"}
    >
      {props.children}
    </div>
  );
};
