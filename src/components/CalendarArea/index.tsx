import {
  Component,
  createEffect,
  createSignal,
  JSXElement,
  Show,
} from "solid-js";
import { CalendarDays, CalendarDaysProps } from "../CalendarDays";
import { WeekDays } from "../WeekDays";
import { Locale, WeekDaysType } from "../../interface/general";
import clsx from "clsx";

interface CalendarAreaProps extends CalendarDaysProps {
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
      class={clsx("flex breakTwoCalendar:flex-col", props.calendarWrapperClass)}
    >
      <div
        class={clsx(
          {
            "px-4": !props.twoMonthsDisplay,
            "aboveBreakTwoCalendar:pl-4 breakTwoCalendar:px-4":
              props.twoMonthsDisplay,
          },
          props.calendarOneAreaClass
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
        <CalendarDays {...props} />
      </div>

      <Show when={props.twoMonthsDisplay} keyed>
        <div
          class={clsx(
            "divider aboveBreakTwoCalendar:divider-horizontal aboveBreakTwoCalendar:mx-2 aboveBreakTwoCalendar:w-fit ",
            props.calendarDividerClass
          )}
        ></div>
        <div
          class={clsx(
            {
              "aboveBreakTwoCalendar:pr-4 breakTwoCalendar:px-4":
                props.twoMonthsDisplay,
            },
            props.calendarTwoAreaClass
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
