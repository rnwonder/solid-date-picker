import {
  Component,
  JSXElement,
  Show,
  createEffect,
  createSignal,
  Accessor,
} from "solid-js";
import { Button } from "../Button";
import {
  ApplyDateRange,
  DateArray,
  DatePickerDayClassNamesAndColors,
  HoverRangeValue,
} from "../../interface/general";
import {cn} from "../../utils/class";

interface DatePickerDayProps
  extends DatePickerDayClassNamesAndColors,
    Partial<ApplyDateRange> {
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
  wrapperProps?: any;
  headerValue?: string;
}

export const DatePickerDay: Component<DatePickerDayProps> = (props) => {
  const [ref, setref] = createSignal<HTMLDivElement>();
  const [isSelected, setIsSelected] = createSignal(false);
  const [isNotSelected, setIsNotSelected] = createSignal(true);

  createEffect(() => {
    if (props.dayRangeStart || props.dayRangeEnd || props.isMultipleSelected) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }

    if (
      !props.dayRangeStart &&
      !props.dayRangeEnd &&
      !props.isMultipleSelected
    ) {
      setIsNotSelected(true);
    } else {
      setIsNotSelected(false);
    }
  });

  createEffect(() => {
    if (!ref()) return;
    if (props.secondaryColor) {
      document.documentElement.style.setProperty(
        "--date-picker-before-bg",
        props.secondaryColor,
      );
    }

    if (props.secondaryTextColor) {
      document.documentElement.style.setProperty(
        "--date-picker-before-color",
        props.secondaryTextColor,
      );
    }
  });

  return (
    <div
      ref={setref}
      class={cn(
        `
        ${
          props.header
            ? `
            date-picker-weekday-name
            rn-block
            rn-text-[0.75rem]`
            : `
              date-picker-day-number-area
              rn-flex
              rn-items-center
              rn-justify-center
              rn-text-[0.9375rem]
            `
        }
        rn-relative
        
        rn-text-center
        rn-font-bold
        rn-uppercase
        rn-tracking-[0.02em]
        rn-text-[#909090]
        dark:rn-text-slate-300
        ${props.hidden && "day-number-area-outside-days rn-pointer-events-none"}
        ${
          props.dayRangeBetween && !props.hidden
            ? `rn-bg-[#56A4D3] rn-bg-opacity-50`
            : ""
        }
        before:rn-absolute
        before:rn-top-0
        before:rn-h-full
        before:rn-bg-opacity-50
        
        before:rn-content-[""] 
        ${
          (props.dayRangeStart && props.dayRangeStartEnd && !props.hidden) ||
          (props.dayRangeEnd && props.dayRangeStartEnd && !props.hidden)
            ? ""
            : "before:rn-hidden"
        }
        ${
          props.dayRangeStart &&
          props.dayRangeStartEnd &&
          "before:rn-left-[15%] before:rn-block before:rn-w-[86%] before:rn-rounded-l-full"
        }
        ${
          props.dayRangeEnd &&
          props.dayRangeStartEnd &&
          "before:rn-right-[15%] before:rn-block before:rn-w-[85%] before:rn-rounded-r-full"
        }
        ${isSelected() && "date-picker-day-number-area-selected"}
        `,
        props.weekNamesClass,
        props.daysWrapperClass,
        {
          [props.daysActiveRangeStartWrapperClass || ""]: props.dayRangeStart,
          [props.daysActiveRangeEndWrapperClass || ""]: props.dayRangeEnd,
          [props.daysActivePrimaryWrapperClass || ""]: isSelected(),
          [props.daysActiveRangeBetweenWrapperClass || ""]:
            props.dayRangeBetween,
        },
      )}
      aria-selected={isSelected()}
      data-value={props.header ? props.headerValue : props.dateValue}
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
      {...props.wrapperProps}
    >
      <Show when={props.header && !props.hidden} keyed>
        {props.children}
      </Show>

      <Show when={!props.header && !props.hidden} keyed>
        <Button
          setHeight
          // @ts-ignore
          tabindex={isSelected() ? 0 : -1}
          class={cn(
            `
          date-picker-day-number
          rn-relative          
          rn-text-center
          rn-transition-none
          ${
            props.dayRangeStart || props.dayRangeEnd
              ? "day-number-range-start-or-end rn-text-white dark:rn-text-white"
              : props.isMultipleSelected
                ? "day-number-multiple-select rn-text-white dark:rn-text-white"
                : props.dayRangeBetween
                  ? "day-range-between rn-text-primary"
                  : "rn-text-black"
          }
          rn-z-10
          rn-h-8
          rn-w-8
          rn-p-0
          rn-text-[0.9375rem]
          
          ${
            props.daysNotCurrentMonth
              ? !props.dayRangeStart && !props.dayRangeEnd
                ? "day-number-not-current-month rn-opacity-50"
                : "rn-opacity-95"
              : "day-number-current-month rn-opacity-100"
          }
          ${
            isSelected()
              ? "rn-bg-primary hover:rn-bg-primary dark:rn-bg-primary dark:hover:rn-bg-primary"
              : props.daysCurrent
                ? "day-number-current-day rn-border rn-border-dashed rn-border-black hover:rn-border hover:rn-border-dashed hover:rn-border-black"
                : ""
          }
          ${props.dayRangeBetween && "hover:rn-bg-transparent"}
          ${
            props.shouldHighlightWeekends && props.isWeekend && isNotSelected()
              ? "rn-text-red-500 dark:rn-text-red-500"
              : "dark:rn-text-slate-300"
          }
          rn-cursor-pointer
          rn-rounded-full
          disabled:rn-text-black
          disabled:rn-opacity-30
          `,
            props.daysBtnClass,
            props.customDayClass,
            {
              [props.daysActivePrimaryBtnClass || ""]: isSelected(),
              [props.daysActiveRangeBetweenBtnClass || ""]:
                props.dayRangeBetween,
              [props.currentDayBtnClass || ""]: props.daysCurrent,
              [props.weekEndDaysBtnClass || ""]: props.isWeekend,
              [props.sundaysBtnClass || ""]: props.isSunday,
              [props.saturdaysBtnClass || ""]: props.isSaturday,
              [props.daysNotInCurrentMonthBtnClass || ""]:
                props.daysNotCurrentMonth,
              [props.daysActiveRangeStartBtnClass || ""]: props.dayRangeStart,
              [props.daysActiveRangeEndBtnClass || ""]: props.dayRangeEnd,
            },
          )}
          data-day-number={true}
          data-day-number-selected={isSelected()}
          data-day-number-range-end-hover={props.dayRangeEndHover}
          data-day-number-range-end-selected={
            !props.dayRangeEndHover && isSelected()
          }
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
          data-scope={"date-picker"}
          data-highlight-weekend={props.shouldHighlightWeekends}
          data-part={"cell-trigger"}
          //@ts-ignore
          role={"button"}
          aria-label={"Choose " + props.date}
          data-value={props.dateValue}
          data-type={"day"}
          onClick={props.onClick}
          disabled={props.disabled}
          selected={isSelected()}
          style={{
            ...(isSelected() && (props.primaryColor || props.primaryTextColor)
              ? {
                  "background-color": props.primaryColor,
                  color: props.primaryTextColor,
                }
              : {}),
            ...(props.dayRangeBetween
              ? { color: props.secondaryTextColor }
              : {}),
            ...((props.weekEndDayTextColor || props.weekEndDayBgColor) &&
            isNotSelected() &&
            props.isWeekend
              ? {
                  color: props.weekEndDayTextColor,
                  "background-color": props.weekEndDayBgColor,
                }
              : {}),
            ...(props.textColor && isNotSelected()
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
            class="rn-absolute rn-left-0 rn-top-0 rn-h-full rn-w-full rn-rounded-full"
          />
        </Show>
      </Show>
    </div>
  );
};
