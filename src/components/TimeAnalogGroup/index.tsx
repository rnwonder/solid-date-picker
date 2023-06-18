import { Popover } from "../Popover";
import { ITimePickerAnalog, TimeAnalog } from "../TimeAnalog";
import clsx from "clsx";
import { Accessor, createSignal, onMount, Setter, Show } from "solid-js";
import {
  ITimeMeridiem,
  ITimePickerFormat,
  ITimeView,
} from "../../interface/general";
import { NextIcon } from "../NextIcon";
import { Button } from "../Button";
import { PrevIcon } from "../PrevIcon";
import { getAmPm, getCurrentTime } from "../../utils/time";
import { TimeAnalogGroupTop } from "../TimeAnalogGroupTop";
import { TimeAnalogBottom } from "../TimeAnalogBottom";

export interface ITimeAnalogGroupProps
  extends Omit<
    ITimePickerAnalog,
    | "view"
    | "handleNext"
    | "setView"
    | "allowedView"
    | "meridiem"
    | "setTime"
    | "time"
    | "setMeridiem"
  > {
  allowedView?: ITimeView[];
}
export const TimeAnalogGroup = (props: ITimeAnalogGroupProps) => {
  const [view, setView] = createSignal<ITimeView>("hour");
  const [allowedView, setAllowedView] = createSignal<ITimeView[]>([
    "hour",
    "minute",
  ]);
  const [meridiem, setMeridiem] = createSignal<ITimeMeridiem>("AM");

  onMount(() => {
    if (props.allowedView) {
      setAllowedView(props.allowedView);
    }
  });

  const handleNext = () => {
    if (view() === "hour" && allowedView().includes("minute")) {
      setView("minute");
      return;
    }
    if (view() === "minute" && allowedView().includes("second")) {
      setView("second");
    }
  };

  const handlePrev = () => {
    if (view() === "second" && allowedView().includes("minute")) {
      setView("minute");
      return;
    }
    if (view() === "minute" && allowedView().includes("hour")) {
      setView("hour");
    }
  };

  return (
    <div
      class={clsx(` 
          date-picker-wrapper 
          rn-shadow-lg 
          rn-border-t 
          rn-border-gray-300 
          rn-bg-white
          dark:rn-border-gray-700
          dark:rn-bg-dreamless-sleep
          rn-border-solid 
          rn-rounded-md 
          rn-pt-[0.625rem] 
          rn-pb-[0.5rem]
          rn-px-[1rem]
          `)}
    >
      <TimeAnalogGroupTop
        view={view}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
      <TimeAnalog
        {...props}
        allowedView={allowedView()}
        view={view}
        setView={setView}
        handleNext={handleNext}
        meridiem={meridiem}
        handleTimeChange={props.handleTimeChange}
        setMeridiem={setMeridiem}
      />

      <Show when={allowedView().includes("hour")}>
        <TimeAnalogBottom meridiem={meridiem} setMeridiem={setMeridiem} />
      </Show>
    </div>
  );
};
