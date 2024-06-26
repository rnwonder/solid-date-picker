import { DatePicker, DatePickerProps } from "./DatePicker";
import { DatePickerType } from "../interface/general";
import { createSignal } from "solid-js";
import { SelectorProps } from "./Selector";
import { defaultSelectorProps } from "./SelectorTwo";

export interface DatePickerStandAloneProps
  extends Omit<
    DatePickerProps,
    "handleOnChange" | "type" | "yearSelectorCount"
  > {
  type?: DatePickerType;
  yearSelectorCount?: number;
}

const CalendarExport = (props: DatePickerStandAloneProps) => {
  const [showSelectorTwo, setShowSelectorTwo] = createSignal(false);
  const [selectorTwoProps, setSelectorTwoProps] =
    createSignal<SelectorProps>(defaultSelectorProps);

  return (
    <DatePicker
      {...props}
      type={props.type || "single"}
      handleOnChange={() => {}}
      setShowSelectorTwo={setShowSelectorTwo}
      showSelectorTwo={showSelectorTwo}
      setSelectorTwoProps={setSelectorTwoProps}
      selectorTwoProps={selectorTwoProps}
      yearSelectorCount={props.yearSelectorCount || 20}
    />
  );
};
export default CalendarExport;
