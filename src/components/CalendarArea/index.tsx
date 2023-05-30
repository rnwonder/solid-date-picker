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
  const [prevYear, setPrevYear] = createSignal(0);
  const [nextYear, setNextYear] = createSignal(0);
  const [prevMonth, setPrevMonth] = createSignal(0);
  const [nextMonth, setNextMonth] = createSignal(0);

  createEffect(() => {
    if (props.month() === 0) {
      setPrevYear(props.year() - 1);
      setPrevMonth(11);
    } else if (props.month() === 11) {
      setNextYear(props.year() + 1);
      setNextMonth(0);
    } else {
      setPrevYear(props.year());
      setNextYear(props.year());
      setPrevMonth(props.month() - 1);
      setNextMonth(props.month() + 1);
    }
  });
  return (
    <div class={"flex breakTwoCalendar:flex-col w-full"}>
      <div
        class={clsx({
          "px-4": !props.twoMonthsDisplay,
          "aboveBreakTwoCalendar:pl-4 breakTwoCalendar:px-4":
            props.twoMonthsDisplay,
        })}
      >
        {props.weekDaysJSX || (
          <WeekDays
            weekDaysNameColor={props.weekDaysNameColor}
            weekDaysType={props.weekDaysType}
            locale={props.locale}
          />
        )}
        <CalendarDays {...props} />
      </div>

      <Show when={props.twoMonthsDisplay} keyed>
        <div class="divider aboveBreakTwoCalendar:divider-horizontal aboveBreakTwoCalendar:mx-2 aboveBreakTwoCalendar:w-fit "></div>
        <div
          class={clsx({
            "aboveBreakTwoCalendar:pr-4 breakTwoCalendar:px-4":
              props.twoMonthsDisplay,
          })}
        >
          {props.weekDaysJSX || (
            <WeekDays
              weekDaysNameColor={props.weekDaysNameColor}
              weekDaysType={props.weekDaysType}
              locale={props.locale}
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
