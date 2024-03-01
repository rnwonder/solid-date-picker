import { Accessor, createSignal, onMount, Setter } from "solid-js";
import {
  DateObjectUnits,
  DatePickerType,
  IMonthSelectorType,
  Locale,
  MakeOptionalRequired,
  SelectorColorsAndClassNames,
} from "../../interface/general";
import { Selector } from "../Selector";

export interface MonthSelectorProps extends SelectorColorsAndClassNames {
  month: Accessor<number>;
  setMonth: Setter<number>;
  ref?: Setter<HTMLDivElement | undefined>;
  type?: DatePickerType;
  monthSelectorType?: IMonthSelectorType;
  zIndex?: number;
  locale?: Locale;
  minDate?: MakeOptionalRequired<DateObjectUnits>;
  maxDate?: MakeOptionalRequired<DateObjectUnits>;
  year?: Accessor<number>;
  twoMonthsDisplay?: boolean;
  onMonthChange?: (month: number) => void;
  startDay?: DateObjectUnits;
}
export const MonthSelector = (props: MonthSelectorProps) => {
  const [monthArray, setMonthArray] = createSignal<string[]>([]);

  onMount(() => {
    const months = Array.from({ length: 12 }, (_, i) => {
      return new Date(0, i + 1, 0).toLocaleDateString(props.locale || "en", {
        month: props?.monthSelectorType ? props.monthSelectorType : "short",
      });
    });
    setMonthArray(months);
  });

  return (
    <Selector
      {...props}
      optionsArray={monthArray()}
      option={props.month}
      setOption={props.setMonth}
      ref={props.ref}
      gridTemplateColumnsNo={props.monthSelectorType === "long" ? "3" : "6"}
      attributes={{
        "data-month": "true",
      }}
      className={"month-selector-option"}
      zIndex={props.zIndex}
      primaryColor={props.primaryColor}
      primaryTextColor={props.primaryTextColor}
      twoMonthsDisplay={props.twoMonthsDisplay}
    />
  );
};
