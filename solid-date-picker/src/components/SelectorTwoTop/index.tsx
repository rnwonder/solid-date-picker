import { createEffect, createSignal, Show } from "solid-js";
import { cn } from "../../utils";
import { Button } from "../Button";
import { PrevIcon } from "../PrevIcon";
import { NextIcon } from "../NextIcon";
import { SelectorTwoProps } from "../SelectorTwo";

interface SelectorTwoTopProps extends Partial<SelectorTwoProps> {
  isYear?: boolean;
}

function SelectorTwoTop(props: SelectorTwoTopProps) {
  const [isPrevButtonDisabled, setIsPrevButtonDisabled] = createSignal(false);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = createSignal(false);

  createEffect(() => {
    setIsPrevButtonDisabled(
      (!!props.yearRange?.start &&
        !!props.startYear?.() &&
        !!props.count?.() &&
        props.startYear?.()! - 1 < props.yearRange?.start) ||
        (props.startYear?.() || 0) - 20 <= 0,
    );
    setIsNextButtonDisabled(
      !!props.yearRange?.end &&
        !!props.endYear?.() &&
        !!props.count?.() &&
        props.endYear?.()! + 1 > props.yearRange?.end,
    );
  });

  return (
    <div
      class={cn(
        `
          selector-picker-top 
          rn-mb-[0.3125rem] 
          rn-flex 
          rn-items-center 
          rn-justify-between 
          rn-px-2
        `,
      )}
      data-type={"selector-picker-top"}
    >
      <Show when={props.isYear}>
        <Button
          class={cn(
            `
            selector-prev-next-btn 
            selector-prev-btn 
            rn-text-black 
            disabled:rn-opacity-10 
            dark:rn-text-white
          `,
          )}
          data-prev={true}
          data-type={"selector-prev-next-btn"}
          aria-label={"Show previous 20 years."}
          data-scope={"button"}
          data-part={"root"}
          disabled={isPrevButtonDisabled()}
          onClick={props.handlePrev}
          style={{
            ...(props.arrowsColor && { color: props.arrowsColor }),
          }}
        >
          <PrevIcon />
        </Button>
      </Show>

      {props.isYear ? (
        <div
          class={cn(
            `
            date-selector-trigger 
            rn-text-center 
            rn-text-[0.9375rem] 
            rn-font-medium
            dark:rn-text-white
          `,
          )}
          data-type={"date-selector-trigger"}
        >
          {props.range?.()}
        </div>
      ) : (
        <div
          class={cn(
            `
            date-selector-trigger 
            rn-w-full 
            rn-pt-[0.125rem] 
            rn-text-center 
            rn-text-[0.9375rem] 
            rn-font-medium
            dark:rn-text-white
          `,
          )}
          data-type={"date-selector-trigger"}
        >
          {props.monthSelectorTopLabel || "Select A Month"}
        </div>
      )}

      <Show when={props.isYear}>
        <Button
          class={cn(
            `
            selector-prev-next-btn 
            selector-next-btn 
            rn-text-black 
            disabled:rn-opacity-10 
            dark:rn-text-white
           `,
          )}
          data-next={true}
          aria-label={"Show next 20 years."}
          data-scope={"button"}
          data-part={"root"}
          data-type={"selector-prev-next-btn"}
          onClick={props.handleNext}
          disabled={isNextButtonDisabled()}
          style={{
            ...(props.arrowsColor && { color: props.arrowsColor }),
          }}
        >
          <NextIcon />
        </Button>
      </Show>
    </div>
  );
}

export default SelectorTwoTop;
