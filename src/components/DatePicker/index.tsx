import {
  Accessor,
  createEffect,
  createSignal,
  JSXElement,
  onMount,
  Setter,
  Show,
} from "solid-js";
import {
  RnClassName,
  CustomDaysClassName,
  DateArray,
  DateObjectUnits,
  HoverRangeValue,
  RnColor,
  PickerAloneValue,
  DatePickerOnChange,
  DatePickerType,
  MonthDaysObject,
  IMonthSelectorType,
  IMonthYearSelectorFlexDirection,
  PickerRenderJSX,
  YearRange,
  Locale,
  LocaleOptions,
  MakeOptionalRequired,
  WeekDaysType,
  SelectorType,
} from "../../interface/general";
import {
  compareObjectDate,
  convertDateObjectToDate,
  convertDateToDateObject,
  currentYear,
  getDatePickerRefactoredMonth,
  getDatePickerRefactoredYear,
  getOnChangeSingleData,
  handleDateRange,
} from "../../utils";
import { CalendarArea } from "../CalendarArea";
import { DatePickerTop } from "../DatePickerTop";
import { cn } from "../../utils";
import SelectorTwo from "../SelectorTwo";
import { SelectorProps } from "../Selector";

export interface DatePickerProps
  extends RnColor,
    Omit<RnClassName, "inputClass" | "inputWrapperClass"> {
  type: DatePickerType;
  close?: () => void;
  handleOnChange: (data: DatePickerOnChange) => void;
  onDisabledDayError?: () => void;

  minDate?: MakeOptionalRequired<DateObjectUnits>;
  maxDate?: MakeOptionalRequired<DateObjectUnits>;

  onChange?: (data: DatePickerOnChange) => void;
  onYearChange?: (year: number) => void;
  onMonthChange?: (month: number) => void;
  onValueChange?: (value: DatePickerOnChange) => void;

  ref?: any;
  value?: PickerAloneValue;
  setAllowedComponents?: Setter<HTMLElement[]>;

  month?: Accessor<number>;
  setMonth?: Setter<number>;
  year?: Accessor<number>;
  setYear?: Setter<number>;

  monthSelectorJSX?: PickerRenderJSX;
  yearSelectorJSX?: PickerRenderJSX;
  calendarAboveTopAreaJSX?: PickerRenderJSX;
  calendarTopAreaJSX?: PickerRenderJSX;
  calendarBottomAreaJSX?: PickerRenderJSX;
  calendarLeftAreaJSX?: PickerRenderJSX;
  calendarRightAreaJSX?: PickerRenderJSX;
  calendarJSX?: PickerRenderJSX;
  afterNextButtonAreaJSX?: PickerRenderJSX;
  beforePrevButtonAreaJSX?: PickerRenderJSX;
  weekDaysJSX?: PickerRenderJSX;

  monthSelectorFormat?: IMonthSelectorType;
  monthYearSelectorFlexDirection?: IMonthYearSelectorFlexDirection;
  yearRange?: YearRange;
  locale?: Locale;
  localeOptions?: LocaleOptions;
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

  yearSelectorType?: SelectorType;
  monthSelectorType?: SelectorType;

  showSelectorTwo?: Accessor<boolean>;
  setShowSelectorTwo?: Setter<boolean>;
  setSelectorTwoProps?: Setter<SelectorProps>;
  selectorTwoProps?: Accessor<SelectorProps>;
}

