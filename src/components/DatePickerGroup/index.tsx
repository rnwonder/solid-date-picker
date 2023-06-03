import { Accessor, createSignal, JSX, Setter, Show } from "solid-js";
import {
  PickerValue,
  IDatePickerOnChange,
  IDatePickerType,
  IRenderInput,
} from "../../interface/general";
import { DatePicker, DatePickerProps } from "../DatePicker";
import { IPopOverPositionX, IPopOverPositionY, Popover } from "../Popover";
import { convertDateObjectToDate } from "../../utils";
import clsx from "clsx";

export interface DatePickerInputSJProps
  extends Omit<
    DatePickerProps,
    "type" | "value" | "setAllowedComponents" | "close" | "handleOnChange"
  > {
  type?: IDatePickerType;
  value: Accessor<PickerValue>;
  setValue?: Setter<PickerValue>;
  onChange?: (data: IDatePickerOnChange) => void;
  componentsToAllowOutsideClick?: Array<HTMLElement>;
  renderInput?: IRenderInput;
  calendarPositionX?: IPopOverPositionX;
  calendarPositionY?: IPopOverPositionY;
  placeholder?: string;
  onClose?: () => void;
  onOpen?: () => void;

  inputProps?: JSX.InputHTMLAttributes<HTMLInputElement>;
  inputLabel?: Accessor<string>;
  inputWrapperWidth?: JSX.CSSProperties["width"];
  multipleDatesSeparator?: string;
  rangeDatesSeparator?: string;
}

export const DatePickerGroup = (props: DatePickerInputSJProps) => {
  const [isShown, setIsShown] = createSignal(false);
  const [allowedComponents, setAllowedComponents] = createSignal<any[]>([]);

  const handleOnChange = (data: IDatePickerOnChange) => {
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
      label = `${startDateFormatted} ${
        props.rangeDatesSeparator || "-"
      } ${endDateFormatted}`;
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

    if (data.type === "multiple") {
      const savedValue = props.value().value;
      const savedMultipleDateObject = savedValue.multipleDateObject || [];
      const newMultipleDateObject = data.multipleDates || [];

      if (!props.value().label && newMultipleDateObject.length === 0) return;
      if (
        savedMultipleDateObject.toString() ===
          newMultipleDateObject.toString() &&
        props.value().label
      )
        return;

      const inputLabelValue = newMultipleDateObject.map((date) => {
        const dateTime = convertDateObjectToDate(date);
        return new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(dateTime);
      });

      const newMultipleDateISO = newMultipleDateObject.map(
        (date) => convertDateObjectToDate(date)?.toISOString() || ""
      );

      const arrangeDateISO = newMultipleDateISO.sort((a, b) => {
        return a.localeCompare(b);
      });

      const arrangeDateObject = newMultipleDateObject.sort((a, b) => {
        const isoA = convertDateObjectToDate(a)?.toISOString() || "";
        const isoB = convertDateObjectToDate(b)?.toISOString() || "";
        return isoA.localeCompare(isoB);
      });

      props.setValue?.({
        value: {
          multiple: arrangeDateISO,
          multipleDateObject: arrangeDateObject,
        },
        label: inputLabelValue.join(props.multipleDatesSeparator || ", "),
      });
    }
  };

  const handleChildrenClick = () => {
    setIsShown(true);
  };

  const renderCustomJSX = (renderJSX?: IRenderInput) => {
    if (!renderJSX) return undefined;
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
  return (
    <Popover
      isShown={isShown()}
      setIsShown={setIsShown}
      onClose={() => {
        setAllowedComponents([]);
        props.onClose?.();
      }}
      onOpen={() => {
        props.onOpen?.();
      }}
      content={({ close }) => (
        <DatePicker
          {...props}
          type={props.type || "single"}
          value={props.value?.().value}
          handleOnChange={handleOnChange}
          onChange={props.onChange}
          maxDate={props.maxDate}
          minDate={props.minDate}
          setAllowedComponents={setAllowedComponents}
          close={close}
        />
      )}
      onClickOutside={(e, setShown) => {
        if (
          allowedComponents()
            .concat(props.componentsToAllowOutsideClick || [])
            ?.some((component) => component?.contains?.(e?.target))
        ) {
          return;
        }
        setShown?.(false);
      }}
      positionX={props.calendarPositionX}
      positionY={props.calendarPositionY}
      zIndex={props.zIndex}
      handleChildrenClick={inputJSX ? () => {} : undefined}
      width={props.inputWrapperWidth}
      className={props.inputWrapperClass}
    >
      <div class={"date-picker-input-area"} data-date-picker-input-area={true}>
        <Show when={inputJSX} keyed>
          {inputJSX}
        </Show>

        <Show when={!inputJSX} keyed>
          <input
            readonly
            type={"text"}
            placeholder={props.placeholder}
            value={props.inputLabel?.() || props.value?.().label || ""}
            {...{ ...props.inputProps, class: undefined }}
            class={clsx(
              `w-full date-picker-input px-1`,
              props.inputProps?.class, props.inputClass
            )}
            data-type={"date-picker-input"}
          />
        </Show>
      </div>
    </Popover>
  );
};
