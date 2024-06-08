import {
  Accessor,
  Component,
  createEffect,
  createSignal,
  Setter,
} from "solid-js";
import { Selector, SelectorProps } from "../Selector";
import {
  YearRange,
  MakeOptionalRequired,
  DateObjectUnits,
  DatePickerType,
  SelectorColorsAndClassNames,
  SelectorType,
  Locale,
} from "../../interface/general";
import {
  breakArrayIntoSubArrays,
  currentYear,
  generateYearsArray,
  getYearRange,
} from "@rnwonder/simple-datejs/datePicker";
import { SelectorTriggerButton } from "../SelectorTriggerButton";
import { numberFormatter } from "@rnwonder/simple-datejs/datePicker";

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
  setShowSelectorTwo?: Setter<boolean>;
  setSelectorTwoProps?: Setter<SelectorProps>;
  showSelectorTwo?: Accessor<boolean>;
  noButtonAnimation?: boolean;
  locale?: Locale;
  yearSelectorCount: number;
}

export const YearSelector: Component<YearSelectorProps> = (props) => {
  const [range, setRange] = createSignal("");
  const [yearArray, setYearArray] = createSignal<string[][]>([]);
  const [startYear, setStartYear] = createSignal<number>();
  const [endYear, setEndYear] = createSignal<number>();
  const [count, _] = createSignal(
    props.yearSelectorCount ? Math.abs(props.yearSelectorCount) : 20,
  );

  createEffect(() => {
    if (props.yearSelectorType === "compact-dropdown") return;
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
      locale: props.locale || "en-US",
    });

    setRange(range);
    setYearArray(breakArrayIntoSubArrays(array, 4));

    setStartYear(start);
    setEndYear(end);
  });

  createEffect(() => {
    if (props.yearSelectorType === "compact-dropdown") return;
    if (!props.showSelectorTwo) return;

    if (!props.showSelectorTwo()) {
      setStartYear();
      setEndYear();
    }
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
    props.setSelectorTwoProps?.({
      ...props,
      optionsArray: [],
      locale: props.locale || "en-US",
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
    props.setShowSelectorTwo?.(true);
  };

  return (
    <>
      {props.yearSelectorType === "compact-dropdown" ? (
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
      ) : (
        <SelectorTriggerButton
          option={props.year}
          optionsArray={[]}
          type={"full-size"}
          isOpen={props.showSelectorTwo?.() || false}
          onClick={handleFullSizeSelector}
          noButtonAnimation={props.noButtonAnimation}
        >
          {numberFormatter(props.year(), props.locale)}
        </SelectorTriggerButton>
      )}
    </>
  );
};
