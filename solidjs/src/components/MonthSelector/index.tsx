import { Accessor, createSignal, onMount, Setter } from "solid-js";
import {
  DateObjectUnits,
  DatePickerType,
  IMonthSelectorType,
  Locale,
  MakeOptionalRequired,
  SelectorColorsAndClassNames,
  SelectorType,
} from "../../interface/general";
import { Selector } from "../Selector";
import { SelectorTriggerButton } from "../SelectorTriggerButton";
import {
  setSelectorTwoProps,
  setShowSelectorTwo,
  showSelectorTwo,
} from "../SelectorTwo";

export interface MonthSelectorProps extends SelectorColorsAndClassNames {
  month: Accessor<number>;
  setMonth: Setter<number>;
  ref?: Setter<HTMLDivElement | undefined>;
  type?: DatePickerType;
  monthSelectorFormat?: IMonthSelectorType;
  zIndex?: number;
  locale?: Locale;
  minDate?: MakeOptionalRequired<DateObjectUnits>;
  maxDate?: MakeOptionalRequired<DateObjectUnits>;
  year?: Accessor<number>;
  twoMonthsDisplay?: boolean;
  onMonthChange?: (month: number) => void;
  startDay?: DateObjectUnits;
  monthSelectorType?: SelectorType;
}
export const MonthSelector = (props: MonthSelectorProps) => {
  const [monthArray, setMonthArray] = createSignal<string[]>([]);

  onMount(() => {
    const months = Array.from({ length: 12 }, (_, i) => {
      return new Date(0, i + 1, 0).toLocaleDateString(props.locale || "en", {
        month: props?.monthSelectorFormat
          ? props.monthSelectorFormat
          : props.monthSelectorType !== "full-size"
            ? "short"
            : "long",
      });
    });
    setMonthArray(months);
  });

  const handleFullSizeSelector = () => {
    setSelectorTwoProps({
      ...props,
      optionsArray: monthArray(),
      option: props.month,
      setOption: props.setMonth,
      ref: props.ref,
      attributes: {
        "data-month": "true",
      },
      className: "month-selector-option",
      zIndex: props.zIndex,
      primaryTextColor: props.primaryTextColor,
      primaryColor: props.primaryColor,
      twoMonthsDisplay: props.twoMonthsDisplay,
    });
    setShowSelectorTwo(true);
  };

  return (
    <>
      {props.monthSelectorType === "full-size" ? (
        <SelectorTriggerButton
          option={props.month}
          optionsArray={monthArray()}
          type={"full-size"}
          isOpen={showSelectorTwo()}
          twoMonthsDisplay={props.twoMonthsDisplay}
          onClick={handleFullSizeSelector}
        />
      ) : (
        <Selector
          {...props}
          optionsArray={monthArray()}
          option={props.month}
          setOption={props.setMonth}
          ref={props.ref}
          gridTemplateColumnsNo={
            props.monthSelectorFormat === "long" ? "3" : "6"
          }
          attributes={{
            "data-month": "true",
          }}
          className={"month-selector-option"}
          zIndex={props.zIndex}
          primaryColor={props.primaryColor}
          primaryTextColor={props.primaryTextColor}
          twoMonthsDisplay={props.twoMonthsDisplay}
        />
      )}
    </>
  );
};
