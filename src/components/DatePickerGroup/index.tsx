/** @jsxImportSource solid-js */

import {
  Accessor,
  createEffect,
  createSignal,
  onCleanup,
  Setter,
} from "solid-js";
import { TextInputGroup, TextInputGroupProps } from "../TextInputGroup";
import {
  IDatePickerInputDataValue,
  IDatePickerOnChange,
  IDatePickerType,
} from "../../interface/date";
import { upgradedSmartDropDown } from "../../../../../package/src/utils";
import { convertDateObjectToDate } from "../DatePickerDay/config";
import { CustomPortal } from "../CustomPortal";
import { DatePicker, DatePickerProps } from "../DatePicker";

interface DatePickerInputSJProps
  extends Omit<TextInputGroupProps, "value" | "setValue" | "type">,
    Omit<DatePickerProps, "type" | "value"> {
  type?: IDatePickerType;
  value: Accessor<IDatePickerInputDataValue>;
  setValue?: Setter<IDatePickerInputDataValue>;
  onChange?: (data: IDatePickerOnChange) => void;
  componentsToAllowOutsideClick?: Array<any>;
}

export const DatePickerGroup = (props: DatePickerInputSJProps) => {
  const [isShown, setIsShown] = createSignal(false);
  const [reference, setReference] = createSignal<any>();
  const [top, setTop] = createSignal<string | undefined>();
  const [left, setLeft] = createSignal<string | undefined>();
  const [datePickerRef, setDatePickerRef] = createSignal<any>();
  const [inputRef, setInputRef] = createSignal<any>();

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
  return (
    <>
      <div ref={setReference}>
        <TextInputGroup
          {...props}
          placeholder="Select Date"
          value={props.value?.().label || ""}
          iconClass="ph-calendar-blank"
          ref={setInputRef}
          readOnly
          isDashboard
          onClick={() => {
            console.log("clicked");
            setIsShown(true);
          }}
        />
      </div>

      <CustomPortal
        hideDefaultStyle
        setIsShown={setIsShown}
        reference={reference}
        isShown={isShown()}
        style={{
          ...(top && { top: top() }),
          ...(left && { left: left() }),
          "max-width": "20rem",
          "background-color": "red",
        }}
        onClickOutside={(e) => {
          if (reference().contains(e.target)) return;
          if (
            props.componentsToAllowOutsideClick?.some((component) =>
              component.contains(e.target)
            )
          )
            return;

          setIsShown(false);
        }}
      >
        <DatePicker
          {...props}
          type={props.type || "single"}
          value={props.value?.().value}
          ref={setDatePickerRef}
          onChange={props.onChange || handleOnChange}
          maxDate={props.maxDate}
          minDate={props.minDate}
        />
      </CustomPortal>
    </>
  );
};
