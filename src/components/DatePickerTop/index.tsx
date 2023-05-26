import { Accessor, Component, JSXElement, Setter, Show } from "solid-js";
import { DatePickerMonthAndYearSelector } from "../DatePickerMonthAndYearSelector";
import { Button } from "../Button";
import {
  IMonthSelectorType,
  IMonthYearSelectorFlexDirection,
  IYearRange,
  Locale,
  IColors,
  MakeOptionalRequired,
  DateObjectUnits,
} from "../../interface/general";
import { PrevIcon } from "../PrevIcon";
import { NextIcon } from "../NextIcon";

export interface DatePickerTopProps extends IColors {
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
  locale?: Locale;
  nextIcon?: JSXElement;
  prevIcon?: JSXElement;
  removeNavButtons?: boolean;
  nextButtonAreaJSX?: JSXElement;
  prevButtonAreaJSX?: JSXElement;
  minDate?: MakeOptionalRequired<DateObjectUnits>;
  maxDate?: MakeOptionalRequired<DateObjectUnits>;

  twoMonthsDisplay?: boolean;
}

export const DatePickerTop: Component<DatePickerTopProps> = (props) => {
  const isPrevButtonDisabled = () => {
    if (!props.minDate) return false;
    if (props.year() < props.minDate.year) return true;
    if (props.year() === props.minDate.year) {
      if (props.month() - 1 < props.minDate.month) return true;
    }
    return false;
  };

  const isNextButtonDisabled = () => {
    if (!props.maxDate) return false;
    if (props.year() > props.maxDate.year) return true;
    if (props.year() === props.maxDate.year) {
      if (props.month() + 1 > props.maxDate.month) return true;
    }
    return false;
  };
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
          class={"date-prev-next-btn disabled:opacity-10"}
          data-prev={true}
          data-type={"date-prev-next-btn"}
          disabled={isPrevButtonDisabled()}
          onClick={props.handlePrevMonth}
          style={{
            ...(props.textColor && { color: props.textColor }),
          }}
        >
          {props.prevIcon || <PrevIcon color={props.textColor} />}
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
          class={"date-prev-next-btn disabled:opacity-10"}
          data-next={true}
          data-type={"date-prev-next-btn"}
          onClick={props.handleNextMonth}
          disabled={isNextButtonDisabled()}
          style={{
            ...(props.textColor && { color: props.textColor }),
          }}
        >
          {props.nextIcon || <NextIcon color={props.textColor} />}
        </Button>
      </Show>

      <Show when={props.nextButtonAreaJSX} keyed>
        {props.nextButtonAreaJSX}
      </Show>
    </div>
  );
};
