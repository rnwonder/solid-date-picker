import { createSignal, Show } from "solid-js";
import { convertDateObjectToDate } from "../DatePickerDay/config";
import { DatePicker } from "../DatePicker";
import { Popover } from "../Popover";
export const DatePickerGroup = (props) => {
    const [isShown, setIsShown] = createSignal(false);
    const [reference, setReference] = createSignal();
    const [allowedComponents, setAllowedComponents] = createSignal([]);
    const handleOnChange = (data) => {
        if (data.type === "single") {
            const dateTime = convertDateObjectToDate(data?.selectedDate || {});
            props.setValue?.({
                value: {
                    selected: dateTime?.toISOString() || "",
                    selectedDateObject: data?.selectedDate || {},
                },
                label: new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                }).format(dateTime),
            });
        }
        if (data.type === "range") {
            const startDateTime = data.startDate
                ? convertDateObjectToDate(data.startDate)
                : undefined;
            const endDateTime = data.endDate
                ? convertDateObjectToDate(data.endDate)
                : undefined;
            let label = "";
            const startOptions = {
                month: "short",
                day: "numeric",
                year: undefined,
            };
            const endOptions = {
                month: "short",
                day: "numeric",
                year: "numeric",
            };
            let startDateFormatted = "";
            let endDateFormatted = "";
            if (startDateTime && endDateTime) {
                if (startDateTime.getFullYear() === endDateTime.getFullYear()) {
                    startOptions.year = undefined;
                }
                else {
                    startOptions.year = "numeric";
                }
                startDateFormatted = new Intl.DateTimeFormat("en-US", startOptions).format(startDateTime);
                endDateFormatted = new Intl.DateTimeFormat("en-US", endOptions).format(endDateTime);
            }
            if (startDateTime && !endDateTime) {
                startDateFormatted = new Intl.DateTimeFormat("en-US", startOptions).format(startDateTime);
            }
            if (!startDateTime && endDateTime) {
                endDateFormatted = new Intl.DateTimeFormat("en-US", endOptions).format(endDateTime);
            }
            label = `${startDateFormatted} - ${endDateFormatted}`;
            props.setValue?.({
                value: {
                    start: startDateTime?.toISOString() || "",
                    startDateObject: data?.startDate || {},
                    end: endDateTime?.toISOString() || "",
                    endDateObject: data?.endDate || {},
                },
                label,
            });
        }
    };
    const handleChildrenClick = () => {
        setIsShown(true);
    };
    const renderCustomJSX = (renderJSX) => {
        if (!renderJSX)
            return undefined;
        if (typeof renderJSX === "function") {
            const content = renderJSX({
                value: props.value,
                showDate: handleChildrenClick,
            });
            return <>{content}</>;
        }
        return <>{renderJSX}</>;
    };
    const inputJSX = renderCustomJSX(props.renderInput);
    return (<Popover isShown={isShown()} setIsShown={setIsShown} onClose={() => {
            setAllowedComponents([]);
            props.onClose?.();
        }} onOpen={() => {
            props.onOpen?.();
        }} content={({ close }) => (<DatePicker {...props} type={props.type || "single"} value={props.value?.().value} handleOnChange={handleOnChange} onChange={props.onChange} maxDate={props.maxDate} minDate={props.minDate} setAllowedComponents={setAllowedComponents} close={close}/>)} onClickOutside={(e, setShown) => {
            if (reference().contains(e?.target)) {
                return;
            }
            if (allowedComponents()
                .concat(props.componentsToAllowOutsideClick || [])
                ?.some((component) => component?.contains?.(e?.target))) {
                return;
            }
            setShown?.(false);
        }} positionX={props.calendarPositionX} positionY={props.calendarPositionY} zIndex={props.zIndex} handleChildrenClick={inputJSX ? () => { } : undefined}>
      <div class={"date-picker-input-area"} data-date-picker-input-area={true} ref={setReference}>
        <Show when={inputJSX} keyed>
          {inputJSX}
        </Show>

        <Show when={!inputJSX} keyed>
          <input class={`w-full date-picker-input px-1`} readonly type={"text"} placeholder={props.placeholder} value={props.value?.().label || ""} data-date-picker-input={true}/>
        </Show>
      </div>
    </Popover>);
};
