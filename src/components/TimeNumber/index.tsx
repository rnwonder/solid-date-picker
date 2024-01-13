import { Accessor, createEffect, createSignal, onMount } from "solid-js";
import clsx from "clsx";
import { leadingZeros } from "../../utils/time";
import { ITimeView, TimeAnalogClassNames } from "../../interface/general";

interface ITimeNumberProps extends TimeAnalogClassNames {
  type: ITimeView;
  selectedValue: Accessor<number | undefined>;
  onClick: (type: ITimeView, value?: number) => void;
  onMouseUp: () => void;
  onPointerEnter: (
    e: PointerEvent & { currentTarget: HTMLButtonElement; target: Element },
    type: ITimeView,
    attr?: number
  ) => void;
  onTouchEnd: (
    e: TouchEvent & { currentTarget: HTMLButtonElement; target: Element },
    type: ITimeView,
    attr?: number
  ) => void;
  onTouchStart: () => void;
  onPointerUp: () => void;
  onPointerCancel: () => void;
  class?: string;
  index: Accessor<number>;
}

export const TimeNumber = (props: ITimeNumberProps) => {
  const [totalNo, setTotalNo] = createSignal(12);
  const [teilBar, setTeilBar] = createSignal(1);
  const [value, setValue] = createSignal<string>();
  const [attr, setAttr] = createSignal<number>();
  const [x, setX] = createSignal<number>(1);
  const [y, setY] = createSignal<number>(1);
  const [isSelected, setIsSelected] = createSignal(false);

  const radius = 100;
  const offsetX = 15;
  const offsetY = 15;

  onMount(() => {
    if (props.type === "hour") {
      setTotalNo(12);
      setTeilBar(1);
    } else if (props.type === "minute" || props.type === "second") {
      setTotalNo(60);
      setTeilBar(5);
    }
  });

  onMount(() => {
    setX(radius * Math.cos((props.index() / totalNo()) * 2 * Math.PI));
    setY(radius * Math.sin((props.index() / totalNo()) * 2 * Math.PI));

    if (props.type === "minute" || props.type === "second") {
      if (props.index() % teilBar() === 0) {
        if (props.index() + 15 >= 60) {
          setValue(leadingZeros(props.index() + 15 - 60).toString());
          setAttr(props.index() + 15 - 60);
        } else {
          setValue(leadingZeros(props.index() + 15).toString());
          setAttr(props.index() + 15);
        }
      } else {
        if (props.index() + 15 >= 60) {
          setValue("");
          setAttr(props.index() + 15 - 60);
        } else {
          setValue("");
          setAttr(props.index() + 15);
        }
      }
    }

    if (props.type === "hour") {
      if (props.index() % teilBar() === 0) {
        if (props.index() + 3 >= 12) {
          setValue((props.index() + 3 - 12).toString());
          setAttr(props.index() + 3 - 12);
        } else {
          setValue((props.index() + 3).toString());
          setAttr(props.index() + 3);
        }
      } else {
        if (props.index() + 3 >= 12) {
          setValue("");
          setAttr(props.index() + 3 - 12);
        } else {
          setValue("");
          setAttr(props.index() + 3);
        }
      }
    }

    if (props.type === "hour" && value() === "0") {
      setValue("12");
    }
  });

  createEffect(() => {
    if (props.selectedValue() === attr()) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  });

  return (
    <button
      class={clsx(
        `
              time-analog-number
              rn-select-none
              rn-absolute
              rn-h-time
              rn-w-time
              rn-leading-time
              rn-rounded-full
              dark:rn-text-slate-200
              hover:rn-bg-transparent`,
        {
          [`
                rn-text-white 
                before:rn-content[''] 
                before:rn-bg-primary 
                before:rn-h-time-2 
                before:rn-w-time-2 
                before:rn-absolute 
                before:rn-top-1/2 
                before:rn-left-1/2 
                before:rn-transform 
                before:rn--translate-x-1/2 
                before:rn--translate-y-1/2
                before:rn-rounded-full
                before:rn-pointer-events-none
                
                `]: isSelected(),
          "": props.index() % teilBar() === 0,
        },
        props.class
      )}
      aria-label={leadingZeros(attr() || 0) + " " + props.type + "s"}
      role={"option"}
      data-time-analog-number={true}
      type={"button"}
      style={{ left: x() + offsetX + "px", top: y() + offsetY + "px" }}
      data-value={attr()}
      onClick={() => props.onClick(props.type, attr())}
      onTouchStart={props.onTouchStart}
      onPointerEnter={(e) => props.onPointerEnter(e, props.type, attr())}
      onPointerUp={props.onPointerUp}
      onMouseUp={props.onMouseUp}
      onPointerCancel={props.onPointerCancel}
      tabindex={isSelected() ? 0 : -1}
      data-selected={isSelected()}
    >
      <span
        class={clsx(" rn-relative rn-z-[1]", {
          [`
                      after:rn-content['']
                      after:rn-absolute
                      after:rn-top-1/2
                      after:rn-left-1/2
                      after:rn-transform
                      after:rn--translate-x-1/2
                      after:rn--translate-y-1/2
                      after:rn-w-[3px]
                      after:rn-h-[3px]
                      after:rn-rounded-full
                      after:rn-bg-white
                      dark:rn-text-slate-200
                      
                      
                      `]: props.type !== "hour" && !value() && isSelected(),
        })}
      >
        {value()}
      </span>
    </button>
  );
};
