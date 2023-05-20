import { Show } from "solid-js";
import { Button } from "../Button";
export const DatePickerDay = (props) => {
    return (<div class={`
        ${props.header
            ? `
            day-name
            text-[0.75rem]
            block`
            : `
              day-number-area
              flex
              justify-center
              items-center
              text-[0.9375rem]
            `}
        font-bold
        mb-[0.13rem]
        text-[#909090]
        tracking-[0.02em]
        text-center
        uppercase
        relative
        ${props.dayRangeBetween
            ? "bg-[#56A4D3] bg-opacity-50"
            : "bg-transparent"}
        before:content-[""]
        before:absolute
        before:top-0
        before:w-[85%]
        before:h-full
        before:bg-[#56A4D3]
        before:bg-opacity-50 
        ${(props.dayRangeStart && props.dayRangeStartEnd) ||
            (props.dayRangeEnd && props.dayRangeStartEnd)
            ? ""
            : "before:hidden"}
        ${props.dayRangeStart &&
            props.dayRangeStartEnd &&
            "before:left-[15%] before:rounded-l-full before:block"}
        ${props.dayRangeEnd &&
            props.dayRangeStartEnd &&
            "before:right-[15%] before:rounded-r-full before:block"}
        
        `} data-day-number-area={!props.header} data-day-number-area-range-start-or-end={props.dayRangeStart || props.dayRangeEnd} data-day-number-area-range-between={props.dayRangeBetween} data-day-number-area-range-start={props.dayRangeStart} data-day-number-area-range-end={props.dayRangeEnd} data-day-number-area-current-day={props.daysCurrent} data-day-number-area-not-current-month={props.daysNotCurrentMonth} data-day-number-area-range-tip={(props.dayRangeStart && props.dayRangeStartEnd) ||
            (props.dayRangeEnd && props.dayRangeStartEnd)} data-day-number-area-range-tip-start={props.dayRangeStart && props.dayRangeStartEnd} data-day-number-area-range-tip-end={props.dayRangeEnd && props.dayRangeStartEnd} data-day-name={props.header}>
      <Show when={props.header} keyed>
        {props.children}
      </Show>

      <Show when={!props.header} keyed>
        <Button setHeight class={`
          day-number
          
          text-center          
          relative
          ${props.dayRangeStart || props.dayRangeEnd
            ? "text-white day-number-range-start-or-end"
            : props.dayRangeBetween
                ? "text-primary day-range-between"
                : "text-black"}
          h-8
          w-8
          text-[0.9375rem]
          p-0
          ${props.daysNotCurrentMonth
            ? "opacity-50 day-number-not-current-month"
            : "opacity-100 day-number-current-month"}
          ${props.dayRangeStart || props.dayRangeEnd
            ? "bg-primary hover:bg-primary"
            : "bg-transparent"}
          ${props.dayRangeBetween && "hover:bg-transparent"}
          ${props.dayRangeStart || props.dayRangeEnd
            ? "border border-solid border-primary-focus"
            : props.daysCurrent
                ? "day-number-current-day border border-dashed border-black hover:border hover:border-dashed hover:border-black"
                : "border-none"}
          disabled:text-black
          disabled:opacity-30
          rounded-full
          cursor-pointer
          
          `} data-day-number={true} data-day-number-range-start-or-end={props.dayRangeStart || props.dayRangeEnd} data-day-number-range-between={props.dayRangeBetween} data-day-number-range-start={props.dayRangeStart} data-day-number-range-end={props.dayRangeEnd} data-day-number-current-day={props.daysCurrent} data-day-number-not-current-month={props.daysNotCurrentMonth} onClick={props.onClick} disabled={props.disabled}>
          {props.children}
        </Button>
      </Show>
    </div>);
};
