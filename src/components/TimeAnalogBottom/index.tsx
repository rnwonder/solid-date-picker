import { Accessor, Setter } from "solid-js";
import { Button } from "../Button";
import { TimeMeridiem, TimeClassName } from "../../interface/general";
import { cn } from "../../utils";

interface ITimeAnalogBottomProps extends TimeClassName {
  meridiem: Accessor<TimeMeridiem>;
  setMeridiem: Setter<TimeMeridiem>;
}
export const TimeAnalogBottom = (props: ITimeAnalogBottomProps) => {
  const classString = (meridiem: TimeMeridiem) =>
    cn(
      `
        time-picker-meridiem-btn
        rn-aspect-square
        rn-w-[2.3rem]
        rn-flex-shrink-0
        rn-rounded-full
        dark:rn-text-white
        `,
      {
        [`
        dark:rn-bg-dark-time
        dark:hover:rn-bg-dark-time
        rn-bg-dark-time
        rn-text-white
        hover:rn-bg-dark-time
    `]: props.meridiem() === meridiem,
      },
      props.timePickerMeridiemBtnClass,
    );
  return (
    <div
      class={cn(
`
        time-picker-analog-bottom
        rn-flex
        rn-justify-between
      `,
        props.timePickerBottomAreaClass,
      )}
    >
      <Button class={classString("AM")} onClick={() => props.setMeridiem("AM")}>
        AM
      </Button>

      <Button class={classString("PM")} onClick={() => props.setMeridiem("PM")}>
        PM
      </Button>
    </div>
  );
};
