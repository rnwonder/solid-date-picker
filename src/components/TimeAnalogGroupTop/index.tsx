import clsx from "clsx";
import { Button } from "../Button";
import { PrevIcon } from "../PrevIcon";
import { NextIcon } from "../NextIcon";
import { Accessor } from "solid-js";
import { ITimeView } from "../../interface/general";

interface ITimeAnalogGroupTopProps {
  view: Accessor<ITimeView>;
  handlePrev: () => void;
  handleNext: () => void;
}
export const TimeAnalogGroupTop = (props: ITimeAnalogGroupTopProps) => {
  return (
    <div
      class={clsx(`
            rn-flex
            rn-justify-between
            rn-mb-2`)}
    >
      <div class="rn-flex rn-justify-center rn-items-center rn-font-medium">
        {props.view() === "hour" ? "HH" : props.view() === "minute" ? "MM" : "SS"}
      </div>

      <div>
        <Button
          class={clsx(
            `
              time-analog-prev-next-btn
              time-analog-prev-btn
              disabled:rn-opacity-10 
              rn-text-black 
              dark:rn-text-slate-200
              rn-rounded-full
              rn-w-[2rem]
              rn-h-[2rem]
              `
            // props.prevMonthBtnClass,
            // props.prevNextMonthBtnClass
          )}
          data-prev={true}
          data-type={"time-analog-prev-next-btn"}
          aria-label={"Move backward to switch to the previous time view"}
          data-scope={"button"}
          data-part={"root"}
          // disabled={isPrevButtonDisabled()}
          onClick={props.handlePrev}
          // style={{
          //     ...(props.arrowsColor && { color: props.arrowsColor }),
          // }}
        >
          {/*{props.prevIcon || <PrevIcon color={props.arrowsColor} />}*/}
          <PrevIcon class={"rn-w-[17px]"} />
        </Button>
        <Button
          class={clsx(
            `
              time-analog-prev-next-btn
              time-analog-next-btn
              disabled:rn-opacity-10 
              rn-text-black 
              dark:rn-text-slate-200
              rn-rounded-full
              rn-w-[2rem]
              rn-h-[2rem]
              `
            // props.nextMonthBtnClass,
            // props.prevNextMonthBtnClass
          )}
          data-next={true}
          aria-label={"Move forward to switch to the next time view."}
          data-scope={"button"}
          data-part={"root"}
          data-type={"time-analog-prev-next-btn"}
          onClick={props.handleNext}
          // disabled={isNextButtonDisabled()}
          // style={{
          //     ...(props.arrowsColor && { color: props.arrowsColor }),
          // }}
        >
          {/*{props.nextIcon || <NextIcon color={props.arrowsColor} />}*/}
          <NextIcon class={"rn-w-[17px]"} />
        </Button>
      </div>
    </div>
  );
};
