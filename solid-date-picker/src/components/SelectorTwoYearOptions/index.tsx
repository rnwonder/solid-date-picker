import { SelectorProps } from "../Selector";
import { cn, convertFormattedNumberBackToNumber } from "../../utils";
import { For } from "solid-js";
import { SelectorOptionButton } from "../SelectorOptionButton";

interface SelectorTwoYearOptionsProps extends Partial<SelectorProps> {
  array: string[];
  handleOptionClick: (
    index: number,
    value: string,
    callback?: () => void,
  ) => void;
}

function SelectorTwoYearOptions(props: SelectorTwoYearOptionsProps) {
  return (
    <div
      class={cn(
        `
        date-year-full-size-selector-options 
        rn-grid 
        rn-grid-cols-4
        rn-gap-x-1
      `,
      )}
    >
      <For each={props.array}>
        {(value, index) => {
          const correctedValue = convertFormattedNumberBackToNumber(
            props.locale,
            {
              value,
              month: "current",
            },
          );

          return (
            <SelectorOptionButton
              {...props}
              value={value}
              index={index}
              className={cn(
                `
              rn-p-2 
              rn-text-[0.9375rem]
            `,
                {
                  "disabled:rn-bg-transparent": !value,
                },
                props.className,
              )}
              disabled={!value}
              attributes={{
                ...(!value
                  ? { "data-selector-type": "selector-option-out-of-range" }
                  : {}),
              }}
            />
          );
        }}
      </For>
    </div>
  );
}

export default SelectorTwoYearOptions;
