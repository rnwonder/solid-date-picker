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
import { Selector, SelectorProps } from "../Selector";
import { SelectorTriggerButton } from "../SelectorTriggerButton";

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
  setShowSelectorTwo?: Setter<boolean>;
  setSelectorTwoProps?: Setter<SelectorProps>;
  showSelectorTwo?: Accessor<boolean>;
  noButtonAnimation?: boolean;
  monthSelectorTopLabel?: string;
}
export const MonthSelector = (props: MonthSelectorProps) => {
  const [monthArray, setMonthArray] = createSignal<string[]>([]);

  onMount(() => {
    const months = Array.from({ length: 12 }, (_, i) => {
      return new Date(0, i + 1, 0).toLocaleDateString(props.locale || "en", {
        month: props?.monthSelectorFormat
          ? props.monthSelectorFormat
          : props.monthSelectorType === "compact-dropdown"
            ? "short"
            : "long",
      });
    });
    setMonthArray(months);
  });

  const handleFullSizeSelector = () => {
    props.setSelectorTwoProps?.({
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
    props.setShowSelectorTwo?.(true);
  };

  return (
    <>
      {props.monthSelectorType === "compact-dropdown" ? (
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
      ) : (
        <SelectorTriggerButton
          option={props.month}
          optionsArray={monthArray()}
          type={"full-size"}
          isOpen={props.showSelectorTwo?.() || false}
          twoMonthsDisplay={props.twoMonthsDisplay}
          onClick={handleFullSizeSelector}
          noButtonAnimation={props.noButtonAnimation}
        />
      )}
    </>
  );
};
