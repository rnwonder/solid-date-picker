import { Accessor, Component, JSXElement, Setter, Show } from "solid-js";
import { DatePickerMonthAndYearSelector } from "../DatePickerMonthAndYearSelector";
import { Button } from "../Button";
import {
  IMonthSelectorType,
  IMonthYearSelectorFlexDirection,
  IYearRange,
} from "../../interface/date";
import { PrevIcon } from "../PrevIcon";
import { NextIcon } from "../NextIcon";

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
  setAllowedComponents: Setter<HTMLElement[]>;
  monthSelectorFormat?: IMonthSelectorType;
  monthYearSelectorFlexDirection?: IMonthYearSelectorFlexDirection;
  yearRange?: IYearRange;
  locale?: Intl.LocalesArgument;
  nextIcon?: JSXElement;
  prevIcon?: JSXElement;
  removeNavButtons?: boolean;
  nextButtonAreaJSX?: JSXElement;
  prevButtonAreaJSX?: JSXElement;
}

export const DatePickerTop: Component<DatePickerTopProps> = (props) => {
  return (
    <div
      class={`
        date-picker-top 
        flex 
        justify-between 
        items-center 
        mb-[0.3125rem] 
        px-2
      `}
      data-type={"date-picker-top"}
    >
      <Show when={props.prevButtonAreaJSX} keyed>
        {props.prevButtonAreaJSX}
      </Show>

      <Show when={!props.removeNavButtons} keyed>
        <Button
          class={"date-prev-next-btn"}
          data-prev={true}
          data-type={"date-prev-next-btn"}
          onClick={props.handlePrevMonth}
        >
          {props.prevIcon || <PrevIcon />}
        </Button>
      </Show>

      <Show when={props.monthYearSelectorJSX} keyed>
        {props.monthYearSelectorJSX}
      </Show>

      <Show when={!props.monthYearSelectorJSX} keyed>
        {props.monthYearSelectorJSX}
        <DatePickerMonthAndYearSelector {...props} />
      </Show>

      <Show when={!props.removeNavButtons} keyed>
        <Button
          class={"date-prev-next-btn"}
          data-next={true}
          data-type={"date-prev-next-btn"}
          onClick={props.handleNextMonth}
        >
          {props.nextIcon || <NextIcon />}
        </Button>
      </Show>

      <Show when={props.nextButtonAreaJSX} keyed>
        {props.nextButtonAreaJSX}
      </Show>
    </div>
  );
};
