import { createEffect, createSignal, onMount, Show, } from "solid-js";
import { DatePickerTop } from "../DatePickerTop";
import { convertDateToDateObject, getDatePickerRefactoredMonth, } from "../DatePickerDay/config";
import { currentYear } from "../DatePickerMonthAndYearSelector/config";
import { CalendarArea } from "../CalendarArea";
export const DatePicker = (props) => {
    const [month, setMonth] = createSignal(new Date().getMonth());
    const [year, setYear] = createSignal(currentYear);
    const [startDay, setStartDay] = createSignal(undefined);
    const [endDay, setEndDay] = createSignal(undefined);
    const [render, setRender] = createSignal(true);
    onMount(() => {
        if (!props.value?.selected && !props.value?.start && !props.value?.end) {
            if (!props.month?.())
                props.setMonth?.(new Date().getMonth());
            if (!props.year?.())
                props.setYear?.(currentYear);
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
                day: selectedDate.getDate(),
            });
        }
        if (props.value.start || props.value.end) {
            const startDate = new Date(props.value.start || "0");
            const endDate = props.value.end ? new Date(props.value.end) : undefined;
            setMonth(startDate.getMonth());
            props.setMonth?.(startDate.getMonth());
            setYear(startDate.getFullYear());
            props.setYear?.(startDate.getFullYear());
            setStartDay({
                year: startDate.getFullYear(),
                month: startDate.getMonth(),
                day: startDate.getDate(),
            });
            if (!endDate)
                return;
            setEndDay({
                year: endDate.getFullYear(),
                month: endDate.getMonth(),
                day: endDate.getDate(),
            });
        }
    });
    createEffect(() => {
        if (render())
            return;
        setRender(true);
    });
    createEffect(() => {
        if (props.type !== "single")
            return;
        const agg = { selectedDate: startDay(), type: props.type };
        props.handleOnChange(agg);
        props?.onChange?.(agg);
    });
    createEffect(() => {
        if (props.type !== "range")
            return;
        const agg = {
            startDate: startDay(),
            endDate: endDay(),
            type: props.type,
        };
        props.handleOnChange(agg);
        props?.onChange?.(agg);
    });
    const handleDayClick = (day) => {
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
                    month: getDatePickerRefactoredMonth(props.month?.() || month(), day.month),
                    day: day.value,
                });
            }
            if (startDay() && !endDay()) {
                const startDayDate = new Date(startDay()?.year, startDay()?.month, startDay()?.day);
                const endDayDate = new Date(year(), getDatePickerRefactoredMonth(props.month?.() || month(), day.month), day.value);
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
            const selectedDay = new Date(newYear, getDatePickerRefactoredMonth(props.month?.() || month(), day.month), day.value);
            setStartDay(convertDateToDateObject(selectedDay));
        }
        setMonth(newMonth);
        props.setMonth?.(newMonth);
        setYear(newYear);
        props.setYear?.(newYear);
        setRender(false);
        props.showCloseOnSelect && props.close();
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
    const renderCustomJSX = (renderJSX) => {
        if (!renderJSX)
            return undefined;
        if (typeof renderJSX === "function") {
            const [ref, setRef] = createSignal();
            createEffect(() => {
                if (!ref())
                    return;
                props.setAllowedComponents?.((prev) => {
                    return [...prev, ref()];
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
    return (<div class={`date-picker-wrapper 
          shadow-lg 
          border-t 
          border-gray-300 
          border-solid 
          rounded-md 
          pt-[0.625rem] 
          pb-[0.5rem]
          ${calendarLeftAreaJSX || calendarRightAreaJSX ? "" : "w-max"}
          `} data-date-picker-wrapper={true} ref={props.ref}>
      <Show when={!props.hideTopArea} keyed>
        {calendarTopAreaJSX || (<DatePickerTop setYear={props.setYear || setYear} setMonth={props.setMonth || setMonth} month={props.month || month} year={props.year || year} render={render} handleNextMonth={handleNextMonth} handlePrevMonth={handlePrevMonth} monthSelectorJSX={monthSelectorJSX} yearSelectorJSX={yearSelectorJSX} zIndex={props.zIndex} setAllowedComponents={props.setAllowedComponents} monthSelectorFormat={props.monthSelectorFormat} monthYearSelectorFlexDirection={props.monthYearSelectorFlexDirection} yearRange={props.yearRange} locale={props.locale} nextIcon={props.nextIcon} prevIcon={props.prevIcon} removeNavButtons={props.removeNavButtons} nextButtonAreaJSX={nextButtonAreaJSX} prevButtonAreaJSX={prevButtonAreaJSX}/>)}
      </Show>

      <div class={"flex"}>
        <Show when={calendarLeftAreaJSX} keyed>
          {calendarLeftAreaJSX}
        </Show>

        {calendarJSX || (<CalendarArea locale={props.locale} year={props.year || year} month={props.month || month} endDay={endDay} startDay={startDay} handleDayClick={handleDayClick} maxDate={props.maxDate} minDate={props.minDate}/>)}

        <Show when={calendarRightAreaJSX} keyed>
          {calendarRightAreaJSX}
        </Show>
      </div>
      <Show when={calendarBottomAreaJSX} keyed>
        {calendarBottomAreaJSX}
      </Show>
    </div>);
};
