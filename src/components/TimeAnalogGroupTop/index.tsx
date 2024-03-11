import { Button } from "../Button";
import { PrevIcon } from "../PrevIcon";
import { NextIcon } from "../NextIcon";
import { Accessor, JSX } from "solid-js";
import { TimeView, TimeClassName } from "../../interface/general";
import { cn } from "../../utils/class";

interface ITimeAnalogGroupTopProps extends TimeClassName {
  view: Accessor<TimeView>;
  handlePrev: () => void;
  handleNext: () => void;
  arrowsColor?: string;
  prevIcon?: JSX.Element;
  nextIcon?: JSX.Element;
  allowedView?: TimeView[];
}
export const TimeAnalogGroupTop = (props: ITimeAnalogGroupTopProps) => {
  return (
    <div
      class={cn(`
        rn-mb-2
        rn-flex
        rn-justify-between`)}
    >
      <div class="rn-flex rn-items-center rn-justify-center rn-font-medium dark:rn-text-white">
        {props.view() === "hour"
          ? "HH"
          : props.view() === "minute"
            ? "MM"
            : "SS"}
      </div>

      <div>
        <Button
          class={cn(
            `
              time-analog-prev-next-btn
              time-analog-prev-btn
              rn-h-[2rem]
              rn-w-[2rem]
              rn-rounded-full 
              rn-text-black
              disabled:rn-cursor-not-allowed
              disabled:rn-bg-transparent
              dark:rn-text-white
              `,
            props.prevTimeViewBtnClass,
            props.prevNextTimeViewBtnClass,
          )}
          data-prev={true}
          data-type={"time-analog-prev-next-btn"}
          aria-label={"Move backward to switch to the previous time view"}
          data-scope={"button"}
          data-part={"root"}
          disabled={
            props.view() === "hour" ||
            (props.view() === "minute" &&
              !props.allowedView?.includes("hour")) ||
            (props.view() === "second" &&
              !props.allowedView?.includes("minute"))
          }
          onClick={props.handlePrev}
          style={{
            ...(props.arrowsColor && { color: props.arrowsColor }),
          }}
        >
          {props.prevIcon || (
            <PrevIcon class={"rn-w-[17px]"} color={props.arrowsColor} />
          )}
        </Button>
        <Button
          class={cn(
            `
              time-analog-prev-next-btn
              time-analog-next-btn
              rn-h-[2rem]
              rn-w-[2rem]
              rn-rounded-full 
              rn-text-black
              disabled:rn-cursor-not-allowed
              disabled:rn-bg-transparent
              dark:rn-text-white
              `,
            props.nextTimeViewBtnClass,
            props.prevNextTimeViewBtnClass,
          )}
          data-next={true}
          aria-label={"Move forward to switch to the next time view."}
          data-scope={"button"}
          data-part={"root"}
          data-type={"time-analog-prev-next-btn"}
          onClick={props.handleNext}
          disabled={
            props.view() === "second" ||
            (props.view() === "minute" &&
              !props.allowedView?.includes("second"))
          }
          style={{
            ...(props.arrowsColor && { color: props.arrowsColor }),
          }}
        >
          {props.nextIcon || (
            <NextIcon class={"rn-w-[17px]"} color={props.arrowsColor} />
          )}
        </Button>
      </div>
    </div>
  );
};
