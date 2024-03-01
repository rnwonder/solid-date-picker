import {
  Component,
  createEffect,
  createSignal,
  JSXElement,
  Show,
} from "solid-js";
import { CalendarDays, CalendarDaysProps } from "../CalendarDays";
import { WeekDays } from "../WeekDays";
import { RnClassName, Locale, WeekDaysType } from "../../interface/general";
import {cn} from "../../utils/class";

export interface CalendarAreaProps
  extends CalendarDaysProps,
    Pick<
      RnClassName,
      | "calendarWrapperClass"
      | "calendarDividerClass"
      | "calendarOneAreaClass"
      | "calendarTwoAreaClass"
    > {
  locale?: Locale;
  weekDaysJSX?: JSXElement;
  weekDaysType?: WeekDaysType;
}
export const CalendarArea: Component<CalendarAreaProps> = (props) => {
  const [nextYear, setNextYear] = createSignal(0);
  const [nextMonth, setNextMonth] = createSignal(0);

  createEffect(() => {
    if (props.month() === 0) {
    } else if (props.month() === 11) {
      setNextYear(props.year() + 1);
      setNextMonth(0);
    } else {
      setNextYear(props.year());
      setNextMonth(props.month() + 1);
    }
  });
  return (
    <div
      class={cn(
        "date-picker-calendar-wrapper rn-flex rn-min-w-max breakTwoCalendar:rn-flex-col",
        props.calendarWrapperClass,
      )}
    >
      <div
        class={cn(
          "date-picker-calendar-area-one",
          {
            "rn-px-4": !props.twoMonthsDisplay,
            "breakTwoCalendar:rn-px-4 aboveBreakTwoCalendar:rn-pl-4":
              props.twoMonthsDisplay,
          },
          props.calendarOneAreaClass,
        )}
        data-scope={"date-picker"}
        data-part={"grid"}
        role={"grid"}
        data-columns={7}
        aria-roledescription={"calendar month"}
        tabindex={-1}
      >
        {props.weekDaysJSX || (
          <WeekDays
            {...props}
            weekDaysNameColor={props.weekDaysNameColor}
            weekDaysType={props.weekDaysType}
            locale={props.locale}
            weekStartDay={props.weekStartDay}
          />
        )}
        <CalendarDays {...props} />
      </div>

      <Show when={props.twoMonthsDisplay} keyed>
        <div
          class={cn(
            "date-picker-calendar-area-divider rn-divider aboveBreakTwoCalendar:rn-divider-horizontal aboveBreakTwoCalendar:rn-mx-2 aboveBreakTwoCalendar:rn-w-fit ",
            props.calendarDividerClass,
          )}
        ></div>
        <div
          class={cn(
            "date-picker-calendar-area-two",
            {
              "breakTwoCalendar:rn-px-4 aboveBreakTwoCalendar:rn-pr-4":
                props.twoMonthsDisplay,
            },
            props.calendarTwoAreaClass,
          )}
        >
          {props.weekDaysJSX || (
            <WeekDays
              {...props}
              weekDaysNameColor={props.weekDaysNameColor}
              weekDaysType={props.weekDaysType}
              locale={props.locale}
              weekStartDay={props.weekStartDay}
            />
          )}
          <CalendarDays
            {...props}
            month={nextMonth}
            year={nextYear}
            nextMonth
          />
        </div>
      </Show>
    </div>
  );
};
