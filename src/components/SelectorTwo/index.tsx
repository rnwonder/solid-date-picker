import { createSignal, Setter } from "solid-js";
import { cn } from "../../utils";
import { SelectorProps } from "../Selector";
import SelectorTwoTop from "../SelectorTwoTop";
import SelectorTwoArea from "../SelectorTwoArea";

export const defaultSelectorProps = {
  option: () => 0,
  setOption: () => {},
  optionsArray: [],
};

export interface SelectorTwoProps extends Partial<SelectorProps> {
  setSelectorTwoProps?: Setter<SelectorProps>;
  setShowSelectorTwo?: Setter<boolean>;
  close?: () => void;
}

const SelectorTwo = (props: SelectorTwoProps) => {
  return (
    <div
      class={cn(
        `
        date-selector-wrapper
        rn-absolute
        rn-left-0
        rn-top-0
        rn-z-50
       
        rn-max-h-fit
        rn-w-full
        rn-rounded-md 
        rn-bg-white 
        rn-pb-[0.5rem]
        rn-pt-[0.625rem] 
        rn-shadow-lg
        dark:rn-bg-dreamless-sleep 
      `,
        props.monthYearSelectorWrapperClass,
      )}
      data-scope={"date-picker"}
      data-type={"date-selector-wrapper"}
    >
      <SelectorTwoTop {...props} isYear={props.useValueAsName} />

      <SelectorTwoArea {...props} yearArray={props.yearArray} />
    </div>
  );
};

export default SelectorTwo;
