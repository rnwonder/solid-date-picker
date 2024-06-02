import { Accessor, createSignal, For, Setter } from "solid-js";
import { Popover } from "../Popover";
import {
  DateObjectUnits,
  DateArray,
  MakeOptionalRequired,
  DatePickerOnChange,
  DatePickerType,
  SelectorColorsAndClassNames,
  YearRange,
} from "../../interface/general";
import { cn } from "../../utils";
import { handleSelectorOptionClick } from "@rnwonder/simple-datejs/datePicker";
import { SelectorOptionButton } from "../SelectorOptionButton";
import { SelectorTriggerButton } from "../SelectorTriggerButton";

export interface SelectorProps extends SelectorColorsAndClassNames {
  option: Accessor<number>;
  setOption: Setter<number>;
  optionsArray?: string[];
  ref?: Setter<HTMLDivElement | undefined>;
  useValueAsName?: boolean;
  gridTemplateColumnsNo?: string;
  attributes?: Record<string, any>;
  className?: string;
  zIndex?: number;
  year?: Accessor<number>;

  minDate?: MakeOptionalRequired<DateObjectUnits>;
  maxDate?: MakeOptionalRequired<DateObjectUnits>;
  enabledDays?: DateArray[];
  onYearChange?: (year: number) => void;
  onMonthChange?: (month: number) => void;
  onChange?: (data: DatePickerOnChange) => void;
  type?: DatePickerType;
  startDay?: DateObjectUnits;
  twoMonthsDisplay?: boolean;

  yearRange?: YearRange;
  yearArray?: Accessor<string[][]>;
  handleNext?: () => void;
  handlePrev?: () => void;
  range?: Accessor<string>;
  startYear?: Accessor<number | undefined>;
  endYear?: Accessor<number | undefined>;
  count?: Accessor<number>;

  noButtonAnimation?: boolean;
}

export const Selector = (props: SelectorProps) => {
  const [open, setOpen] = createSignal(false);

  const handleSelected = (
    index: number,
    value: string,
    callback?: () => void,
  ) => {
    handleSelectorOptionClick(index, value, props, callback);
  };

  return (
    <Popover
      zIndex={props.zIndex}
      className={cn(
        "date-selector-trigger-wrapper rn-w-fit",
        props.monthYearTriggerBtnWrapperClass,
      )}
      onOpen={() => {
        setOpen(true);
        const selectedOption = document.querySelector(
          "[date-selector-option-selected=true]",
        );
        selectedOption?.scrollIntoView({
          block: "center",
          inline: "center",
        });
      }}
      onClose={() => setOpen(false)}
      content={({ close }) => (
        <div
          class={cn(
            `
            date-selector-wrapper
            rn-grid
            rn-max-h-[10.625rem]
            rn-max-w-[25rem]
            rn-gap-2
            rn-overflow-y-auto
            rn-rounded-lg
            rn-bg-white
            rn-p-2
            rn-drop-shadow-lg
            dark:rn-bg-eerie-black
          `,
            {
              "rn-grid-cols-3":
                props.gridTemplateColumnsNo === "3" &&
                props.gridTemplateColumnsNo,
              "rn-grid-cols-4":
                !props.gridTemplateColumnsNo ||
                (props.gridTemplateColumnsNo &&
                  props.gridTemplateColumnsNo !== "3"),
            },
            props.monthYearSelectorWrapperClass,
          )}
          ref={props.ref}
          data-part={"grid"}
          data-scope={"date-picker"}
          aria-roledescription={
            props.useValueAsName ? "calendar year" : "calendar month"
          }
          //@ts-ignore
          role={"grid"}
          aria-multiselectable={false}
          aria-readonly={false}
          aria-disabled={false}
          data-type={"date-selector-wrapper"}
          style={{
            ...(props.backgroundColor && {
              "background-color": props.backgroundColor,
            }),
          }}
        >
          <For each={props.optionsArray}>
            {(value, index) => (
              <SelectorOptionButton
                {...props}
                handleOptionClick={handleSelected}
                value={value as any}
                index={index}
                callback={close}
                className={cn(
                  `
                  date-selector-option
                  rn-px-[5px] 
                  rn-text-sm 
                  rn-text-black
                  disabled:rn-opacity-40
                  smallMobile:rn-text-[12px]
                `,
                  props.className,
                )}
              />
            )}
          </For>
        </div>
      )}
    >
      <SelectorTriggerButton
        option={props.option}
        optionsArray={props.optionsArray}
        useValueAsName={props.useValueAsName}
        type={"compact-dropdown"}
        isOpen={open()}
        twoMonthsDisplay={props.twoMonthsDisplay}
        noButtonAnimation={props.noButtonAnimation}
      />
    </Popover>
  );
};
