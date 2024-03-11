import { Accessor, createEffect, createSignal, onMount } from "solid-js";
import { leadingZeros } from "../../utils/time";
import { TimeView, TimeClassName } from "../../interface/general";
import { cn } from "../../utils/class";

interface ITimeNumberProps extends TimeClassName {
  type: TimeView;
  selectedValue: Accessor<number | undefined>;
  onClick: (type: TimeView, value?: number) => void;
  onMouseUp: () => void;
  onPointerEnter: (
    e: PointerEvent & { currentTarget: HTMLButtonElement; target: Element },
    type: TimeView,
    attr?: number,
  ) => void;
  onTouchEnd: (
    e: TouchEvent & { currentTarget: HTMLButtonElement; target: Element },
    type: TimeView,
    attr?: number,
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
    if (
      props.selectedValue() === attr() ||
      (props.selectedValue() === 12 && attr() === 0 && props.type === "hour")
    ) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  });

  return (
    <button
      class={cn(
        `
          time-analog-number
          rn-absolute
          rn-h-time
          rn-w-time
          rn-select-none
          rn-rounded-full
          rn-leading-time
          hover:rn-bg-transparent
          `,
        {
          [`
            before:rn-content[''] 
            rn-text-white 
            before:rn-pointer-events-none 
            before:rn-absolute 
            before:rn-left-1/2 
            before:rn-top-1/2 
            before:rn-h-time-2 
            before:rn-w-time-2 
            before:rn--translate-x-1/2 
            before:rn--translate-y-1/2 
            before:rn-transform
            before:rn-rounded-full
            before:rn-bg-dark-time
            dark:rn-text-white
            dark:before:rn-bg-dark-time
            dark:before:rn-text-white
            `]: isSelected(),
          "": props.index() % teilBar() === 0,
          "dark:rn-text-white": !isSelected(),
        },
        props.class,
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
        class={cn(" rn-relative rn-z-[1]", {
          [`
            after:rn-content['']
            dark:rn-text-red
            dark:after:rn-bg-red
            after:rn-absolute
            after:rn-left-1/2
            after:rn-top-1/2
            after:rn-h-[3px]
            after:rn-w-[3px]
            after:rn--translate-x-1/2
            after:rn--translate-y-1/2
            after:rn-transform
            after:rn-rounded-full
            after:rn-bg-white
            
            `]: props.type !== "hour" && !value() && isSelected(),
        })}
      >
        {value()}
      </span>
    </button>
  );
};
