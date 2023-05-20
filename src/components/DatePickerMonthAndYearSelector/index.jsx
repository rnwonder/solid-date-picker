import { createEffect, createSignal, Show } from "solid-js";
import { MonthSelector } from "../MonthSelector";
import { YearSelector } from "../YearSelector";
export const DatePickerMonthAndYearSelector = (props) => {
    const [monthSelectorRef, setMonthSelectorRef] = createSignal();
    const [yearSelectorRef, setYearSelectorRef] = createSignal();
    createEffect(() => {
        if (!monthSelectorRef())
            return;
        props.setAllowedComponents?.((prev) => {
            return [...prev, monthSelectorRef()];
        });
    });
    createEffect(() => {
        if (!yearSelectorRef())
            return;
        props.setAllowedComponents?.((prev) => {
            return [...prev, yearSelectorRef()];
        });
    });
    return (<div class={`flex ${props.monthYearSelectorFlexDirection === "column" ? "flex-col" : ""}`}>
      <Show when={props.render()} keyed>
        <Show when={props.monthSelectorJSX} keyed>
          {props.monthSelectorJSX}
        </Show>
        <Show when={!props.monthSelectorJSX} keyed>
          <MonthSelector ref={setMonthSelectorRef} month={props.month} setMonth={props.setMonth} type={props.monthSelectorFormat || "short"} zIndex={props.zIndex} locale={props.locale}/>
        </Show>
        <Show when={props.yearSelectorJSX} keyed>
          {props.yearSelectorJSX}
        </Show>
        <Show when={!props.yearSelectorJSX} keyed>
          <YearSelector ref={setYearSelectorRef} year={props.year} setYear={props.setYear} zIndex={props.zIndex} yearRange={props.yearRange}/>
        </Show>
      </Show>
    </div>);
};
