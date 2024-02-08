import {
  Accessor,
  Setter,
  createEffect,
  createSignal,
  For,
  Show,
  onMount,
} from "solid-js";
import {
  TimeMeridiem,
  ITimePickerFormat,
  TimeView,
  TimeClassName,
} from "../../interface/general";
import { TimeNumber } from "../TimeNumber";
import {
  convert12HourTo24Hour,
  convert24HourTo12Hour,
  getAmPm,
  getCurrentTime,
} from "../../utils/time";
import { cn } from "../../utils";

export interface ITimePickerAnalog extends TimeClassName {
  close: () => void;
  view: Accessor<TimeView>;
  setView: Setter<TimeView>;
  allowedView: TimeView[];
  value: ITimePickerFormat;
  handleNext: () => void;
  onChange?: (time: ITimePickerFormat) => void;
  meridiem: Accessor<TimeMeridiem>;
  setMeridiem: Setter<TimeMeridiem>;
  setCurrentTimeOnOpen?: boolean;
  handleTimeChange: (time: ITimePickerFormat, meridiem: TimeMeridiem) => void;
  selectedHour: Accessor<number | undefined>;
  selectedMinute: Accessor<number | undefined>;
  selectedSeconds: Accessor<number | undefined>;
  setSelectedHour: Setter<number | undefined>;
  setSelectedMinute: Setter<number | undefined>;
  setSelectedSeconds: Setter<number | undefined>;
}
export const TimeAnalog = (props: ITimePickerAnalog) => {
  const [mouseDown, setMouseDown] = createSignal(false);
  const [isPicking, setIsPicking] = createSignal(false);
  const [onTouch, setOnTouch] = createSignal(false);
  const [linePosition, setLinePosition] = createSignal("rotateZ(0deg)");
  const [showHand, setShowHand] = createSignal(false);

  onMount(() => {
    let currentTime: any = {};

    if (props.setCurrentTimeOnOpen) {
      currentTime = getCurrentTime();
    }

    if (props.allowedView.includes("hour")) {
      if (props.value.hour === undefined) {
        if (!props.setCurrentTimeOnOpen) return;
        props.setSelectedHour(currentTime.hour);
        props.setMeridiem(currentTime.meridiem);
      } else {
        props.setMeridiem(getAmPm(props.value.hour));
        props.setSelectedHour(convert24HourTo12Hour(props.value.hour));
      }
    }

    if (props.allowedView.includes("minute")) {
      if (props.value.minute === undefined) {
        if (!props.setCurrentTimeOnOpen) return;
        props.setSelectedMinute(currentTime.minute);
      } else {
        props.setSelectedMinute(props.value.minute);
      }
    }

    if (props.allowedView.includes("second")) {
      if (props.value.second === undefined) {
        if (!props.setCurrentTimeOnOpen) return;
        props.setSelectedSeconds(currentTime.second);
      } else {
        props.setSelectedSeconds(props.value.second);
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
      hour:
        props.selectedHour() !== undefined
          ? convert12HourTo24Hour(props.selectedHour()!, props.meridiem())
          : undefined,
      minute: props.selectedMinute(),
      second: props.selectedSeconds(),
    });

    props.handleTimeChange(
      {
        hour: props.selectedHour(),
        minute: props.selectedMinute(),
        second: props.selectedSeconds(),
      },
      props.meridiem(),
    );
  });

  createEffect(() => {
    if (props.view() === "hour") {
      setLinePosition(`rotateZ(${(props.selectedHour() || 0) * 30}deg)`);
    }
    if (props.view() === "minute") {
      setLinePosition(`rotateZ(${(props.selectedMinute() || 0) * 6}deg)`);
    }
    if (props.view() === "second") {
      setLinePosition(`rotateZ(${(props.selectedSeconds() || 0) * 6}deg)`);
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
    if (props.view() === "hour" && props.selectedHour() !== undefined) {
      setShowHand(true);
      return;
    }
    if (props.view() === "minute" && props.selectedMinute() !== undefined) {
      setShowHand(true);
      return;
    }
    if (props.view() === "second" && props.selectedSeconds() !== undefined) {
      setShowHand(true);
      return;
    }
    setShowHand(false);
  });

  const handlePointerEnter = (
    e: PointerEvent & { currentTarget: HTMLButtonElement; target: Element },
    type: TimeView,
    value?: number,
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
      props.setSelectedHour(value);
      handleMouseDown();
    }
    if (e.pressure > 0 && type === "minute") {
      props.setSelectedMinute(value);
      handleMouseDown();
    }
    if (e.pressure > 0 && type === "second") {
      props.setSelectedSeconds(value);
      handleMouseDown();
    }
  };

  const handleTouchEnd = (
    e: TouchEvent & { currentTarget: HTMLButtonElement; target: Element },
    type: TimeView,
    value?: number,
  ) => {
    if (value === undefined) return;
    handleClick(type, value);
  };

  const handleClick = (type: TimeView, value?: number) => {
    if (value === undefined) return;
    if (type === "hour") {
      props.setSelectedHour(value);
      props.handleNext();
      return;
    }
    if (type === "minute") {
      props.setSelectedMinute(value);
      props.handleNext();
      return;
    }
    if (type === "second") {
      props.setSelectedSeconds(value);
    }
    props.handleNext();
  };

  return (
    <div
      class={cn(
        `
        time-analog-wrapper
        rn-relative 
        rn-flex 
        rn-h-[237px] 
        rn-w-[237px] 
        rn-items-center 
        rn-justify-center 
        rn-rounded-full 
        rn-bg-slate-100
        dark:rn-bg-eerie-black
        `,
        props.timeAnalogWrapperClass,
      )}
      data-time-analog-wrapper={true}
      aria-label={`Select minutes. Selected time is 11:01AM`}
      role={"listbox"}
      tabindex={0}
      onMouseUp={() => setMouseDown(false)}
    >
      <div
        class={cn(
          `
          time-analog-center-hand
          rn-left-[calc(50% 
          -
          1px)]
          rn-bg-dark-time rn-absolute rn-bottom-1/2
          rn-h-[39%]
          rn-w-[2px]
          rn-origin-center-bottom
          dark:rn-bg-[#8f8f8f]
          `,
          {
            "rn-hidden": !showHand(),
            "rn-block": showHand(),
          },
          props.timeAnalogClockHandClass,
        )}
        style={{ transform: linePosition() }}
        data-time-analog-center-hand={true}
      />
      <div
        class={cn(
          `
          time-analog-center-dot
          rn-bg-dark-time
          dark:rn-bg-dark-time 
          rn-absolute 
          rn-left-1/2 
          rn-top-1/2 rn-h-[5px] 
          rn-w-[5px] rn--translate-x-1/2 rn--translate-y-1/2
          rn-transform
          rn-rounded-full
          `,
          props.timeAnalogClockCenterDotClass,
        )}
        data-time-analog-center-dot={true}
      />

      <div
        class={cn(`
          rn-relative
          rn-h-[50px]
          rn-w-[50px]
          rn-bg-transparent
      `)}
      >
        <Show when={props.view() === "hour"} keyed>
          <For each={Array.from(Array(12).keys(), (v) => v + 1)}>
            {(item, index) => {
              return (
                <TimeNumber
                  {...props}
                  type={props.view()}
                  selectedValue={props.selectedHour}
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
                  {...props}
                  type={props.view()}
                  selectedValue={props.selectedMinute}
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
                  {...props}
                  type={props.view()}
                  selectedValue={props.selectedSeconds}
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
