import {
  Component,
  JSXElement,
  Show,
  createEffect,
  createSignal,
  Accessor,
} from "solid-js";
import { Button } from "../Button";
import clsx from "clsx";
import {
  ApplyDateRange,
  DateArray,
  HoverRangeValue,
  IColors,
} from "../../interface/general";

interface DatePickerDayProps extends IColors, Partial<ApplyDateRange> {
  header?: boolean;
  children?: JSXElement;
  onClick?: () => void;
  disabled?: boolean;

  disabledDays?: DateArray[];
  shouldHighlightWeekends?: boolean;
  onDisabledDayError?: () => void;
  onHover?: () => void;
  onHoverEnd?: () => void;
  hoverRangeValue?: Accessor<HoverRangeValue>;
}

export const DatePickerDay: Component<DatePickerDayProps> = (props) => {
  const [ref, setref] = createSignal<HTMLDivElement>();

  createEffect(() => {
    if (!ref()) return;
    if (props.secondaryColor) {
      document.documentElement.style.setProperty(
        "--before-bg",
        props.secondaryColor
      );
    }

    if (props.secondaryTextColor) {
      document.documentElement.style.setProperty(
        "--before-color",
        props.secondaryTextColor
      );
    }
  });

  return (
    <div
      ref={setref}
      class={`
        ${
          props.header
            ? `
            date-picker-weekday-name
            text-[0.75rem]
            block`
            : `
              date-picker-day-number-area
              flex
              justify-center
              items-center
              text-[0.9375rem]
            `
        }
        font-bold
        mb-[0.13rem]
        text-[#909090]
        tracking-[0.02em]
        text-center
        uppercase
        relative
        ${props.hidden && "pointer-events-none"}
        ${
          props.dayRangeBetween && !props.hidden
            ? `bg-[#56A4D3] bg-opacity-50`
            : ""
        }
        before:content-[""]
        before:absolute
        before:top-0
        before:h-full
       
        before:bg-opacity-50 
        ${
          (props.dayRangeStart && props.dayRangeStartEnd && !props.hidden) ||
          (props.dayRangeEnd && props.dayRangeStartEnd && !props.hidden)
            ? ""
            : "before:hidden"
        }
        ${
          props.dayRangeStart &&
          props.dayRangeStartEnd &&
          "before:left-[15%] before:w-[86%] before:rounded-l-full before:block"
        }
        ${
          props.dayRangeEnd &&
          props.dayRangeStartEnd &&
          "before:right-[15%] before:w-[85%] before:rounded-r-full before:block"
        }
        
        `}
      data-day-number-area={!props.header}
      data-day-number-area-range-start-or-end={
        props.dayRangeStart || props.dayRangeEnd
      }
      data-day-number-area-range-between={props.dayRangeBetween}
      data-day-number-area-range-start={props.dayRangeStart}
      data-day-number-area-range-end={props.dayRangeEnd}
      data-day-number-area-current-day={props.daysCurrent}
      data-day-number-area-not-current-month={props.daysNotCurrentMonth}
      data-day-number-area-range-tip={
        (props.dayRangeStart && props.dayRangeStartEnd) ||
        (props.dayRangeEnd && props.dayRangeStartEnd)
      }
      data-day-number-area-range-tip-start={
        props.dayRangeStart && props.dayRangeStartEnd
      }
      data-day-number-area-range-tip-end={
        props.dayRangeEnd && props.dayRangeStartEnd
      }
      data-day-name={props.header}
      style={{
        ...(props.dayRangeBetween
          ? {
              "background-color": props.secondaryColor,
            }
          : {}),
        ...(props.weekDaysNameColor && props.header
          ? {
              color: props.weekDaysNameColor,
            }
          : {}),
      }}
      onMouseEnter={props.onHover}
      onMouseLeave={props.onHoverEnd}
    >
      <Show when={props.header && !props.hidden} keyed>
        {props.children}
      </Show>

      <Show when={!props.header && !props.hidden} keyed>
        <Button
          setHeight
          class={clsx(
            `
          date-picker-day-number
          text-center          
          relative
          transition-none
          ${
            props.dayRangeStart || props.dayRangeEnd
              ? "text-white day-number-range-start-or-end"
              : props.isMultipleSelected
              ? "text-white day-number-multiple-select"
              : props.dayRangeBetween
              ? "text-primary day-range-between"
              : "text-black"
          }
          h-8
          w-8
          text-[0.9375rem]
          p-0
          z-10
          ${
            props.daysNotCurrentMonth
              ? !props.dayRangeStart && !props.dayRangeEnd
                ? "opacity-50 day-number-not-current-month"
                : "opacity-95"
              : "opacity-100 day-number-current-month"
          }
          ${
            props.dayRangeStart || props.dayRangeEnd || props.isMultipleSelected
              ? "bg-primary hover:bg-primary"
              : ""
          }
          ${props.dayRangeBetween && "hover:bg-transparent"}
          ${
            props.dayRangeStart || props.dayRangeEnd
              ? ""
              : props.daysCurrent
              ? "day-number-current-day border border-dashed border-black hover:border hover:border-dashed hover:border-black"
              : ""
          }
          ${props.shouldHighlightWeekends && props.isWeekend && "text-red-500"}
          disabled:text-black
          disabled:opacity-30
          rounded-full
          cursor-pointer
          `,
            props.customDayClass
          )}
          data-day-number={true}
          data-day-number-range-start-or-end={
            props.dayRangeStart || props.dayRangeEnd
          }
          data-day-number-range-between={props.dayRangeBetween}
          data-day-number-range-start={props.dayRangeStart}
          data-day-number-range-end={props.dayRangeEnd}
          data-day-number-current-day={props.daysCurrent}
          data-day-number-not-current-month={props.daysNotCurrentMonth}
          data-day-number-is-weekend={props.isWeekend}
          data-day-number-is-sunday={props.isSunday}
          data-day-number-is-saturday={props.isSaturday}
          data-day-number-is-multiple-selected={props.isMultipleSelected}
          onClick={props.onClick}
          disabled={props.disabled}
          style={{
            ...((props.dayRangeStart ||
              props.dayRangeEnd ||
              props.isMultipleSelected) &&
            (props.primaryColor || props.primaryTextColor)
              ? {
                  "background-color": props.primaryColor,
                  color: props.primaryTextColor,
                }
              : {}),
            ...(props.dayRangeBetween
              ? { color: props.secondaryTextColor }
              : {}),
            ...((props.weekEndDayTextColor || props.weekEndDayBgColor) &&
            !props.dayRangeStart &&
            !props.dayRangeEnd &&
            !props.isMultipleSelected &&
            props.isWeekend
              ? {
                  color: props.weekEndDayTextColor,
                  "background-color": props.weekEndDayBgColor,
                }
              : {}),
            ...(props.textColor &&
            !props.dayRangeStart &&
            !props.dayRangeEnd &&
            !props.isMultipleSelected
              ? props.shouldHighlightWeekends && props.isWeekend
                ? {}
                : { color: props.textColor }
              : {}),
          }}
        >
          {props.children}
        </Button>

        <Show keyed when={props.disabled}>
          <div
            onClick={props.onDisabledDayError}
            class="absolute w-full h-full top-0 left-0 rounded-full"
          />
        </Show>
      </Show>
    </div>
  );
};
