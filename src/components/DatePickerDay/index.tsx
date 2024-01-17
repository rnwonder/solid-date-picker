import {
  Component,
  JSXElement,
  Show,
  createEffect,
  createSignal,
  Accessor,
  JSX,
} from "solid-js";
import { Button } from "../Button";
import clsx from "clsx";
import {
  ApplyDateRange,
  ClassNames,
  DateArray,
  HoverRangeValue,
  IColors,
} from "../../interface/general";

interface DatePickerDayProps
  extends IColors,
    Partial<ApplyDateRange>,
    ClassNames {
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
        props.secondaryColor
      );
    }

    if (props.secondaryTextColor) {
      document.documentElement.style.setProperty(
        "--date-picker-before-color",
        props.secondaryTextColor
      );
    }
  });

  return (
    <div
      ref={setref}
      class={clsx(
        `
        ${
          props.header
            ? `
            date-picker-weekday-name
            rn-text-[0.75rem]
            rn-block`
            : `
              date-picker-day-number-area
              rn-flex
              rn-justify-center
              rn-items-center
              rn-text-[0.9375rem]
            `
        }
        rn-font-bold
        
        rn-text-[#909090]
        rn-tracking-[0.02em]
        rn-text-center
        rn-uppercase
        rn-relative
        dark:rn-text-slate-300
        ${props.hidden && "rn-pointer-events-none day-number-area-outside-days"}
        ${
          props.dayRangeBetween && !props.hidden
            ? `rn-bg-[#56A4D3] rn-bg-opacity-50`
            : ""
        }
        before:rn-content-[""]
        before:rn-absolute
        before:rn-top-0
        before:rn-h-full
        
        before:rn-bg-opacity-50 
        ${
          (props.dayRangeStart && props.dayRangeStartEnd && !props.hidden) ||
          (props.dayRangeEnd && props.dayRangeStartEnd && !props.hidden)
            ? ""
            : "before:rn-hidden"
        }
        ${
          props.dayRangeStart &&
          props.dayRangeStartEnd &&
          "before:rn-left-[15%] before:rn-w-[86%] before:rn-rounded-l-full before:rn-block"
        }
        ${
          props.dayRangeEnd &&
          props.dayRangeStartEnd &&
          "before:rn-right-[15%] before:rn-w-[85%] before:rn-rounded-r-full before:rn-block"
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
        }
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
          class={clsx(
            `
          date-picker-day-number
          rn-text-center          
          rn-relative
          rn-transition-none
          ${
            props.dayRangeStart || props.dayRangeEnd
              ? "rn-text-white dark:rn-text-white day-number-range-start-or-end"
              : props.isMultipleSelected
              ? "rn-text-white dark:rn-text-white day-number-multiple-select"
              : props.dayRangeBetween
              ? "rn-text-primary day-range-between"
              : "rn-text-black"
          }
          rn-h-8
          rn-w-8
          rn-text-[0.9375rem]
          rn-p-0
          rn-z-10
          
          ${
            props.daysNotCurrentMonth
              ? !props.dayRangeStart && !props.dayRangeEnd
                ? "rn-opacity-50 day-number-not-current-month"
                : "rn-opacity-95"
              : "rn-opacity-100 day-number-current-month"
          }
          ${
            isSelected()
              ? "rn-bg-primary hover:rn-bg-primary dark:hover:rn-bg-primary dark:rn-bg-primary"
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
          disabled:rn-text-black
          disabled:rn-opacity-30
          rn-rounded-full
          rn-cursor-pointer
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
            }
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
            class="rn-absolute rn-w-full rn-h-full rn-top-0 rn-left-0 rn-rounded-full"
          />
        </Show>
      </Show>
    </div>
  );
};
