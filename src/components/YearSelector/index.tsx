import { Accessor, Component, Setter } from "solid-js";
import { Selector } from "../Selector";
import {
  currentYear,
  generateYearsArray,
} from "../DatePickerMonthAndYearSelector/config";
import { IYearRange } from "../../interface/date";

interface YearSelectorProps {
  year: Accessor<number>;
  setYear: Setter<number>;
  ref?: Setter<HTMLDivElement | undefined>;
  zIndex?: number;
  yearRange?: IYearRange;
}

export const YearSelector: Component<YearSelectorProps> = (props) => {
  return (
    <Selector
      optionsArray={generateYearsArray(
        props.yearRange?.start || currentYear - 51,
        props.yearRange?.end || currentYear + 20
      ).map((year) => year.toString())}
      option={props.year}
      setOption={props.setYear}
      ref={props.ref}
      attributes={{
        "data-year": "true",
      }}
      useValueAsName
      className={"year-selector-option"}
      zIndex={props.zIndex}
    />
  );
};
