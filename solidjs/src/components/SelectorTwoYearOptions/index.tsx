import { SelectorProps } from "../Selector";
import { cn } from "../../utils";
import { For } from "solid-js";
import { SelectorOptionButton } from "../SelectorOptionButton";

interface SelectorTwoYearOptionsProps extends SelectorProps {
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
        {(value, index) => (
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
        )}
      </For>
    </div>
  );
}

export default SelectorTwoYearOptions;
