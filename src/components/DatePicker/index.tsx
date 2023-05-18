/** @jsxImportSource solid-js */

import {
  Accessor,
  createEffect,
  createSignal,
  For,
  JSX,
  onMount,
  Setter,
  Show,
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
import Flex from "../Flex";

export interface IRenderJSXProps {
  month: Accessor<number>;
  setMonth: Setter<number>;
  year: Accessor<number>;
  setYear: Setter<number>;
  handleNextMonth: () => void;
  handlePrevMonth: () => void;
  setRefToAllowOutsideClick: Setter<HTMLElement | undefined>;
}

type IRenderJSX = JSX.Element | ((props: IRenderJSXProps) => JSX.Element);

export interface DatePickerProps {
  type: IDatePickerType;
  minDate?: DateObjectUnits;
  maxDate?: DateObjectUnits;
  onChange?: (data: IDatePickerOnChange) => void;
  ref?: any;
  value?: IDatePickerInputValueTypes;
  setAllowedComponents: Setter<HTMLElement[]>;

  month?: Accessor<number>;
  setMonth?: Setter<number>;
  year?: Accessor<number>;
  setYear?: Setter<number>;

  monthSelectorJSX?: IRenderJSX;
  yearSelectorJSX?: IRenderJSX;
  calendarTopAreaJSX?: IRenderJSX;
  calendarBottomAreaJSX?: IRenderJSX;
  calendarLeftAreaJSX?: IRenderJSX;
  calendarRightAreaJSX?: IRenderJSX;
  calendarJSX?: IRenderJSX;

  hideTopArea?: boolean;

  zIndex?: number;
}

const StyledDatePicker = styled("div")`
  background-color: var(--dashboard-background-color);
  width: fit-content;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  padding: 0.625rem 0 0.5rem 0;
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
      if (!props.year?.()) props.setYear?.(currentYear);
      return;
    }

    if (props.value.selected) {
      const selectedDate = new Date(props.value.selected);
      setMonth(selectedDate.getMonth());
      props.setMonth?.(selectedDate.getMonth());
      setYear(selectedDate.getFullYear());
      props.setYear?.(selectedDate.getFullYear());
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
      props.setYear?.(startDate.getFullYear());

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
    let newYear = props.year?.() || year();

    if (day.month === "prev") {
      newMonth =
        props.month?.() || month() === 0
          ? 11
          : (props.month?.() || month()) - 1;
      newYear =
        props.month?.() || month() === 0
          ? (props.year?.() || year()) - 1
          : props.year?.() || year();
    }

    if (day.month === "next") {
      newMonth =
        props.month?.() || month() === 11
          ? 0
          : (props.month?.() || month()) + 1;
      newYear =
        props.month?.() || month() === 11
          ? (props.year?.() || year()) + 1
          : props.year?.() || year();
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
    props.setYear?.(newYear);

    setRender(false);
  };

  const handleNextMonth = () => {
    if ((props.month?.() || month()) === 11) {
      const newMonth = 0;
      const newYear = year() + 1;
      setMonth(newMonth);
      props.setMonth?.(newMonth);

      setYear(newYear);
      props.setYear?.(newYear);
      return;
    }
    const newMonth = (props.month?.() || month()) + 1;
    setMonth(newMonth);
    props.setMonth?.(newMonth);
    setRender(false);
  };

  const handlePrevMonth = () => {
    if ((props.month?.() || month()) === 0) {
      const newMonth = 11;
      const newYear = year() - 1;

      setMonth(newMonth);
      props.setMonth?.(newMonth);

      setYear(newYear);
      props.setYear?.(newYear);
      return;
    }
    const newMonth = (props.month?.() || month()) - 1;
    setMonth(newMonth);
    props.setMonth?.(newMonth);
    setRender(false);
  };

  // Render Custom JSX
  const renderCustomJSX = (renderJSX?: IRenderJSX) => {
    if (!renderJSX) return undefined;
    if (typeof renderJSX === "function") {
      const [ref, setRef] = createSignal<HTMLElement>();

      createEffect(() => {
        if (!ref()) return;
        console.log("crazy hooks will it work?", ref());
        props.setAllowedComponents?.((prev) => {
          return [...prev, ref()!];
        });
      });

      const content = renderJSX({
        month,
        setMonth,
        handleNextMonth,
        handlePrevMonth,
        year,
        setYear,
        setRefToAllowOutsideClick: setRef,
      });
      return <div data-type="custom-jsx">{content}</div>;
    }
    return <div data-type="custom-jsx">{renderJSX}</div>;
  };

  const monthSelectorJSX = renderCustomJSX(props.monthSelectorJSX);
  const yearSelectorJSX = renderCustomJSX(props.yearSelectorJSX);
  const calendarTopAreaJSX = renderCustomJSX(props.calendarTopAreaJSX);
  const calendarLeftAreaJSX = renderCustomJSX(props.calendarLeftAreaJSX);
  const calendarRightAreaJSX = renderCustomJSX(props.calendarRightAreaJSX);
  const calendarBottomAreaJSX = renderCustomJSX(props.calendarBottomAreaJSX);
  const calendarJSX = renderCustomJSX(props.calendarJSX);

  return (
    <StyledDatePicker ref={props.ref}>
      <Show when={!props.hideTopArea} keyed>
        {calendarTopAreaJSX || (
          <DatePickerTop
            setYear={props.setYear || setYear}
            setMonth={props.setMonth || setMonth}
            month={props.month || month}
            year={props.year || year}
            render={render}
            handleNextMonth={handleNextMonth}
            handlePrevMonth={handlePrevMonth}
            monthSelectorJSX={monthSelectorJSX}
            yearSelectorJSX={yearSelectorJSX}
            zIndex={props.zIndex}
          />
        )}
      </Show>

      <Flex>
        <Show when={calendarLeftAreaJSX} keyed>
          {calendarLeftAreaJSX}
        </Show>
        <div>

          <DatePickerWeek>
            <For each={dayNames}>
              {(day) => <DatePickerDay header>{day}</DatePickerDay>}
            </For>
          </DatePickerWeek>


          <DatePickerWeek>
            <For
              each={getMonthDaysArray(
                props.month?.() || month(),
                props.year?.() || year()
              )}
            >
              {(day) => (
                <DatePickerDay
                  {...applyDateRangeStyles({
                    year: props.year || year,
                    day,
                    month: props.month || month,
                    startDay: startDay(),
                    endDay: endDay(),
                  })}
                  onClick={() => handleDayClick(day)}
                  disabled={isMinMaxDate({
                    day,
                    month: props.month || month,
                    year: props.year || year,
                    minDate: props.minDate,
                    maxDate: props.maxDate,
                  })}
                >
                  {day.value}
                </DatePickerDay>
              )}
            </For>
          </DatePickerWeek>
        </div>
        <Show when={calendarRightAreaJSX} keyed>
          {calendarRightAreaJSX}
        </Show>
      </Flex>
      <Show when={calendarBottomAreaJSX} keyed>
        {calendarBottomAreaJSX}
      </Show>
    </StyledDatePicker>
  );
};
