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
import { ITimeView } from "../../interface/general";
import { TimeNumber } from "../TimeNumber";

interface ITimePickerAnalog {
  timeAnalogNumberClass?: string;
  timeAnalogWrapperClass?: string;
  timeAnalogClockHandClass?: string;
  timeAnalogClockCenterDotClass?: string;
  view: Accessor<ITimeView>;
  setView: Setter<ITimeView>;
  allowedView: ITimeView[];
  handleNext: () => void;
}
export const TimePickerAnalog = (props: ITimePickerAnalog) => {
  const [selectedHour, setSelectedHour] = createSignal(0);
  const [selectedMinute, setSelectedMinute] = createSignal(0);
  const [selectedSeconds, setSelectedSeconds] = createSignal(0);

  const [mouseDown, setMouseDown] = createSignal(false);
  const [isPicking, setIsPicking] = createSignal(false);
  const [onTouch, setOnTouch] = createSignal(false);
  const [linePosition, setLinePosition] = createSignal("rotateZ(0deg)");

  onMount(() => {
    if (props.allowedView.includes("hour")) return;
    if (props.allowedView.includes("minute")) {
      props.setView("minute");
      return;
    }
    if (props.allowedView.includes("second")) {
      props.setView("second");
    }

    document.body.addEventListener("mouseup", () => {
      console.log("mouseup");
      setMouseDown(false)
    });

    // document.addEventListener("mouseleave", () => {
    //   setOnTouch(true)
    // }
  });

  createEffect(() => {
    if (props.view() === "hour") {
      setLinePosition(`rotateZ(${selectedHour() * 30}deg)`);
    }
    if (props.view() === "minute") {
      setLinePosition(`rotateZ(${selectedMinute() * 6}deg)`);
    }
    if (props.view() === "second") {
      setLinePosition(`rotateZ(${selectedSeconds() * 6}deg)`);
    }
  });

  createEffect(() => {
    console.log("isPicking", isPicking(), mouseDown());
    if (!isPicking()) return;
    if (mouseDown()) return;
    if (onTouch()) {
      setOnTouch(false);
      setIsPicking(false);
      props.handleNext();
      return;
    }
    props.handleNext();
    setIsPicking(false);
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
