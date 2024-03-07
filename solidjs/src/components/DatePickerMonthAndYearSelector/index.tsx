import { Component, createEffect, createSignal, Show } from "solid-js";
import { DatePickerTopProps } from "../DatePickerTop";
import { MonthSelector } from "../MonthSelector";
import { YearSelector } from "../YearSelector";
import { cn } from "../../utils";

interface DatePickerMonthAndYearSelectorProps
  extends Omit<DatePickerTopProps, "handlePrevMonth" | "handleNextMonth"> {}

export const DatePickerMonthAndYearSelector: Component<
  DatePickerMonthAndYearSelectorProps
> = (props) => {
  const [monthSelectorRef, setMonthSelectorRef] =
    createSignal<HTMLDivElement>();
  const [yearSelectorRef, setYearSelectorRef] = createSignal<HTMLDivElement>();

  createEffect(() => {
    if (!monthSelectorRef()) return;
    props.setAllowedComponents?.((prev) => {
      return [...prev, monthSelectorRef()!];
    });
  });

  createEffect(() => {
    if (!yearSelectorRef()) return;
    props.setAllowedComponents?.((prev) => {
      return [...prev, yearSelectorRef()!];
    });
  });

  return (
    <div
      class={cn(
        `date-month-year-selector-area rn-flex rn-items-center rn-justify-center ${
          props.monthYearSelectorFlexDirection === "column" ? "rn-flex-col" : ""
        }`,
        props.datePickerTopMonthYearAreaClass,
      )}
      data-type={"date-month-year-selector-area"}
    >
      <Show when={props.render()} keyed>
        <Show when={props.monthSelectorJSX} keyed>
          {props.monthSelectorJSX}
        </Show>
        <Show when={!props.monthSelectorJSX} keyed>
          <MonthSelector
            {...props}
            ref={setMonthSelectorRef}
            month={props.month}
            setMonth={props.setMonth}
            monthSelectorFormat={props.monthSelectorFormat}
            zIndex={props.zIndex}
            locale={props.locale}
            primaryColor={props.primaryColor}
            primaryTextColor={props.primaryTextColor}
            minDate={props.minDate}
            maxDate={props.maxDate}
            twoMonthsDisplay={props.twoMonthsDisplay}
          />
        </Show>
        <Show when={props.yearSelectorJSX} keyed>
          {props.yearSelectorJSX}
        </Show>
        <Show when={!props.yearSelectorJSX} keyed>
          <YearSelector
            {...props}
            ref={setYearSelectorRef}
            year={props.year}
            setYear={props.setYear}
            zIndex={props.zIndex}
            yearRange={props.yearRange}
            primaryColor={props.primaryColor}
            primaryTextColor={props.primaryTextColor}
            minDate={props.minDate}
            maxDate={props.maxDate}
          />
        </Show>
      </Show>
    </div>
  );
};
