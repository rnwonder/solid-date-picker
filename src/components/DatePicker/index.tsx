/** @jsxImportSource solid-js */

import {
  Accessor,
  createEffect,
  createSignal,
  For,
  JSXElement,
  onMount,
  Setter,
} from "solid-js";
import { styled } from "solid-styled-components";
import { DatePickerTop } from "../DatePickerTop";
import {
  applyDateRangeStyles,
  convertDateToDateObject,
  getDatePickerRefactoredMonth,
  getMonthDaysArray,
  isMinMaxDate,
} from "../DatePickerDay/config";
import { DatePickerDay } from "../DatePickerDay";
import {
  DateObjectUnits,
  IDatePickerInputValueTypes,
  IDatePickerOnChange,
  IDatePickerType,
  IMonthDaysObject,
} from "../../interface/date";
import { currentYear } from "../DatePickerMonthAndYearSelector/config";
import { dayNames } from "../../store/date";
import { DatePickerWeek } from "../DatePickerWeek";

export interface DatePickerProps {
  type: IDatePickerType;
  minDate?: DateObjectUnits;
  maxDate?: DateObjectUnits;
  onChange?: (data: IDatePickerOnChange) => void;
  ref?: any;
  value?: IDatePickerInputValueTypes;

  month?: Accessor<number>;
  setMonth?: Setter<number>;

  monthSelectorJSX?: JSXElement;
  yearSelectorJSX?: JSXElement;
  calendarTopAreaJSX?: JSXElement;
}

const StyledDatePicker = styled("div")`
  background-color: var(--dashboard-background-color);
  max-width: 20rem;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  padding: 0.625rem 0 1.5rem 0;
`;

export const DatePicker = (props: DatePickerProps) => {
  const [month, setMonth] = createSignal(new Date().getMonth());
  const [year, setYear] = createSignal(currentYear);
  const [startDay, setStartDay] = createSignal<DateObjectUnits | undefined>(
    undefined
  );
  const [endDay, setEndDay] = createSignal<DateObjectUnits | undefined>(
    undefined
  );
  const [render, setRender] = createSignal(true);

  onMount(() => {
    if (!props.value) {
      if (!props.month?.()) props.setMonth?.(new Date().getMonth());
      setYear(currentYear);
      return;
    }

    if (props.value.selected) {
      const selectedDate = new Date(props.value.selected);
      setMonth(selectedDate.getMonth());
      props.setMonth?.(selectedDate.getMonth());
      setYear(selectedDate.getFullYear());
      setStartDay({
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth(),
        day: selectedDate.getDay(),
      });
    }

    if (props.value.start && props.value.end) {
      const startDate = new Date(props.value.start);
      const endDate = new Date(props.value.end);
      setMonth(startDate.getMonth());
      props.setMonth?.(startDate.getMonth());
      setYear(startDate.getFullYear());
      setStartDay({
        year: startDate.getFullYear(),
        month: startDate.getMonth(),
        day: startDate.getDay(),
      });
      setEndDay({
        year: endDate.getFullYear(),
        month: endDate.getMonth(),
        day: endDate.getDay(),
      });
    }
  });

  createEffect(() => {
    if (render()) return;
    setRender(true);
  });

  createEffect(() => {
    if (props.type !== "single") return;
    props?.onChange?.({ selectedDate: startDay(), type: props.type });
  });

  createEffect(() => {
    if (props.type !== "range") return;
    props?.onChange?.({
      startDate: startDay(),
      endDate: endDay(),
      type: props.type,
    });
  });

  const handleDayClick = (day: IMonthDaysObject) => {
    let newMonth = props.month?.() || month();
    let newYear = year();

    if (day.month === "prev") {
      newMonth =
        props.month?.() || month() === 0
          ? 11
          : (props.month?.() || month()) - 1;
      newYear = props.month?.() || month() === 0 ? year() - 1 : year();
    }

    if (day.month === "next") {
      newMonth =
        props.month?.() || month() === 11
          ? 0
          : (props.month?.() || month()) + 1;
      newYear = props.month?.() || month() === 11 ? year() + 1 : year();
    }

    if (props.type === "range") {
      if ((startDay() && endDay()) || (!startDay() && !endDay())) {
        setStartDay(undefined);
        setEndDay(undefined);
        setStartDay({
          year: year(),
          month: getDatePickerRefactoredMonth(
            props.month?.() || month(),
            day.month
          ),
          day: day.value,
        });
      }
      if (startDay() && !endDay()) {
        const startDayDate = new Date(
          startDay()?.year!,
          startDay()?.month!,
          startDay()?.day
        );
        const endDayDate = new Date(
          year(),
          getDatePickerRefactoredMonth(props.month?.() || month(), day.month),
          day.value
        );
        if (startDayDate.getTime() === endDayDate.getTime()) {
          return;
        }
        if (startDayDate.getTime() < endDayDate.getTime()) {
          setEndDay(convertDateToDateObject(endDayDate));
        }
        if (startDayDate.getTime() > endDayDate.getTime()) {
          setStartDay(convertDateToDateObject(endDayDate));
          setEndDay(convertDateToDateObject(startDayDate));
        }
      }
    }

    if (props.type === "single") {
      const selectedDay = new Date(
        newYear,
        getDatePickerRefactoredMonth(props.month?.() || month(), day.month),
        day.value
      );
      setStartDay(convertDateToDateObject(selectedDay));
    }
    setMonth(newMonth);
    props.setMonth?.(newMonth);
    setYear(newYear);
    setRender(false);
  };

  const handleNextMonth = () => {
    if ((props.month?.() || month()) === 11) {
      setMonth(0);
      props.setMonth?.(0);
      setYear(year() + 1);
      return;
    }
    const newMonth = (props.month?.() || month()) + 1;
    setMonth(newMonth);
    props.setMonth?.(newMonth);
    setRender(false);
  };

  const handlePrevMonth = () => {
    if ((props.month?.() || month()) === 0) {
      setMonth(11);
      props.setMonth?.(11);
      setYear(year() - 1);
      return;
    }
    const newMonth = (props.month?.() || month()) - 1;
    setMonth(newMonth);
    props.setMonth?.(newMonth);
    setRender(false);
  };

  return (
    <StyledDatePicker ref={props.ref}>
      {props.calendarTopAreaJSX || (
        <DatePickerTop
          setYear={setYear}
          setMonth={props.setMonth || setMonth}
          month={props.month || month}
          year={year}
          render={render}
          handleNextMonth={handleNextMonth}
          handlePrevMonth={handlePrevMonth}
          monthSelectorJSX={props.monthSelectorJSX}
          yearSelectorJSX={props.yearSelectorJSX}
        />
      )}

      <DatePickerWeek>
        <For each={dayNames}>
          {(day) => <DatePickerDay header>{day}</DatePickerDay>}
        </For>
      </DatePickerWeek>
      <DatePickerWeek>
        <For each={getMonthDaysArray(props.month?.() || month(), year())}>
          {(day) => (
            <DatePickerDay
              {...applyDateRangeStyles({
                year,
                day,
                month: props.month || month,
                startDay: startDay(),
                endDay: endDay(),
              })}
              onClick={() => handleDayClick(day)}
              disabled={isMinMaxDate({
                day,
                month: props.month || month,
                year,
                minDate: props.minDate,
                maxDate: props.maxDate,
              })}
            >
              {day.value}
            </DatePickerDay>
          )}
        </For>
      </DatePickerWeek>
    </StyledDatePicker>
  );
};
