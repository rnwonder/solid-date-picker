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
  DateArray,
  ClassNames,
} from "../../interface/general";
import { PrevIcon } from "../PrevIcon";
import { NextIcon } from "../NextIcon";
import {
  getRefactoredNextDate,
  getRefactoredPrevDate,
  isNotPartOfEnabledDays,
} from "../../utils";
import clsx from "clsx";

export interface DatePickerTopProps extends IColors, ClassNames {
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
  setAllowedComponents?: Setter<HTMLElement[]>;
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
  enabledDays?: DateArray[];

  twoMonthsDisplay?: boolean;
}

export const DatePickerTop: Component<DatePickerTopProps> = (props) => {
  const isPrevButtonDisabled = () => {
    if (!props.minDate && !props.enabledDays) return false;
    if (props.minDate) {
      if (props.year() < props.minDate.year) return true;
      if (props.year() === props.minDate.year) {
        if (props.month() - 1 < props.minDate.month) return true;
      }
    }
    const { month, year } = getRefactoredPrevDate(props.year(), props.month());
    return isNotPartOfEnabledDays({
      enabledDays: props.enabledDays,
      year,
      month,
      prev: true,
    });
  };

  const isNextButtonDisabled = () => {
    if (!props.maxDate && !props.enabledDays) return false;
    if (props.maxDate) {
      if (props.year() > props.maxDate.year) return true;
      if (props.year() === props.maxDate.year) {
        if (props.month() + 1 > props.maxDate.month) return true;
      }
    }
    const { year, month } = getRefactoredNextDate(props.year(), props.month());
    return isNotPartOfEnabledDays({
      enabledDays: props.enabledDays,
      year,
      month,
      next: true,
    });
  };
  return (
    <div
      class={clsx(
        `
        date-picker-top 
        rn-flex 
        rn-justify-between 
        rn-items-center 
        rn-mb-[0.3125rem] 
        rn-px-2
      `,
        props.datePickerTopAreaClass
      )}
      data-type={"date-picker-top"}
    >
      <Show when={props.prevButtonAreaJSX} keyed>
        {props.prevButtonAreaJSX}
      </Show>

      <Show when={!props.removeNavButtons} keyed>
        <Button
          class={clsx(
            "date-prev-next-btn date-prev-btn disabled:rn-opacity-10 rn-text-black dark:rn-text-slate-200",
            props.prevMonthBtnClass,
            props.prevNextMonthBtnClass
          )}
          data-prev={true}
          data-type={"date-prev-next-btn"}
          aria-label={"Move backward to switch to the previous month"}
          data-scope={"button"}
          data-part={"root"}
          disabled={isPrevButtonDisabled()}
          onClick={props.handlePrevMonth}
          style={{
            ...(props.arrowsColor && { color: props.arrowsColor }),
          }}
        >
          {props.prevIcon || <PrevIcon color={props.arrowsColor} />}
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
          class={clsx(
            "date-prev-next-btn date-next-btn disabled:rn-opacity-10 rn-text-black dark:rn-text-slate-200",
            props.nextMonthBtnClass,
            props.prevNextMonthBtnClass
          )}
          data-next={true}
          aria-label={"Move forward to switch to the next month."}
          data-scope={"button"}
          data-part={"root"}
          data-type={"date-prev-next-btn"}
          onClick={props.handleNextMonth}
          disabled={isNextButtonDisabled()}
          style={{
            ...(props.arrowsColor && { color: props.arrowsColor }),
          }}
        >
          {props.nextIcon || <NextIcon color={props.arrowsColor} />}
        </Button>
      </Show>

      <Show when={props.nextButtonAreaJSX} keyed>
        {props.nextButtonAreaJSX}
      </Show>
    </div>
  );
};
