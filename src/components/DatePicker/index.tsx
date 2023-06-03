import {
  Accessor,
  createEffect,
  createSignal,
  JSXElement,
  onMount,
  Setter,
  Show,
} from "solid-js";
import { DatePickerTop } from "../DatePickerTop";
import {
  compareObjectDate,
  convertDateObjectToDate,
  convertDateToDateObject,
  currentYear,
  getDatePickerRefactoredMonth,
  handleDateRange,
} from "../../utils";
import {
  DateObjectUnits,
  IDatePickerInputValueTypes,
  IDatePickerOnChange,
  IDatePickerType,
  IMonthDaysObject,
  IMonthSelectorType,
  IMonthYearSelectorFlexDirection,
  IRenderJSX,
  IYearRange,
  Locale,
  IColors,
  DateArray,
  MakeOptionalRequired,
  CustomDaysClassName,
  WeekDaysType,
  HoverRangeValue,
  ClassNames,
} from "../../interface/general";
import { CalendarArea } from "../CalendarArea";
import clsx from "clsx";

export interface DatePickerProps extends IColors, ClassNames {
  type: IDatePickerType;
  close: () => void;
  handleOnChange: (data: IDatePickerOnChange) => void;
  onDisabledDayError?: () => void;

  minDate?: MakeOptionalRequired<DateObjectUnits>;
  maxDate?: MakeOptionalRequired<DateObjectUnits>;

  onChange?: (data: IDatePickerOnChange) => void;
  onYearChange?: (year: number) => void;
  onMonthChange?: (month: number) => void;

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
  afterNextButtonAreaJSX?: IRenderJSX;
  beforePrevButtonAreaJSX?: IRenderJSX;
  weekDaysJSX?: IRenderJSX;

  monthSelectorFormat?: IMonthSelectorType;
  monthYearSelectorFlexDirection?: IMonthYearSelectorFlexDirection;
  yearRange?: IYearRange;
  locale?: Locale;
  nextIcon?: JSXElement;
  prevIcon?: JSXElement;

  hideTopArea?: boolean;
  removeNavButtons?: boolean;
  shouldCloseOnSelect?: boolean;
  shouldHighlightWeekends?: boolean;
  hideCalendar?: boolean;
  hideOutSideDays?: boolean;
  twoMonthsDisplay?: boolean;
  showEndOfRange?: boolean;
  disableRangeHoverEffect?: boolean;

  zIndex?: number;
  startingMonth?: number;
  startingYear?: number;
  weekStartDay?: number;

  disabledDays?: DateArray[];
  enabledDays?: DateArray[];
  customDaysClassName?: CustomDaysClassName[];
  weekDaysType?: WeekDaysType;
}

