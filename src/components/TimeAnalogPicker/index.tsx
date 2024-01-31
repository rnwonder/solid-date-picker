import { IPopOverPositionX, IPopOverPositionY, Popover } from "../Popover";
import { ITimeAnalogGroupProps, TimeAnalogGroup } from "../TimeAnalogGroup";
import {
  IRenderTimeInput,
  ITimeMeridiem,
  ITimePickerFormat,
  TimeValue,
} from "../../interface/general";
import {Accessor, createSignal, JSX, Setter, Show} from "solid-js";
import { convert12HourTo24Hour } from "../../utils/time";
import {formatHourWithLeadingZero, formatMinuteSecondWithLeadingZero} from "../../utils";
import {createButtonAnimation} from "../../hooks/createButtonAnimation";
import {cn} from "../../utils/class";

interface ITimeAnalogPickerProps
  extends Omit<ITimeAnalogGroupProps, "handleTimeChange" | "value" | "close" | "setIsShown"> {
  value: Accessor<TimeValue>;
  setValue: Setter<TimeValue>;
  onClose?: () => void;
  onOpen?: () => void;

  inputLabel?: Accessor<string>;
  placeholder?: string;
  inputClass?: string;
  inputWrapperClass?: string;

  renderInput?: IRenderTimeInput;
  pickerPositionX?: IPopOverPositionX;
  pickerPositionY?: IPopOverPositionY;

  inputProps?: JSX.InputHTMLAttributes<HTMLInputElement>;
  inputWrapperWidth?: JSX.CSSProperties["width"];
  zIndex?: number;
  noButtonAnimation?: boolean
}
const TimeAnalogPicker = (props: ITimeAnalogPickerProps) => {
  const [isShown, setIsShown] = createSignal(false);

  createButtonAnimation(props.noButtonAnimation)

  const handleTimeChange = (
    time: ITimePickerFormat,
    meridiem: ITimeMeridiem
  ) => {
    let label = "";
    let suffix = "";

    if (!props.allowedView) {
      label = `${formatHourWithLeadingZero(time.hour)}:${formatMinuteSecondWithLeadingZero(time.minute)}`;
      suffix = meridiem;
    }
    if (props.allowedView?.includes("hour")) {
      label = `${formatHourWithLeadingZero(time.hour)}`;
      suffix = meridiem;

      if (
        (props.allowedView?.includes("minute") && time.minute) ||
        (props.allowedView?.includes("second") && time.second)
      ) {
        label += `:`;
      }
    } else {
      if (
        props.allowedView?.includes("minute") &&
        !props.allowedView?.includes("second")
      ) {
        suffix = time.minute === 1 ? "min" : "mins";
      }

      if (
        props.allowedView?.includes("second") &&
        !props.allowedView?.includes("minute")
      ) {
        suffix = time.second === 1 ? "sec" : "secs";
      }

      if (
        props.allowedView?.includes("second") &&
        props.allowedView?.includes("minute")
      ) {
        suffix = time.second === 1 ? "sec" : "secs";
      }
    }

    if (props.allowedView?.includes("minute")) {
      label += `${formatMinuteSecondWithLeadingZero(time.minute)}`;
      if (props.allowedView?.includes("second") && time.second) {
        label += `:`;
      }
    }

    if (props.allowedView?.includes("second")) {
      label += `${formatMinuteSecondWithLeadingZero(time.second)}`;
    }
    label += ` ${suffix}`;

    props.setValue({
      value: {
        ...time,
        hour:
          time.hour !== undefined
            ? convert12HourTo24Hour(time.hour, meridiem)
            : undefined,
      },
      label,
    });
  };

  const handleChildrenClick = () => {
    setIsShown(true);
  };

  const renderCustomJSX = (renderJSX?: IRenderTimeInput) => {
    if (!renderJSX) return undefined;
    if (typeof renderJSX === "function") {
      const content = renderJSX({
        value: props.value,
        showTime: handleChildrenClick,
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
      handleChildrenClick={inputJSX ? () => {} : undefined}
      onClose={() => {
        props.onClose?.();
      }}
      onOpen={() => {
        props.onOpen?.();
      }}
      content={({ close }) => (
        <TimeAnalogGroup
          {...props}
          value={props.value().value}
          handleTimeChange={handleTimeChange}
          close={close}
          setIsShown={setIsShown}
        />
      )}
      positionX={props.pickerPositionX}
      positionY={props.pickerPositionY}
      zIndex={props.zIndex}
      width={props.inputWrapperWidth}
      className={cn(props.inputWrapperClass, "time-picker-input-wrapper")}
    >
      <div
        class={"time-picker-input-area"}
        data-time-picker-input-area={true}
        data-scope="time-picker"
        data-part="control"
      >
        <Show when={inputJSX} keyed>
          {inputJSX}
        </Show>

        <Show when={!inputJSX} keyed>
          <input
            readonly
            data-scope="time-picker"
            data-type={"time-picker-input"}
            data-part="input"
            aria-label={"time picker input"}
            placeholder={props.placeholder}
            type="text"
            value={props.inputLabel?.() || props.value().label}
            {...{ ...props.inputProps, class: undefined }}
            class={cn(
              `rn-w-full time-picker-input rn-px-1`,
              props.inputProps?.class,
              props.inputClass
            )}
          />
        </Show>
      </div>
    </Popover>
  );
};

export default TimeAnalogPicker;
