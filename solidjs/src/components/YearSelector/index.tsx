import { Accessor, Component, Setter } from "solid-js";
import { Selector } from "../Selector";
import {
  YearRange,
  MakeOptionalRequired,
  DateObjectUnits,
  DatePickerType,
  SelectorColorsAndClassNames,
} from "../../interface/general";
import { currentYear, generateYearsArray } from "../../utils";

export interface YearSelectorProps extends SelectorColorsAndClassNames {
  year: Accessor<number>;
  setYear: Setter<number>;
  ref?: Setter<HTMLDivElement | undefined>;
  zIndex?: number;
  yearRange?: YearRange;
  minDate?: MakeOptionalRequired<DateObjectUnits>;
  maxDate?: MakeOptionalRequired<DateObjectUnits>;
  type?: DatePickerType;
  startDay?: DateObjectUnits;
}

export const YearSelector: Component<YearSelectorProps> = (props) => {
  return (
    <Selector
      {...props}
      optionsArray={generateYearsArray(
        props.yearRange?.start || currentYear - 51,
        props.yearRange?.end || currentYear + 20,
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
      primaryColor={props.primaryColor}
      primaryTextColor={props.primaryTextColor}
    />
  );
};
