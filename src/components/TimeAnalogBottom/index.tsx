import { Accessor, Setter } from "solid-js";
import clsx from "clsx";
import { Button } from "../Button";
import { ITimeMeridiem } from "../../interface/general";

interface ITimeAnalogBottomProps {
  meridiem: Accessor<ITimeMeridiem>;
  setMeridiem: Setter<ITimeMeridiem>;
}
export const TimeAnalogBottom = (props: ITimeAnalogBottomProps) => {
  return (
    <div
      class={clsx(`
        rn-flex
        rn-justify-between
      `)}
    >
      <Button
        class={clsx(
          `
            rn-w-[2.3rem]
            rn-rounded-full
            rn-flex-shrink-0
            rn-aspect-square`,
          {
            [`rn-bg-primary
                rn-text-white
                hover:rn-bg-primary
              `]: props.meridiem() === "AM",
          }
        )}
        onClick={() => props.setMeridiem("AM")}
      >
        AM
      </Button>

      <Button
        class={clsx(
          `
            rn-w-[2.3rem]
            rn-aspect-square
            rn-rounded-full
            rn-flex-shrink-0
            `,
          {
            [`rn-bg-primary
                rn-text-white
                hover:rn-bg-primary
              `]: props.meridiem() === "PM",
          }
        )}
        onClick={() => props.setMeridiem("PM")}
      >
        PM
      </Button>
    </div>
  );
};