export const DatePicker = (props: DatePickerProps) => {
  const [month, setMonth] = createSignal(new Date().getMonth());
  const [year, setYear] = createSignal(currentYear);
  const [startDay, setStartDay] = createSignal<DateObjectUnits | undefined>();
  const [endDay, setEndDay] = createSignal<DateObjectUnits | undefined>(
    undefined
  );
  const [multipleObject, setMultipleObject] = createSignal<DateObjectUnits[]>(
    []
  );
  const [render, setRender] = createSignal(true);
  const [mounted, setMounted] = createSignal(false);
  const [hoverRangeValue, setHoverRangeValue] = createSignal<HoverRangeValue>(
    {}
  );

  onMount(() => {
    if (
      !props.value?.selected &&
      !props.value?.start &&
      !props.value?.end &&
      !props.value?.selectedDateObject &&
      !props.value?.startDateObject &&
      !props.value?.endDateObject &&
      !props.value?.multiple &&
      !props.value?.multipleDateObject?.length
    ) {
      if (!props.month?.()) props.setMonth?.(new Date().getMonth());
      if (!props.year?.()) props.setYear?.(currentYear);
      startingDate();
      return;
    }
    startingDate();
    setMounted(true);

    if (props.value.selected || props.value.selectedDateObject) {
      const selectedDate = props.value.selected
        ? new Date(props.value.selected)
        : convertDateObjectToDate(props.value.selectedDateObject!);
      setMonth(selectedDate.getMonth());
      props.setMonth?.(selectedDate.getMonth());
      setYear(selectedDate.getFullYear());
      props.setYear?.(selectedDate.getFullYear());
      setStartDay({
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth(),
        day: selectedDate.getDate(),
      });
    }
    if (
      props.value.start ||
      props.value.end ||
      props.value.startDateObject ||
      props.value.endDateObject
    ) {
      const startDate = props.value.start
        ? new Date(props.value.start)
        : props.value.startDateObject?.day
        ? convertDateObjectToDate(props.value.startDateObject)
        : undefined;
      const endDate = props.value.end
        ? new Date(props.value.end)
        : props.value.endDateObject?.day
        ? convertDateObjectToDate(props.value.endDateObject)
        : undefined;

      if (!startDate && !endDate) return;
      if (!startDate && endDate) {
        setMonth(endDate.getMonth());
        props.setMonth?.(endDate.getMonth());

        setYear(endDate.getFullYear());
        props.setYear?.(endDate.getFullYear());

        const startObj = {
          year: endDate.getFullYear(),
          month: endDate.getMonth(),
          day: endDate.getDate(),
        };

        setStartDay(startObj);
        setHoverRangeValue({
          start: startObj,
        });
        return;
      }

      setMonth(startDate!.getMonth());
      props.setMonth?.(startDate!.getMonth());

      setYear(startDate!.getFullYear());
      props.setYear?.(startDate!.getFullYear());

      const startObj = {
        year: startDate!.getFullYear(),
        month: startDate!.getMonth(),
        day: startDate!.getDate(),
      };
      setStartDay(startObj);
      setHoverRangeValue({
        start: startObj,
      });

      if (!endDate) return;
      setEndDay({
        year: endDate.getFullYear(),
        month: endDate.getMonth(),
        day: endDate.getDate(),
      });
      setHoverRangeValue({
        start: undefined,
      });

      if (props.showEndOfRange) {
        setMonth(endDate.getMonth());
        props.setMonth?.(endDate.getMonth());

        setYear(endDate.getFullYear());
        props.setYear?.(endDate.getFullYear());
      }
    }

    if (props.value.multipleDateObject?.length || props.value.multiple) {
      const multipleDateObject = props.value.multipleDateObject?.length
        ? props.value.multipleDateObject
        : props.value.multiple
        ? props.value.multiple.map((date) =>
            convertDateToDateObject(new Date(date))
          )
        : undefined;

      if (!multipleDateObject) return;
      setMultipleObject(multipleDateObject);
      const lastDate = multipleDateObject.at(-1);
      lastDate?.month && setMonth(lastDate.month);
      lastDate?.year && setYear(lastDate.year);
    }
  });

  const onChange = (data: IDatePickerOnChange) => {
    props.handleOnChange(data);
    props?.onChange?.(data);
  };

  const startingDate = () => {
    props.startingMonth && setMonth(props.startingMonth);
    props.startingMonth && props.setMonth?.(props.startingMonth);
    props.startingYear && setYear(props.startingYear);
    props.startingYear && props.setYear?.(props.startingYear);
  };

  createEffect(() => {
    if (render()) return;
    setRender(true);
  });

  createEffect(() => {
    props.onMonthChange?.(month());
  });

  createEffect(() => {
    props.onYearChange?.(year());
  });

  createEffect(() => {
    if (props.type !== "single") return;
    if (!mounted()) return;
    const agg = {
      selectedDate: startDay(),
      type: props.type,
    };
    onChange(agg);
  });

  createEffect(() => {
    if (props.type !== "multiple") return;
    if (!mounted()) return;
    const agg = {
      multipleDates: multipleObject(),
      type: props.type,
    };
    onChange(agg);
  });

  createEffect(() => {
    if (props.type !== "range") return;
    if (!mounted()) return;
    const agg = {
      startDate: startDay(),
      endDate: endDay(),
      type: props.type,
    };
    onChange(agg);
  });

  const handleDayClick = (
    day: IMonthDaysObject,
    month: Accessor<number>,
    year: Accessor<number>,
    nextMonth: boolean = false
  ) => {
    if (!mounted()) {
      setMounted(true);
    }
    const initialMonth = Number(month());
    let newMonth = initialMonth;
    let newYear = Number(year());

    if (day.month === "prev") {
      newMonth = month() === 0 ? 11 : month() - 1;
      newYear = month() === 0 ? year() - 1 : year();
    }

    if (day.month === "next") {
      newMonth = month() === 11 ? 0 : month() + 1;
      newYear = month() === 11 ? year() + 1 : year();
    }

    if (props.type === "range") {
      const { end, start, initial } = handleDateRange({
        day,
        month,
        year,
        endDay: endDay(),
        startDay: startDay(),
        disabledDays: props.disabledDays,
        enabledDays: props.enabledDays,
      });
      setStartDay(start);
      setEndDay(end);
      if (initial && !props.disableRangeHoverEffect) {
        setHoverRangeValue({
          start: start,
          end: undefined,
        });
      }
    }

    if (props.type === "single") {
      const selectedDay = new Date(
        newYear,
        getDatePickerRefactoredMonth(initialMonth, day.month),
        day.value
      );
      setStartDay(convertDateToDateObject(selectedDay));
    }

    if (props.type === "multiple") {
      const selectedDay: DateObjectUnits = {
        year: newYear,
        month: getDatePickerRefactoredMonth(initialMonth, day.month),
        day: day.value,
      };
      const findDate = multipleObject().find((date) =>
        compareObjectDate(date, selectedDay)
      );
      if (findDate) {
        const newMultipleObject = multipleObject().filter(
          (date) => !compareObjectDate(date, findDate)
        );
        setMultipleObject(newMultipleObject);
        return;
      }
      setMultipleObject((prev) => [...prev, selectedDay]);
    }

    if (!nextMonth) {
      setMonth(newMonth);
      props.setMonth?.(newMonth);

      setYear(newYear);
      props.setYear?.(newYear);
    }
    setRender(false);
    props.shouldCloseOnSelect && props.close();
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

  const onHoverDay = (
    day: IMonthDaysObject,
    month: Accessor<number>,
    year: Accessor<number>
  ) => {
    if (props.disableRangeHoverEffect) return;
    if (props.type !== "range") return;
    if (!hoverRangeValue()?.start) return;
    const { end, start } = handleDateRange({
      day,
      month,
      year,
      endDay: hoverRangeValue()?.end,
      startDay: hoverRangeValue()?.start,
      disabledDays: props.disabledDays,
      hover: true,
      enabledDays: props.enabledDays,
    });

    setHoverRangeValue({
      start,
      end,
    });
  };

  const onHoverDayEnd = () => {
    if (props.disableRangeHoverEffect) return;
    if (props.type !== "range") return;
    if (!hoverRangeValue()?.start) return;
    if (startDay() && endDay()) return;
    setHoverRangeValue({
      start: startDay(),
      end: undefined,
    });
  };

  // Render Custom JSX
  const renderCustomJSX = (renderJSX?: IRenderJSX) => {
    if (!renderJSX) return undefined;
    if (typeof renderJSX === "function") {
      const [ref, setRef] = createSignal<HTMLElement>();

      createEffect(() => {
        if (!ref()) return;
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
        handleDayClick,
        multipleDates: multipleObject,
        endDate: endDay,
        selectedDate: startDay,
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
  const nextButtonAreaJSX = renderCustomJSX(props.afterNextButtonAreaJSX);
  const prevButtonAreaJSX = renderCustomJSX(props.beforePrevButtonAreaJSX);
  const weekDaysJSX = renderCustomJSX(props.weekDaysJSX);

  return (
    <div
      class={clsx(
        `date-picker-wrapper 
          rn-shadow-lg 
          rn-border-t 
          rn-border-gray-300 
          rn-bg-white
          rn-border-solid 
          rn-rounded-md 
          rn-pt-[0.625rem] 
          rn-pb-[0.5rem]
          ${calendarLeftAreaJSX || calendarRightAreaJSX ? "" : "rn-w-max"}
          `,
        props.datePickerWrapperClass
      )}
      data-type={"date-picker-wrapper"}
      ref={props.ref}
      style={{
        ...(props.backgroundColor && {
          "background-color": props.backgroundColor,
        }),
      }}
    >
      <Show when={!props.hideTopArea} keyed>
        {calendarTopAreaJSX || (
          <DatePickerTop
            {...props}
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
            setAllowedComponents={props.setAllowedComponents}
            monthSelectorFormat={props.monthSelectorFormat}
            monthYearSelectorFlexDirection={
              props.monthYearSelectorFlexDirection
            }
            yearRange={props.yearRange}
            locale={props.locale}
            nextIcon={props.nextIcon}
            prevIcon={props.prevIcon}
            removeNavButtons={props.removeNavButtons}
            nextButtonAreaJSX={nextButtonAreaJSX}
            prevButtonAreaJSX={prevButtonAreaJSX}
            primaryColor={props.primaryColor}
            primaryTextColor={props.primaryTextColor}
            secondaryColor={props.secondaryColor}
            secondaryTextColor={props.secondaryTextColor}
          />
        )}
      </Show>

      <div class={clsx("rn-flex rn-justify-center date-picker-body", props.datePickerBodyAreaClass)}>
        <Show when={calendarLeftAreaJSX} keyed>
          {calendarLeftAreaJSX}
        </Show>

        <Show when={!props.hideCalendar} keyed>
          {calendarJSX || (
            <CalendarArea
              {...props}
              year={props.year || year}
              month={props.month || month}
              endDay={endDay}
              startDay={startDay}
              handleDayClick={handleDayClick}
              multipleObject={multipleObject}
              weekDaysJSX={weekDaysJSX}
              onHoverDay={onHoverDay}
              hoverRangeValue={hoverRangeValue}
              onHoverDayEnd={onHoverDayEnd}
            />
          )}
        </Show>

        <Show when={calendarRightAreaJSX} keyed>
          {calendarRightAreaJSX}
        </Show>
      </div>
      <Show when={calendarBottomAreaJSX} keyed>
        {calendarBottomAreaJSX}
      </Show>
    </div>
  );
};
