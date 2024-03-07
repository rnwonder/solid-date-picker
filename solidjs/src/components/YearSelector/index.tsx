import {
  Accessor,
  Component,
  createEffect,
  createSignal,
  Setter,
} from "solid-js";
import { Selector } from "../Selector";
import {
  YearRange,
  MakeOptionalRequired,
  DateObjectUnits,
  DatePickerType,
  SelectorColorsAndClassNames,
  SelectorType,
} from "../../interface/general";
import {
  breakArrayIntoSubArrays,
  currentYear,
  generateYearsArray,
  getYearRange,
} from "../../utils";
import { SelectorTriggerButton } from "../SelectorTriggerButton";
import {
  setSelectorTwoProps,
  setShowSelectorTwo,
  showSelectorTwo,
} from "../SelectorTwo";

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
  yearSelectorType?: SelectorType;
}

export const YearSelector: Component<YearSelectorProps> = (props) => {
  const [range, setRange] = createSignal("");
  const [yearArray, setYearArray] = createSignal<string[][]>([]);
  const [startYear, setStartYear] = createSignal<number>();
  const [endYear, setEndYear] = createSignal<number>();
  const [count, _] = createSignal(20);

  createEffect(() => {
    if (props.yearSelectorType !== "full-size") return;
    const {
      range,
      array,
      endYear: end,
      startYear: start,
    } = getYearRange({
      startYear: startYear(),
      endYear: endYear(),
      count: count(),
      year: props.year(),
      yearRange: props.yearRange,
    });

    setRange(range);
    setYearArray(breakArrayIntoSubArrays(array, 4));

    setStartYear(start);
    setEndYear(end);
  });

  const handleNext = () => {
    if (!startYear() || !endYear()) return;
    const end = endYear()!;
    setStartYear(end + 1);
    setEndYear(end + count());
  };

  const handlePrev = () => {
    if (!startYear() || !endYear()) return;
    const start = startYear()!;
    setEndYear(start - 1);
    setStartYear(start - count());
  };

  const handleFullSizeSelector = () => {
    setSelectorTwoProps({
      ...props,
      optionsArray: [],
      yearArray,
      option: props.year,
      setOption: props.setYear,
      ref: props.ref,
      attributes: {
        "data-year": "true",
      },
      handleNext: handleNext,
      handlePrev: handlePrev,
      range,
      className: "year-selector-option",
      zIndex: props.zIndex,
      primaryTextColor: props.primaryTextColor,
      primaryColor: props.primaryColor,
      useValueAsName: true,
      startYear,
      endYear,
      count,
    });
    setShowSelectorTwo(true);
  };

  return (
    <>
      {props.yearSelectorType === "full-size" ? (
        <SelectorTriggerButton
          option={props.year}
          optionsArray={[]}
          type={"full-size"}
          isOpen={showSelectorTwo()}
          onClick={handleFullSizeSelector}
        >
          {props.year()}
        </SelectorTriggerButton>
      ) : (
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
      )}
    </>
  );
};
