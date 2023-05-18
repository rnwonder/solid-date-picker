/** @jsxImportSource solid-js */

import {
  Accessor,
  createEffect,
  createSignal,
  JSX,
  onCleanup,
  Setter,
  Show,
} from "solid-js";
import { TextInputGroup, TextInputGroupProps } from "../TextInputGroup";
import {
  IDatePickerInputDataValue,
  IDatePickerOnChange,
  IDatePickerType,
} from "../../interface/date";
import { upgradedSmartDropDown } from "../../../../../package/src/utils";
import { convertDateObjectToDate } from "../DatePickerDay/config";
import { DatePicker, DatePickerProps } from "../DatePicker";
import { IPopOverPositionX, IPopOverPositionY, Popover } from "../Popover";

interface IRenderInputJSXProps {
  value: Accessor<IDatePickerInputDataValue>;
}

type IRenderInput =
  | JSX.Element
  | ((props: IRenderInputJSXProps) => JSX.Element);

interface DatePickerInputSJProps
  extends Omit<TextInputGroupProps, "value" | "setValue" | "type">,
    Omit<DatePickerProps, "type" | "value" | "setAllowedComponents"> {
  type?: IDatePickerType;
  value: Accessor<IDatePickerInputDataValue>;
  setValue?: Setter<IDatePickerInputDataValue>;
  onChange?: (data: IDatePickerOnChange) => void;
  componentsToAllowOutsideClick?: Array<any>;
  renderInput?: IRenderInput;
  calendarPositionX?: IPopOverPositionX;
  calendarPositionY?: IPopOverPositionY;
}

export const DatePickerGroup = (props: DatePickerInputSJProps) => {
  const [isShown, setIsShown] = createSignal(false);
  const [reference, setReference] = createSignal<any>();
  const [top, setTop] = createSignal<string | undefined>();
  const [left, setLeft] = createSignal<string | undefined>();
  const [datePickerRef, setDatePickerRef] = createSignal<any>();
  const [inputRef, setInputRef] = createSignal<any>();
  const [allowedComponents, setAllowedComponents] = createSignal<any[]>([]);

  createEffect(() => {
    if (!reference?.()) return;
    if (isShown()) {
      const { left, top } = upgradedSmartDropDown({
        dropDownRef: datePickerRef,
        inputRef,
      });
      setLeft(left);
      setTop(top);
    }
  });

  createEffect(() => {
    const onWindowScroll = () => {
      if (!reference?.()) return;
      if (isShown()) {
        const { left, top } = upgradedSmartDropDown({
          dropDownRef: datePickerRef,
          inputRef,
        });
        setLeft(left);
        setTop(top);
      }
    };

    document.addEventListener("scroll", onWindowScroll);

    onCleanup(() => {
      document.removeEventListener("scroll", onWindowScroll);
    });
  });

  const handleOnChange = (data: IDatePickerOnChange) => {
    if (data.type === "single") {
      const dateTime = convertDateObjectToDate(data?.selectedDate || {});
      props.setValue?.({
        value: {
          selected: dateTime?.toISOString() || "",
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
      const startOptions: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        year: undefined,
      };
      const endOptions: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        year: "numeric",
      };
      let startDateFormatted = "";
      let endDateFormatted = "";

      if (startDateTime && endDateTime) {
        if (startDateTime.getFullYear() === endDateTime.getFullYear()) {
          startOptions.year = undefined;
        } else {
          startOptions.year = "numeric";
        }
        startDateFormatted = new Intl.DateTimeFormat(
          "en-US",
          startOptions
        ).format(startDateTime);
        endDateFormatted = new Intl.DateTimeFormat("en-US", endOptions).format(
          endDateTime
        );
      }

      if (startDateTime && !endDateTime) {
        startDateFormatted = new Intl.DateTimeFormat(
          "en-US",
          startOptions
        ).format(startDateTime);
      }

      if (!startDateTime && endDateTime) {
        endDateFormatted = new Intl.DateTimeFormat("en-US", endOptions).format(
          endDateTime
        );
      }
      label = `${startDateFormatted} - ${endDateFormatted}`;
      props.setValue?.({
        value: {
          start: startDateTime?.toISOString() || "",
          end: endDateTime?.toISOString() || "",
        },
        label,
      });
    }
  };

  createEffect(() => {
    // console.log("allowedComponents", allowedComponents());
  });

  const renderCustomJSX = (renderJSX?: IRenderInput) => {
    if (!renderJSX) return undefined;
    if (typeof renderJSX === "function") {
      const content = renderJSX({
        value: props.value,
      });
      return <>{content}</>;
    }
    return <>{renderJSX}</>;
  };

  const inputJSX = renderCustomJSX(props.renderInput);
  return (
    <>
      <Popover
        onClose={() => {
          setAllowedComponents([]);
        }}
        content={({ close }) => (
          <DatePicker
            {...props}
            type={props.type || "single"}
            value={props.value?.().value}
            ref={setDatePickerRef}
            onChange={props.onChange || handleOnChange}
            maxDate={props.maxDate}
            minDate={props.minDate}
            setAllowedComponents={setAllowedComponents}
          />
        )}
        onClickOutside={(e, setter) => {
          if (reference().contains(e?.target)) {
            return;
          }
          if (
            allowedComponents()
              .concat(props.componentsToAllowOutsideClick || [])
              ?.some((component) => component?.contains?.(e?.target))
          ) {
            return;
          }
          setter?.(false);
        }}
        positionX={props.calendarPositionX}
        positionY={props.calendarPositionY}
      >
        <div
          class={"date-picker-input-area"}
          data-date-picker-input-area={true}
          ref={setReference}
        >
          <Show when={inputJSX} keyed>
            {inputJSX}
          </Show>

          <Show when={!inputJSX} keyed>
            <TextInputGroup
              {...props}
              type={"text"}
              placeholder="Select Date"
              value={props.value?.().label || ""}
              iconClass="ph-calendar-blank"
              ref={setInputRef}
              readOnly
              isDashboard
            />
          </Show>
        </div>
      </Popover>
    </>
  );
};