export const DatePicker = (props: DatePickerProps) => {
  const [month, setMonth] = createSignal(new Date().getMonth());
  const [year, setYear] = createSignal(currentYear);
  const [startDay, setStartDay] = createSignal<DateObjectUnits | undefined>();
  const [endDay, setEndDay] = createSignal<DateObjectUnits | undefined>(
    undefined,
  );
  const [multipleObject, setMultipleObject] = createSignal<DateObjectUnits[]>(
    [],
  );
  const [render, setRender] = createSignal(true);
  const [mounted, setMounted] = createSignal(false);
  const [hoverRangeValue, setHoverRangeValue] = createSignal<HoverRangeValue>(
    {},
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
              convertDateToDateObject(new Date(date)),
            )
          : undefined;

      if (!multipleDateObject) return;
      setMultipleObject(multipleDateObject);
      const lastDate = multipleDateObject.at(-1);
      if (lastDate?.month) {
        setMonth(lastDate.month);
        props.setMonth?.(lastDate.month);
      }
      if (lastDate?.year) {
        setYear(lastDate.year);
        props.setYear?.(lastDate.year);
      }
    }
  });

  const onChange = (data: DatePickerOnChange) => {
    props.handleOnChange(data);
    props?.onChange?.(data);
    props.onValueChange?.(data);
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

  const handleDayClick = (
    day: MonthDaysObject,
    month: Accessor<number>,
    year: Accessor<number>,
    nextMonth: boolean = false,
  ) => {
    if (!mounted()) {
      setMounted(true);
    }
    const initialMonth = Number(month());
    const newMonth = getDatePickerRefactoredMonth(initialMonth, day.month);
    const newYear = getDatePickerRefactoredYear(year(), month(), day.month);

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
      if (end && start) {
        setHoverRangeValue({});
      }
      onChange({
        startDate: start,
        endDate: end,
        type: "range",
      });
    }

    if (props.type === "single") {
      const selectedDay = new Date(
        newYear,
        getDatePickerRefactoredMonth(initialMonth, day.month),
        day.value,
      );
      const selectedDate = convertDateToDateObject(selectedDay);
      setStartDay(selectedDate);
      onChange({
        selectedDate,
        type: "single",
      });
    }

    if (props.type === "multiple") {
      const selectedDay: DateObjectUnits = {
        year: newYear,
        month: getDatePickerRefactoredMonth(initialMonth, day.month),
        day: day.value,
      };
      const findDate = multipleObject().find((date) =>
        compareObjectDate(date, selectedDay),
      );
      if (findDate) {
        const newMultipleObject = multipleObject().filter(
          (date) => !compareObjectDate(date, findDate),
        );
        setMultipleObject(newMultipleObject);
        onChange({
          multipleDates: newMultipleObject,
          type: "multiple",
        });
        return;
      }
      setMultipleObject((prev) => [...prev, selectedDay]);
      onChange({
        multipleDates: multipleObject(),
        type: "multiple",
      });
    }

    if (!nextMonth) {
      setMonth(newMonth);
      props.setMonth?.(newMonth);

      setYear(newYear);
      props.setYear?.(newYear);
    }
    setRender(false);
    props.shouldCloseOnSelect && props.close?.();
  };

  const setMonthAndYear = (newMonth: number, newYear?: number) => {
    setMonth(newMonth);
    props.setMonth?.(newMonth);
    props.onMonthChange?.(newMonth);

    if (newYear) {
      setYear(newYear);
      props.setYear?.(newYear);
      props.onYearChange?.(newYear);
    }

    const changeData = getOnChangeSingleData({
      startDay: startDay(),
      month: newMonth,
      year: newYear,
      type: props.type,
    });
    changeData ? props.onValueChange?.(changeData) : null;
  };

  const handleNextMonth = () => {
    if ((props.month?.() || month()) === 11) {
      const newMonth = 0;
      const newYear = year() + 1;
      setMonthAndYear(newMonth, newYear);
      return;
    }
    const newMonth = (props.month?.() || month()) + 1;
    setMonthAndYear(newMonth);
    setRender(false);
  };

  const handlePrevMonth = () => {
    if ((props.month?.() || month()) === 0) {
      const newMonth = 11;
      const newYear = year() - 1;
      setMonthAndYear(newMonth, newYear);
      return;
    }
    const newMonth = (props.month?.() || month()) - 1;
    setMonthAndYear(newMonth);
    setRender(false);
  };

  const onHoverDay = (
    day: MonthDaysObject,
    month: Accessor<number>,
    year: Accessor<number>,
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
  const renderCustomJSX = (renderJSX?: PickerRenderJSX) => {
    if (!renderJSX) return undefined;
    if (typeof renderJSX === "function") {
      const [ref, setRef] = createSignal<HTMLDivElement>();

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
  const calendarAboveTopAreaJSX = renderCustomJSX(
    props.calendarAboveTopAreaJSX,
  );

  return (
    <div
      class={cn(
        `date-picker-wrapper 
          rn-relative 
          rn-rounded-md 
          rn-border-t 
          rn-border-solid
          rn-border-gray-300
          rn-bg-white
          rn-pb-[0.5rem] 
          rn-pt-[0.625rem] 
          dark:rn-border-gray-700
          dark:rn-bg-dreamless-sleep
          `,
        {
          "rn-w-max": !calendarLeftAreaJSX && !calendarRightAreaJSX,
          "rn-shadow-lg": !props.showSelectorTwo?.(),
        },
        props.datePickerWrapperClass,
      )}
      data-type={"date-picker-wrapper"}
      ref={props.ref}
      style={{
        ...(props.backgroundColor && {
          "background-color": props.backgroundColor,
        }),
      }}
      data-scope={"date-picker"}
      data-part={"content"}
      role={"application"}
      aria-label={"calendar"}
      aria-roledescription={"date-picker"}
    >
      <Show when={props.showSelectorTwo?.()}>
        <SelectorTwo
          {...props.selectorTwoProps?.()}
          setShowSelectorTwo={props.setShowSelectorTwo}
          setSelectorTwoProps={props.setSelectorTwoProps}
        />
      </Show>

      <Show when={!props.hideTopArea} keyed>
        {calendarAboveTopAreaJSX}
        {calendarTopAreaJSX || (
          <DatePickerTop
            {...{ ...props, onChange: undefined }}
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
            onChange={props.onValueChange}
            startDay={startDay()}
            setStartDay={setStartDay}
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
            setShowSelectorTwo={props.setShowSelectorTwo}
            setSelectorTwoProps={props.setSelectorTwoProps}
            showSelectorTwo={props.showSelectorTwo}
          />
        )}
      </Show>

      <div
        class={cn(
          "date-picker-body rn-flex rn-justify-center",
          props.datePickerBodyAreaClass,
        )}
      >
        <Show when={calendarLeftAreaJSX && !props.showSelectorTwo?.()} keyed>
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
              showSelectorTwo={props.showSelectorTwo}
            />
          )}
        </Show>

        <Show when={calendarRightAreaJSX && !props.showSelectorTwo?.()} keyed>
          {calendarRightAreaJSX}
        </Show>
      </div>
      <Show when={calendarBottomAreaJSX && !props.showSelectorTwo?.()} keyed>
        {calendarBottomAreaJSX}
      </Show>
    </div>
  );
};
