import { Accessor, createEffect, createSignal, onMount } from "solid-js";
import clsx from "clsx";
import { leadingZeros } from "../../utils/time";
import { ITimeView } from "../../interface/general";

interface ITimeNumberProps {
  type: ITimeView;
  selectedValue: Accessor<number>;
  onClick: (type: ITimeView, value?: number) => void;
  onMouseUp: () => void;
  onPointerEnter: (
    e: PointerEvent & { currentTarget: HTMLButtonElement; target: Element },
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

  return (
    <button
      class={clsx(
        "circle rn-select-none ",
        {
          active: props.selectedValue() === attr(),
          showDot: props.type !== "hour" && !value(),
        },
        props.class
      )}
      aria-label={leadingZeros(attr() || 0) + " " + props.type + "s"}
      role={"option"}
      style={{ left: x() + offsetX + "px", top: y() + offsetY + "px" }}
      data-value={attr()}
      onClick={() => props.onClick(props.type, attr())}
      onPointerEnter={(e) => props.onPointerEnter(e, props.type, attr())}
      onPointerUp={props.onPointerUp}
      onMouseUp={props.onMouseUp}
      onPointerCancel={props.onPointerCancel}
      onTouchStart={props.onTouchStart}
    >
      <span class={"rn-font-medium"} >{value}</span>
    </button>
  );
};
