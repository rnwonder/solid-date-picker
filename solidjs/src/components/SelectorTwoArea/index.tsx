import { SelectorProps } from "../Selector";
import { cn, handleSelectorOptionClick } from "../../utils";
import { For, Show } from "solid-js";
import { SelectorOptionButton } from "../SelectorOptionButton";
import {
  defaultSelectorProps,
  setSelectorTwoProps,
  setShowSelectorTwo,
} from "../SelectorTwo";
import SelectorTwoYearOptions from "../SelectorTwoYearOptions";

function SelectorTwoArea(props: SelectorProps) {
  const handleOptionClick = (index: number, value: string) => {
    handleSelectorOptionClick(index, value, props, () => {
      setSelectorTwoProps(defaultSelectorProps);
      setShowSelectorTwo(false);
    });
  };

  return (
    <div
      class={cn(`
        date-full-size-selector-area
        rn-z-50
        rn-flex
        rn-flex-col
        rn-justify-between
       
        rn-gap-y-4 
        rn-p-2
      `)}
    >
      <Show when={!props.useValueAsName}>
        <div
          class={cn(
            `
            date-month-full-size-selector-options-wrapper 
            rn-grid 
            rn-grid-cols-3 
            rn-gap-x-1 
            rn-gap-y-4
          `,
          )}
        >
          <For each={props.optionsArray}>
            {(month, index) => (
              <SelectorOptionButton
                {...props}
                value={month}
                index={index}
                className={cn(
                  `
                  rn-p-2 
                  rn-text-sm
                `,
                  props.className,
                )}
                handleOptionClick={handleOptionClick}
              />
            )}
          </For>
        </div>
      </Show>

      <Show when={props.useValueAsName}>
        <For each={props.yearArray?.()}>
          {(yearData) => (
            <SelectorTwoYearOptions
              {...props}
              array={yearData}
              handleOptionClick={handleOptionClick}
            />
          )}
        </For>
      </Show>
    </div>
  );
}

export default SelectorTwoArea;
