import { CalendarDays } from "../CalendarDays";
import { WeekDays } from "../WeekDays";
export const CalendarArea = (props) => {
    // TODO: add transition for calendar days
    return (<div>
      <WeekDays locale={props.locale}/>
      <CalendarDays month={props.month} year={props.year} handleDayClick={props.handleDayClick} startDay={props.startDay} endDay={props.endDay} maxDate={props.maxDate} minDate={props.minDate}/>
    </div>);
};
