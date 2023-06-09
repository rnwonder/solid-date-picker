import { Accessor, Setter } from "solid-js";
import clsx from "clsx";
import { Button } from "../Button";
import { ITimeMeridiem, TimeAnalogClassNames } from "../../interface/general";

interface ITimeAnalogBottomProps extends TimeAnalogClassNames {
    meridiem: Accessor<ITimeMeridiem>;
    setMeridiem: Setter<ITimeMeridiem>;
}
export const TimeAnalogBottom = (props: ITimeAnalogBottomProps) => {
    return (
        <div
            class={clsx(
                `
                time-picker-analog-bottom
                rn-flex
                rn-justify-between
              `,
                props.timePickerBottomAreaClass
            )}
        >
            <Button
                class={clsx(
                    `
                    time-picker-meridiem-btn
                    rn-w-[2.3rem]
                    rn-rounded-full
                    rn-flex-shrink-0
                    rn-aspect-square
                    dark:rn-text-slate-200`,
                    {
                        [`
                            rn-bg-primary
                            rn-text-white
                            hover:rn-bg-primary
                        `]: props.meridiem() === "AM",
                    },
                    props.timePickerMeridiemBtnClass
                )}
                onClick={() => props.setMeridiem("AM")}
            >
                AM
            </Button>

            <Button
                class={clsx(
                    `
                        time-picker-meridiem-btn
                        rn-w-[2.3rem]
                        rn-aspect-square
                        rn-rounded-full
                        rn-flex-shrink-0
                        dark:rn-text-slate-200`,
                    {
                        [`
                            rn-bg-primary
                            rn-text-white
                            hover:rn-bg-primary
                        `]: props.meridiem() === "PM",
                    },
                    props.timePickerMeridiemBtnClass
                )}
                onClick={() => props.setMeridiem("PM")}
            >
                PM
            </Button>
        </div>
    );
};
