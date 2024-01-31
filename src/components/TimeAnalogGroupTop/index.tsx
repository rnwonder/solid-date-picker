import { Button } from "../Button";
import { PrevIcon } from "../PrevIcon";
import { NextIcon } from "../NextIcon";
import { Accessor, JSX } from "solid-js";
import { ITimeView, TimeAnalogClassNames } from "../../interface/general";
import {cn} from "../../utils/class";

interface ITimeAnalogGroupTopProps extends TimeAnalogClassNames {
  view: Accessor<ITimeView>;
  handlePrev: () => void;
  handleNext: () => void;
  arrowsColor?: string;
  prevIcon?: JSX.Element;
  nextIcon?: JSX.Element;
  allowedView?: ITimeView[];
}
export const TimeAnalogGroupTop = (props: ITimeAnalogGroupTopProps) => {
  return (
    <div
      class={cn(`
            rn-flex
            rn-justify-between
            rn-mb-2`)}
    >
      <div class="rn-flex rn-justify-center rn-items-center rn-font-medium dark:rn-text-slate-300">
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
              disabled:rn-cursor-not-allowed
              disabled:rn-bg-transparent
              rn-text-black 
              dark:rn-text-slate-200
              rn-rounded-full
              rn-w-[2rem]
              rn-h-[2rem]
              `,
            props.prevTimeViewBtnClass,
            props.prevNextTimeViewBtnClass
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
              disabled:rn-cursor-not-allowed
              disabled:rn-bg-transparent
              rn-text-black 
              dark:rn-text-slate-200
              rn-rounded-full
              rn-w-[2rem]
              rn-h-[2rem]
              `,
            props.nextTimeViewBtnClass,
            props.prevNextTimeViewBtnClass
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
