import { Component } from "solid-js";
import { CalendarDays, CalendarDaysProps } from "../CalendarDays";
import { WeekDays } from "../WeekDays";

interface CalendarAreaProps extends CalendarDaysProps {
  locale?: Intl.LocalesArgument;
}
export const CalendarArea: Component<CalendarAreaProps> = (props) => {
  // TODO: add transition for calendar days
  return (
    <div>
      <WeekDays locale={props.locale} />
      <CalendarDays
        month={props.month}
        year={props.year}
        handleDayClick={props.handleDayClick}
        startDay={props.startDay}
        endDay={props.endDay}
        maxDate={props.maxDate}
        minDate={props.minDate}
      />
    </div>
  );
};
