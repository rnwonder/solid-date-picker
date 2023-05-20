import { Show } from "solid-js";
import { DatePickerMonthAndYearSelector } from "../DatePickerMonthAndYearSelector";
import { Button } from "../Button";
import { PrevIcon } from "../PrevIcon";
import { NextIcon } from "../NextIcon";
export const DatePickerTop = (props) => {
    return (<div class={`
        date-picker-top 
        flex 
        justify-between 
        items-center 
        mb-[0.3125rem] 
        px-2
      `} data-type={"date-picker-top"}>
      <Show when={props.prevButtonAreaJSX} keyed>
        {props.prevButtonAreaJSX}
      </Show>

      <Show when={!props.removeNavButtons} keyed>
        <Button class={"date-prev-next-btn"} data-prev={true} data-type={"date-prev-next-btn"} onClick={props.handlePrevMonth}>
          {props.prevIcon || <PrevIcon />}
        </Button>
      </Show>

      <Show when={props.monthYearSelectorJSX} keyed>
        {props.monthYearSelectorJSX}
      </Show>

      <Show when={!props.monthYearSelectorJSX} keyed>
        {props.monthYearSelectorJSX}
        <DatePickerMonthAndYearSelector {...props}/>
      </Show>

      <Show when={!props.removeNavButtons} keyed>
        <Button class={"date-prev-next-btn"} data-next={true} data-type={"date-prev-next-btn"} onClick={props.handleNextMonth}>
          {props.nextIcon || <NextIcon />}
        </Button>
      </Show>

      <Show when={props.nextButtonAreaJSX} keyed>
        {props.nextButtonAreaJSX}
      </Show>
    </div>);
};
