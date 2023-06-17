import "./style.scss";
import { createEffect, createSignal, For, Show } from "solid-js";
import clsx from "clsx";
import { Button } from "../Button";
import { ITimeView } from "../../interface/general";
import { TimeNumber } from "../TimeNumber";
import style from "../TimePicker/TimeSJ.module.scss";

export const Test = () => {
  const [selectedHour, setSelectedHour] = createSignal(0);
  const [selectedMinute, setSelectedMinute] = createSignal(0);
  const [selectedSeconds, setSelectedSeconds] = createSignal(0);

  const [mouseDown, setMouseDown] = createSignal(false);
  const [isPicking, setIsPicking] = createSignal(false);
  const [onTouch, setOnTouch] = createSignal(false);
  const [type, setType] = createSignal<ITimeView>("hour");
  const [linePosition, setLinePosition] = createSignal("rotateZ(0deg)");

  createEffect(() => {
    if (type() === "hour") {
      setLinePosition(`rotateZ(${selectedHour() * 30}deg)`);
    }
    if (type() === "minute") {
      setLinePosition(`rotateZ(${selectedMinute() * 6}deg)`);
    }
    if (type() === "second") {
      setLinePosition(`rotateZ(${selectedSeconds() * 6}deg)`);
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
    console.log("handleNext");
    handleNext();
    setIsPicking(false);
  });

  const handlePointerEnter = (e: any, type: ITimeView, value?: number) => {
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
    handleNext();
  };

  const handleNext = () => {
    if (type() === "hour") {
      setType("minute");
      return;
    }
    if (type() === "minute") {
      setType("second");
    }
  };

  const getPointerPosition = () => {};

  return (
    <div
      class={
        " rn-w-[237px] rn-h-[237px] rn-bg-blue-200 rn-flex rn-justify-center rn-items-center rn-rounded-full"
      }
      aria-label={`Select minutes. Selected time is 11:01AM`}
      role={"listbox"}
      tabindex={0}
    >
      <div class={clsx(`
      clock-line
      rn-w-[2px] 
      rn-bg-primary
      rn-absolute
      rn-left-[calc(50% - 1px)]
      rn-bottom-1/2
      rn-origin-center-bottom
      rn-h-[10%]

      
      `)} style={{ transform: linePosition() }}></div>
      <div
        class={clsx(
          `
          rn-bg-primary
          rn-w-[5px] 
          rn-h-[5px] 
          rn-absolute 
          rn-top-1/2 rn-left-1/2 
          rn-transform rn--translate-x-1/2 rn--translate-y-1/2
          rn-rounded-full
          `
        )}
      ></div>

      <div class={"parent"}>
        <Show when={type() === "hour"} keyed>
          <For each={Array.from(Array(12).keys(), (v) => v + 1)}>
            {(item, index) => {
              return (
                <TimeNumber
                  type={type()}
                  selectedValue={selectedHour}
                  onClick={handleClick}
                  onMouseUp={() => setMouseDown(false)}
                  onPointerEnter={handlePointerEnter}
                  onTouchStart={() => setMouseDown(false)}
                  onPointerUp={() => setMouseDown(false)}
                  onPointerCancel={() => setMouseDown(false)}
                  index={index}
                />
              );
            }}
          </For>
        </Show>

        <Show when={type() === "minute"} keyed>
          <For each={Array.from(Array(60).keys(), (v) => v + 1)}>
            {(item, index) => {
              return (
                <TimeNumber
                  type={type()}
                  selectedValue={selectedMinute}
                  onClick={handleClick}
                  onMouseUp={() => setMouseDown(false)}
                  onPointerEnter={handlePointerEnter}
                  onTouchStart={() => setMouseDown(false)}
                  onPointerUp={() => setMouseDown(false)}
                  onPointerCancel={() => setMouseDown(false)}
                  index={index}
                />
              );
            }}
          </For>
        </Show>

        <Show when={type() === "second"} keyed>
          <For each={Array.from(Array(60).keys(), (v) => v + 1)}>
            {(item, index) => {
              return (
                <TimeNumber
                  type={type()}
                  selectedValue={selectedSeconds}
                  onClick={handleClick}
                  onMouseUp={() => setMouseDown(false)}
                  onPointerEnter={handlePointerEnter}
                  onTouchStart={() => setMouseDown(false)}
                  onPointerUp={() => setMouseDown(false)}
                  onPointerCancel={() => setMouseDown(false)}
                  index={index}
                />
              );
            }}
          </For>
        </Show>
      </div>
    </div>
  );
};
