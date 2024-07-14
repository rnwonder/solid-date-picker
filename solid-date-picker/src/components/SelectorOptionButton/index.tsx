import { Button } from "../Button";
import { cn, convertFormattedNumberBackToNumber } from "../../utils";
import {
  isOptionDisabledOnSelector,
  isOptionSelectedOnSelector,
} from "@rnwonder/simple-datejs/datePicker";
import { getMonthName } from "@rnwonder/simple-datejs/utils";
import { SelectorProps } from "../Selector";
import { Accessor } from "solid-js";

interface SelectorOptionButtonProps extends Partial<SelectorProps> {
  value: string;
  index: Accessor<number>;
  handleOptionClick: (
    index: number,
    value: string,
    callback?: () => void,
  ) => void;
  callback?: () => void;
  disabled?: boolean;
  noButtonAnimation?: boolean;
}

export const SelectorOptionButton = (props: SelectorOptionButtonProps) => {
  const selectorValue = props.useValueAsName
    ? convertFormattedNumberBackToNumber(props.locale, {
        value: props.value,
        month: "current",
      }).value + ""
    : props.value;

  return (
    <Button
      setHeight
      class={cn(
        `
        date-selector-option
        rn-text-black
        disabled:rn-opacity-40
        rn-h-auto
        `,
        {
          "rn-selector-option-selected rn-bg-primary rn-text-white hover:rn-bg-primary hover:rn-text-white dark:rn-bg-white dark:rn-text-black dark:hover:rn-bg-white dark:hover:rn-text-black":
            isOptionSelectedOnSelector(selectorValue, props.index, props),
          "dark:rn-text-white": !isOptionSelectedOnSelector(
            selectorValue,
            props.index,
            props,
          ),
          [props.monthYearOptionBtnActiveClass || ""]:
            isOptionSelectedOnSelector(selectorValue, props.index, props),
        },
        props.className,
        props.monthYearOptionBtnClass,
      )}
      onClick={() =>
        props.handleOptionClick(props.index(), selectorValue, props.callback)
      }
      disabled={
        props.disabled ||
        isOptionDisabledOnSelector(selectorValue, props.index, props)
      }
      aria-controls={"selector"}
      aria-disabled={isOptionDisabledOnSelector(
        selectorValue,
        props.index,
        props,
      )}
      aria-selected={isOptionSelectedOnSelector(
        selectorValue,
        props.index,
        props,
      )}
      data-type={props.useValueAsName ? "year" : "month"}
      aria-readonly={false}
      data-scope={"date-picker"}
      data-part={"cell-trigger"}
      data-selector-option={true}
      date-selector-option-selected={isOptionSelectedOnSelector(
        selectorValue,
        props.index,
        props,
      )}
      selected={isOptionSelectedOnSelector(selectorValue, props.index, props)}
      aria-label={
        props.useValueAsName
          ? props.value
          : getMonthName(props.index()) + " " + props.year?.()
      }
      data-value={props.useValueAsName ? props.value : props.index() + 1}
      style={{
        ...(isOptionSelectedOnSelector(selectorValue, props.index, props)
          ? {
              "background-color": props.primaryColor,
              color: props.primaryTextColor,
            }
          : {}),
        ...(props.textColor &&
          !isOptionSelectedOnSelector(selectorValue, props.index, props) && {
            color: props.textColor,
          }),
      }}
      aria-owns={props.value}
      noButtonAnimation={props.noButtonAnimation}
      {...(props.attributes || {})}
    >
      {props.value}
    </Button>
  );
};
