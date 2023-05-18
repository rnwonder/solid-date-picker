import { Accessor, Component, Setter } from "solid-js";
import { Selector } from "../Selector";
import {
  currentYear,
  generateYearsArray,
} from "../DatePickerMonthAndYearSelector/config";

interface YearSelectorProps {
  year: Accessor<number>;
  setYear: Setter<number>;
  ref?: Setter<HTMLDivElement | undefined>;
}

export const YearSelector: Component<YearSelectorProps> = (props) => {
  return (
    <Selector
      optionsArray={generateYearsArray(currentYear - 51, currentYear + 20).map(
        (year) => year.toString()
      )}
      option={props.year}
      setOption={props.setYear}
      ref={props.ref}
      attributes={{
        "data-year": "true",
      }}
      useValueAsName
      className={"year-selector-option"}
    />
  );
};
