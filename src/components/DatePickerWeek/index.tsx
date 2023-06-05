import { Component, JSXElement } from "solid-js";
import { ClassNames } from "../../interface/general";
import clsx from "clsx";

interface DatePickerWeekDaysProps extends ClassNames {
  children: JSXElement;
  header?: boolean;
}
export const DatePickerWeek: Component<DatePickerWeekDaysProps> = (props) => {
  return (
    <div
      class={clsx(
        `
    date-picker-calendar-row
    rn-grid
    rn-grid-cols-7
    rn-my-2
    rn-text-sm
    rn-text-red-500
    
  `,
        props.weekNamesRowClass
      )}
      data-type={"date-picker-calendar-row"}
      data-part={props.header ? "header" : "row"}
      data-scope={"date-picker"}
      //@ts-ignore
      role={"row"}
    >
      {props.children}
    </div>
  );
};
