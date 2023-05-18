import { Accessor, Setter } from "solid-js";
import { monthNames, monthNamesShort } from "../../store/date";
import { Selector } from "../Selector";

interface MonthSelectorProps {
  month: Accessor<number>;
  setMonth: Setter<number>;
  ref?: Setter<HTMLDivElement | undefined>;
  type?: "short" | "long";
}
export const MonthSelector = (props: MonthSelectorProps) => {
  return (
    <Selector
      optionsArray={props.type === "long" ? monthNames : monthNamesShort}
      option={props.month}
      setOption={props.setMonth}
      ref={props.ref}
      gridTemplateColumnsNo={props.type === "long" ? "3" : "6"}
      attributes={{
        "data-month": "true",
      }}
      className={"month-selector-option"}
    />
  );
};
