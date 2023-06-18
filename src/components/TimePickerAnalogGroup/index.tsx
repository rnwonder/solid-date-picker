import { Popover } from "../Popover";
import { TimePickerAnalog } from "../TimePickerAnalog";
import clsx from "clsx";
import { createSignal } from "solid-js";
import { ITimeMeridiem, ITimeView } from "../../interface/general";
import { NextIcon } from "../NextIcon";
import { Button } from "../Button";
import { PrevIcon } from "../PrevIcon";
import { getAmPm } from "../../utils/time";

export const TimePickerAnalogGroup = () => {
  const [view, setView] = createSignal<ITimeView>("hour");
  const [allowedView, setAllowedView] = createSignal<ITimeView[]>([
    "hour",
    "minute",
  ]);
  const [meridiem, setMeridiem] = createSignal<ITimeMeridiem>("AM");

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
      <div
        class={clsx(`
            rn-flex
            rn-justify-between
            rn-mb-2`)}
      >
        <div class="rn-flex rn-justify-center rn-items-center rn-font-medium">
          {view() === "hour" ? "HH" : view() === "minute" ? "MM" : "SS"}
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
            onClick={handlePrev}
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
            onClick={handleNext}
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
      <TimePickerAnalog
        allowedView={allowedView()}
        view={view}
        setView={setView}
        handleNext={handleNext}
      />

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
            rn-h-[2.3rem]
            rn-rounded-full
            rn-flex-shrink-0
            
            `,
            {
              [`rn-bg-primary
                rn-text-white
                hover:rn-bg-primary
              `]: meridiem() === "AM",
            }
          )}
          onClick={() => setMeridiem("AM")}
        >
          AM
        </Button>

        <Button
          class={clsx(
            `
            rn-w-[2.3rem]
            rn-h-[2.3rem]
            rn-rounded-full
            rn-flex-shrink-0
            `,
            {
              [`rn-bg-primary
                rn-text-white
                hover:rn-bg-primary
              `]: meridiem() === "PM",
            }
          )}
          onClick={() => setMeridiem("PM")}
        >
          PM
        </Button>
      </div>
    </div>
  );
};
