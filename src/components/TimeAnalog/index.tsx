import {
  Accessor,
  Setter,
  createEffect,
  createSignal,
  For,
  Show,
  onMount,
} from "solid-js";
import clsx from "clsx";
import {
  ITimeMeridiem,
  ITimePickerFormat,
  ITimeView,
} from "../../interface/general";
import { TimeNumber } from "../TimeNumber";
import {
  convert12HourTo24Hour,
  convert24HourTo12Hour,
  getAmPm,
  getCurrentTime,
} from "../../utils/time";

export interface ITimePickerAnalog {
  close: () => void;
  timeAnalogNumberClass?: string;
  timeAnalogWrapperClass?: string;
  timeAnalogClockHandClass?: string;
  timeAnalogClockCenterDotClass?: string;
  view: Accessor<ITimeView>;
  setView: Setter<ITimeView>;
  allowedView: ITimeView[];
  value: ITimePickerFormat;
  handleNext: () => void;
  onChange?: (time: ITimePickerFormat) => void;
  meridiem: Accessor<ITimeMeridiem>;
  setMeridiem: Setter<ITimeMeridiem>;
  setCurrentTimeOnOpen?: boolean;
  handleTimeChange: (time: ITimePickerFormat, meridiem: ITimeMeridiem) => void;
}
export const TimeAnalog = (props: ITimePickerAnalog) => {
  const [selectedHour, setSelectedHour] = createSignal<number>();
  const [selectedMinute, setSelectedMinute] = createSignal<number>();
  const [selectedSeconds, setSelectedSeconds] = createSignal<number>();

  const [mouseDown, setMouseDown] = createSignal(false);
  const [isPicking, setIsPicking] = createSignal(false);
  const [onTouch, setOnTouch] = createSignal(false);
  const [linePosition, setLinePosition] = createSignal("rotateZ(0deg)");
  const [showHand, setShowHand] = createSignal(false);

  onMount(() => {
    if (props.setCurrentTimeOnOpen) {
      const currentTime = getCurrentTime();

      if (props.allowedView.includes("hour")) {
        if (props.value.hour === undefined) {
          setSelectedHour(currentTime.hour);
          props.setMeridiem(currentTime.meridiem);
        } else {
          props.setMeridiem(getAmPm(props.value.hour));
          setSelectedHour(convert24HourTo12Hour(props.value.hour));
        }
      }

      if (props.allowedView.includes("minute")) {
        if (props.value.minute === undefined) {
          setSelectedMinute(currentTime.minute);
        } else {
          setSelectedMinute(props.value.minute);
        }
      }

      if (props.allowedView.includes("second")) {
        if (props.value.second === undefined) {
          setSelectedSeconds(currentTime.second);
        } else {
          setSelectedSeconds(props.value.second);
        }
      }
    }

    if (props.allowedView.includes("hour")) return;
    if (props.allowedView.includes("minute")) {
      props.setView("minute");
      return;
    }
    if (props.allowedView.includes("second")) {
      props.setView("second");
    }
  });

  createEffect(() => {
    if (!showHand()) return;
    props.onChange?.({
      hour: selectedHour()
        ? convert12HourTo24Hour(selectedHour()!, props.meridiem())
        : undefined,
      minute: selectedMinute(),
      second: selectedSeconds(),
    });

    props.handleTimeChange(
      {
        hour: selectedHour(),
        minute: selectedMinute(),
        second: selectedSeconds(),
      },
      props.meridiem()
    );
  });

  createEffect(() => {
    if (props.view() === "hour") {
      setLinePosition(`rotateZ(${(selectedHour() || 0) * 30}deg)`);
    }
    if (props.view() === "minute") {
      setLinePosition(`rotateZ(${(selectedMinute() || 0) * 6}deg)`);
    }
    if (props.view() === "second") {
      setLinePosition(`rotateZ(${(selectedSeconds() || 0) * 6}deg)`);
    }
  });

  createEffect(() => {
    if (!isPicking()) return;
    if (mouseDown()) return;
    if (onTouch()) {
      setOnTouch(false);
      setIsPicking(false);
      return;
    }
    props.handleNext();
    setIsPicking(false);
  });

  createEffect(() => {
    if (props.view() === "hour" && selectedHour() !== undefined) {
      setShowHand(true);
      return;
    }
    if (props.view() === "minute" && selectedMinute() !== undefined) {
      setShowHand(true);
      return;
    }
    if (props.view() === "second" && selectedSeconds() !== undefined) {
      setShowHand(true);
      return;
    }
    setShowHand(false);
  });

  const handlePointerEnter = (
    e: PointerEvent & { currentTarget: HTMLButtonElement; target: Element },
    type: ITimeView,
    value?: number
  ) => {
    if (value === undefined) return;

    const handleMouseDown = () => {
      if (!mouseDown()) {
        setMouseDown(true);
      }
      if (!isPicking()) {
        setIsPicking(true);
      }
    };

    if (e.pressure > 0 && type === "hour") {
      setSelectedHour(value);
      handleMouseDown();
    }
    if (e.pressure > 0 && type === "minute") {
      setSelectedMinute(value);
      handleMouseDown();
    }
    if (e.pressure > 0 && type === "second") {
      setSelectedSeconds(value);
      handleMouseDown();
    }
  };

  const handleTouchEnd = (
    e: TouchEvent & { currentTarget: HTMLButtonElement; target: Element },
    type: ITimeView,
    value?: number
  ) => {
    if (value === undefined) return;
    handleClick(type, value);
  };

  const handleClick = (type: ITimeView, value?: number) => {
    if (value === undefined) return;
    if (type === "hour") {
      setSelectedHour(value);
    }
    if (type === "minute") {
      setSelectedMinute(value);
    }
    if (type === "second") {
      setSelectedSeconds(value);
    }
    props.handleNext();
  };

  return (
    <div
      class={clsx(
        `
        time-analog-wrapper
        rn-w-[237px] 
        rn-h-[237px] 
        rn-bg-slate-100 
        rn-relative 
        rn-flex 
        rn-justify-center 
        rn-items-center 
        rn-rounded-full
        `,
        props.timeAnalogWrapperClass
      )}
      data-time-analog-wrapper={true}
      aria-label={`Select minutes. Selected time is 11:01AM`}
      role={"listbox"}
      tabindex={0}
      onMouseUp={() => setMouseDown(false)}
    >
      <div
        class={clsx(
          `
          time-analog-center-hand
          rn-w-[2px] 
          rn-bg-primary
          rn-absolute
          rn-left-[calc(50% - 1px)]
          rn-bottom-1/2
          rn-origin-center-bottom
          rn-h-[39%]
          `,
          {
            "rn-hidden": !showHand(),
            "rn-block": showHand(),
          },
          props.timeAnalogClockHandClass
        )}
        style={{ transform: linePosition() }}
        data-time-analog-center-hand={true}
      />
      <div
        class={clsx(
          `
          time-analog-center-dot
          rn-bg-primary
          rn-w-[5px] 
          rn-h-[5px] 
          rn-absolute 
          rn-top-1/2 rn-left-1/2 
          rn-transform rn--translate-x-1/2 rn--translate-y-1/2
          rn-rounded-full
          `,
          props.timeAnalogClockCenterDotClass
        )}
        data-time-analog-center-dot={true}
      />

      <div
        class={clsx(`
          rn-w-[50px]
          rn-h-[50px]
          rn-bg-transparent
          rn-relative
      `)}
      >
        <Show when={props.view() === "hour"} keyed>
          <For each={Array.from(Array(12).keys(), (v) => v + 1)}>
            {(item, index) => {
              return (
                <TimeNumber
                  type={props.view()}
                  selectedValue={selectedHour}
                  onClick={handleClick}
                  onMouseUp={() => setMouseDown(false)}
                  onPointerEnter={handlePointerEnter}
                  onTouchStart={() => setOnTouch(true)}
                  onTouchEnd={handleTouchEnd}
                  onPointerUp={() => setMouseDown(false)}
                  onPointerCancel={() => setMouseDown(false)}
                  index={index}
                  class={props.timeAnalogNumberClass}
                />
              );
            }}
          </For>
        </Show>

        <Show when={props.view() === "minute"} keyed>
          <For each={Array.from(Array(60).keys(), (v) => v + 1)}>
            {(item, index) => {
              return (
                <TimeNumber
                  type={props.view()}
                  selectedValue={selectedMinute}
                  onClick={handleClick}
                  onMouseUp={() => setMouseDown(false)}
                  onPointerEnter={handlePointerEnter}
                  onTouchStart={() => setOnTouch(true)}
                  onTouchEnd={handleTouchEnd}
                  onPointerUp={() => setMouseDown(false)}
                  onPointerCancel={() => setMouseDown(false)}
                  index={index}
                  class={props.timeAnalogNumberClass}
                />
              );
            }}
          </For>
        </Show>

        <Show when={props.view() === "second"} keyed>
          <For each={Array.from(Array(60).keys(), (v) => v + 1)}>
            {(item, index) => {
              return (
                <TimeNumber
                  type={props.view()}
                  selectedValue={selectedSeconds}
                  onClick={handleClick}
                  onMouseUp={() => setMouseDown(false)}
                  onPointerEnter={handlePointerEnter}
                  onTouchStart={() => setOnTouch(true)}
                  onTouchEnd={handleTouchEnd}
                  onPointerUp={() => setMouseDown(false)}
                  onPointerCancel={() => setMouseDown(false)}
                  index={index}
                  class={props.timeAnalogNumberClass}
                />
              );
            }}
          </For>
        </Show>
      </div>
    </div>
  );
};
