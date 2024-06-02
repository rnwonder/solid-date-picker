import { Button } from "../Button";
import { cn } from "../../utils";
import { SelectorProps } from "../Selector";
import { JSX, JSXElement } from "solid-js";
import { SelectorType } from "../../interface/general";

interface Props
  extends Pick<
      SelectorProps,
      | "monthYearTriggerBtnClass"
      | "useValueAsName"
      | "textColor"
      | "option"
      | "twoMonthsDisplay"
      | "optionsArray"
    >,
    JSX.DOMAttributes<HTMLButtonElement> {
  children?: JSXElement;
  isOpen: boolean;
  type: SelectorType;
  noButtonAnimation?: boolean;
}

export const SelectorTriggerButton = (props: Props) => {
  return (
    <Button
      {...props}
      class={cn(
        `
        date-selector-trigger
        rn-animate-none
        rn-p-[5px]
        rn-text-[15px]
        rn-font-bold
        
        rn-text-black
        dark:rn-text-white
        
        breakTwoCalendar:rn-text-sm`,
        props.monthYearTriggerBtnClass,
      )}
      aria-haspopup={props.type === "compact-dropdown"}
      aria-label={props.useValueAsName ? "Select a year" : "Select a month"}
      data-scope={"button"}
      data-part={"root"}
      aria-expanded={props.isOpen}
      data-type={"date-selector-trigger"}
      style={{
        ...(props.textColor && { color: props.textColor }),
      }}
      noButtonAnimation={props.noButtonAnimation}
    >
      {props.children ||
        (props.useValueAsName
          ? props.option()
          : props.twoMonthsDisplay
            ? `${props.optionsArray?.[props.option()]} - ${
                props.option() === 11
                  ? props.optionsArray?.[0]
                  : props.optionsArray?.[props.option() + 1]
              }`
            : props.optionsArray?.[props.option()])}
    </Button>
  );
};
