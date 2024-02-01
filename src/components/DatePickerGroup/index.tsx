import { Accessor, createSignal, JSX, Setter, Show } from "solid-js";
import {
  ClassNames,
  IDatePickerOnChange,
  IDatePickerType,
  IRenderInput,
  PickerValue,
} from "../../interface/general";
import { convertDateObjectToDate, labelFormat } from "../../utils";
import { DatePicker, DatePickerProps } from "../DatePicker";
import { IPopOverPositionX, IPopOverPositionY, Popover } from "../Popover";
import { createButtonAnimation } from "../../hooks/createButtonAnimation";
import { cn } from "../../utils";

export interface DatePickerInputSJProps
  extends Omit<
      DatePickerProps,
      "type" | "value" | "setAllowedComponents" | "close" | "handleOnChange"
    >,
    Pick<ClassNames, "inputWrapperClass" | "inputClass"> {
  type?: IDatePickerType;
  value: Accessor<PickerValue>;
  setValue?: Setter<PickerValue>;
  onChange?: (data: IDatePickerOnChange) => void;
  componentsToAllowOutsideClick?: Array<HTMLElement>;
  renderInput?: IRenderInput;
  pickerPositionX?: IPopOverPositionX;
  pickerPositionY?: IPopOverPositionY;
  placeholder?: string;
  onClose?: () => void;
  onOpen?: () => void;

  inputProps?: JSX.InputHTMLAttributes<HTMLInputElement>;
  inputLabel?: Accessor<string>;
  inputWrapperWidth?: JSX.CSSProperties["width"];
  multipleDatesSeparator?: string;
  rangeDatesSeparator?: string;

  alwaysShowRangeStartYear?: boolean;
  formatInputLabel?: string;
  formatInputLabelRangeStart?: string;
  formatInputLabelRangeEnd?: string;
  noButtonAnimation?: boolean;
}

export const DatePickerGroup = (props: DatePickerInputSJProps) => {
  const [isShown, setIsShown] = createSignal(false);
  const [allowedComponents, setAllowedComponents] = createSignal<any[]>([]);

  createButtonAnimation(props.noButtonAnimation);

  const handleOnChange = (data: IDatePickerOnChange) => {
    if (data.type === "single") {
      const dateTime = convertDateObjectToDate(data?.selectedDate || {});
      const label = labelFormat({
        date: dateTime,
        option: props?.localeOptions || {
          month: "short",
          day: "numeric",
          year: "numeric",
        },
        format: props.formatInputLabel,
        locale: props.locale,
      });
      props.setValue?.({
        value: {
          selected: dateTime?.toISOString() || "",
          selectedDateObject: data?.selectedDate || {},
        },
        label,
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
        year: "numeric",
        ...(props?.localeOptions || {}),
        ...(props?.alwaysShowRangeStartYear ? {} : { year: undefined }),
      };
      const endOptions: Intl.DateTimeFormatOptions = props?.localeOptions || {
        month: "short",
        day: "numeric",
        year: "numeric",
      };
      let startDateFormatted = "";
      let endDateFormatted = "";

      if (startDateTime && endDateTime) {
        if (startDateTime.getFullYear() === endDateTime.getFullYear()) {
          if (props.alwaysShowRangeStartYear) return;
          startOptions.year = undefined;
        } else {
          startOptions.year = "numeric";
        }
        startDateFormatted = labelFormat({
          date: startDateTime,
          option: startOptions,
          format: props.formatInputLabelRangeStart,
          locale: props.locale,
        });
        endDateFormatted = labelFormat({
          date: endDateTime,
          option: endOptions,
          format: props.formatInputLabelRangeEnd,
          locale: props.locale,
        });
      }

      if (startDateTime && !endDateTime) {
        startDateFormatted = labelFormat({
          date: startDateTime,
          option: startOptions,
          format: props.formatInputLabelRangeStart,
          locale: props.locale,
        });
      }

      if (!startDateTime && endDateTime) {
        endDateFormatted = labelFormat({
          date: endDateTime,
          option: endOptions,
          format: props.formatInputLabelRangeEnd,
          locale: props.locale,
        });
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
        return labelFormat({
          date: dateTime,
          option: props?.localeOptions || {
            month: "short",
            day: "numeric",
            year: "numeric",
          },
          format: props.formatInputLabel,
          locale: props.locale,
        });
      });

      const newMultipleDateISO = newMultipleDateObject.map(
        (date) => convertDateObjectToDate(date)?.toISOString() || "",
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

  const onKeyDown =
    (e: KeyboardEvent) =>
    (handleNext?: () => void, handlePrev?: () => void) => {
      console.log(e.key);
      if (e.key === "ArrowRight") {
        handleNext?.();
      }
      if (e.key === "ArrowLeft") {
        handlePrev?.();
      }
    };
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
      positionX={props.pickerPositionX}
      positionY={props.pickerPositionY}
      zIndex={props.zIndex}
      handleChildrenClick={inputJSX ? () => {} : undefined}
      width={props.inputWrapperWidth}
      className={cn(props.inputWrapperClass, "date-picker-input-wrapper")}
    >
      <div
        class={"date-picker-input-area"}
        data-date-picker-input-area={true}
        data-scope="date-picker"
        data-part="control"
        onKeyDown={(e) => {
          console.log(e.key);
        }}
      >
        <Show when={inputJSX} keyed>
          {inputJSX}
        </Show>

        <Show when={!inputJSX} keyed>
          <input
            readonly
            type={"text"}
            data-scope="date-picker"
            data-part="input"
            aria-label={"date picker input"}
            placeholder={props.placeholder}
            value={props.inputLabel?.() || props.value?.().label || ""}
            data-type={"date-picker-input"}
            {...{ ...props.inputProps, class: undefined }}
            class={cn(
              `date-picker-input rn-w-full rn-px-1`,
              props.inputProps?.class,
              props.inputClass,
            )}
          />
        </Show>
      </div>
    </Popover>
  );
};
