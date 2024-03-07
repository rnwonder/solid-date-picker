import { Button } from "../Button";
import { cn, getMonthName } from "../../utils";
import {
  isOptionDisabledOnSelector,
  isOptionSelectedOnSelector,
} from "../../utils/selector";
import { SelectorProps } from "../Selector";
import { Accessor } from "solid-js";

interface SelectorOptionButtonProps extends SelectorProps {
  value: string;
  index: Accessor<number>;
  handleOptionClick: (
    index: number,
    value: string,
    callback?: () => void,
  ) => void;
  callback?: () => void;
  disabled?: boolean;
}

export const SelectorOptionButton = (props: SelectorOptionButtonProps) => {
  return (
    <Button
      class={cn(
        `
        date-selector-option
        rn-text-black
        disabled:rn-opacity-40
        `,
        {
          "rn-selector-option-selected rn-bg-primary rn-text-white hover:rn-bg-primary hover:rn-text-white dark:rn-bg-white dark:rn-text-black dark:hover:rn-bg-white dark:hover:rn-text-black":
            isOptionSelectedOnSelector(props.value, props.index, props),
          "dark:rn-text-white": !isOptionSelectedOnSelector(
            props.value,
            props.index,
            props,
          ),
          [props.monthYearOptionBtnActiveClass || ""]:
            isOptionSelectedOnSelector(props.value, props.index, props),
        },
        props.className,
        props.monthYearOptionBtnClass,
      )}
      onClick={() =>
        props.handleOptionClick(props.index(), props.value, props.callback)
      }
      disabled={
        props.disabled ||
        isOptionDisabledOnSelector(props.value, props.index, props)
      }
      aria-controls={"selector"}
      aria-disabled={isOptionDisabledOnSelector(
        props.value,
        props.index,
        props,
      )}
      aria-selected={isOptionSelectedOnSelector(
        props.value,
        props.index,
        props,
      )}
      data-type={props.useValueAsName ? "year" : "month"}
      aria-readonly={false}
      data-scope={"date-picker"}
      data-part={"cell-trigger"}
      data-selector-option={true}
      date-selector-option-selected={isOptionSelectedOnSelector(
        props.value,
        props.index,
        props,
      )}
      selected={isOptionSelectedOnSelector(props.value, props.index, props)}
      aria-label={
        props.useValueAsName
          ? props.value
          : getMonthName(props.index()) + " " + props.year?.()
      }
      data-value={props.useValueAsName ? props.value : props.index() + 1}
      style={{
        ...(isOptionSelectedOnSelector(props.value, props.index, props)
          ? {
              "background-color": props.primaryColor,
              color: props.primaryTextColor,
            }
          : {}),
        ...(props.textColor &&
          !isOptionSelectedOnSelector(props.value, props.index, props) && {
            color: props.textColor,
          }),
      }}
      aria-owns={props.value}
      {...(props.attributes || {})}
    >
      {props.value}
    </Button>
  );
};
