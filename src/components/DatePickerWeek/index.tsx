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
          rn-grid
          rn-grid-cols-7
          rn-text-sm
        `,
        {
          "date-picker-week-names-row rn-my-2": props.header,
          "date-picker-days-row rn-mb-[0.13rem]": !props.header,
        },
        props.weekNamesRowClass,
        props.daysRowClass
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
