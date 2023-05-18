import { Accessor, Component, JSXElement, Setter, Show } from "solid-js";
import { styled } from "solid-styled-components";
import { PhosphorIcon } from "../PhosphorIcon";
import { DatePickerMonthAndYearSelector } from "../DatePickerMonthAndYearSelector";
import { Button } from "../Button";

export interface DatePickerTopProps {
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  setMonth: Setter<number>;
  setYear: Setter<number>;
  month: Accessor<number>;
  year: Accessor<number>;
  render: Accessor<boolean>;
  monthSelectorJSX?: JSXElement;
  yearSelectorJSX?: JSXElement;
  monthYearSelectorJSX?: JSXElement;
  zIndex?: number;
}

export const DatePickerTop: Component<DatePickerTopProps> = (props) => {
  return (
    <div
      class={
        "date-picker-top flex justify-between items-center mb-[0.3125rem] px-2"
      }
      data-date-picker-top={true}
    >
      <Button onClick={props.handlePrevMonth}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
        </svg>
      </Button>

      <Show when={props.monthYearSelectorJSX} keyed>
        {props.monthYearSelectorJSX}
      </Show>
      <Show when={!props.monthYearSelectorJSX} keyed>
        {props.monthYearSelectorJSX}
        <DatePickerMonthAndYearSelector
          setYear={props.setYear}
          setMonth={props.setMonth}
          month={props.month}
          year={props.year}
          render={props.render}
          monthSelectorJSX={props.monthSelectorJSX}
          yearSelectorJSX={props.yearSelectorJSX}
          zIndex={props.zIndex}
        />
      </Show>

      <Button onClick={props.handleNextMonth}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
        </svg>
      </Button>
    </div>
  );
};
