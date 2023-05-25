import { Accessor, Component, Setter } from "solid-js";
import { Selector } from "../Selector";
import {IYearRange, IColors, MakeOptionalRequired, DateObjectUnits} from "../../interface/general";
import { currentYear, generateYearsArray } from "../../utils";

interface YearSelectorProps extends IColors {
  year: Accessor<number>;
  setYear: Setter<number>;
  ref?: Setter<HTMLDivElement | undefined>;
  zIndex?: number;
  yearRange?: IYearRange;
  minDate?: MakeOptionalRequired<DateObjectUnits>;
  maxDate?: MakeOptionalRequired<DateObjectUnits>;
}

export const YearSelector: Component<YearSelectorProps> = (props) => {
  return (
    <Selector
      {...props}
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
      primaryColor={props.primaryColor}
      primaryTextColor={props.primaryTextColor}
      secondaryColor={props.secondaryColor}
      secondaryTextColor={props.secondaryTextColor}
    />
  );
};
