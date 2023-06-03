import { Accessor, createSignal, For, Setter } from "solid-js";
import clsx from "clsx";
import { Popover } from "../Popover";
import { Button } from "../Button";
import {
  DateObjectUnits,
  DateArray,
  IColors,
  MakeOptionalRequired,
  ClassNames,
} from "../../interface/general";
import { isNotPartOfEnabledDays } from "../../utils";

interface SelectorProps extends IColors, ClassNames {
  option: Accessor<number>;
  setOption: Setter<number>;
  optionsArray: string[];
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

  twoMonthsDisplay?: boolean;
}

export const Selector = (props: SelectorProps) => {
  const [open, setOpen] = createSignal(false);
  const handleOptionClick = (index: number, value: string, fn?: () => void) => {
    if (props.useValueAsName) {
      props.setOption(Number(value));
    } else {
      props.setOption(index);
    }
    fn?.();
  };
  const isSelected = (value: string, index: Accessor<number>) => {
    return props.useValueAsName
      ? props.option() === Number(value)
      : props.option() === index();
  };

  const isDisabled = (value: string, index: Accessor<number>): boolean => {
    // year
    if (props.useValueAsName) {
      if (props.minDate || props.maxDate) {
        return (
          (props.minDate?.year ? Number(value) < props.minDate?.year : false) ||
          (props.maxDate?.year ? Number(value) > props.maxDate?.year : false)
        );
      }

      if (props.enabledDays) {
        return props.enabledDays.every((enabled) => {
          if ("start" in enabled && "end" in enabled) {
            return (
              enabled.start.year !== Number(value) ||
              enabled.end.year !== Number(value)
            );
          }
          return enabled.year !== Number(value);
        });
      }
    } else {
      // month
      if (props.minDate || props.maxDate) {
        return (
          (props.minDate
            ? (props.minDate.year === props.year?.() &&
                index() < props.minDate.month) ||
              props.minDate?.year > (props.year?.() || 0)
            : false) ||
          (props.maxDate
            ? props.maxDate.year === props.year?.() &&
              index() > props.maxDate.month
            : false)
        );
      }

      if (props.enabledDays && props.year?.()) {
        return isNotPartOfEnabledDays({
          year: props.year?.(),
          month: index(),
          enabledDays: props.enabledDays,
        });
      }
    }
    return false;
  };

  return (
    <Popover
      zIndex={props.zIndex}
      onOpen={() => {
        setOpen(true);
        const selectedOption = document.querySelector("[data-selected=true]");
        selectedOption?.scrollIntoView({
          block: "center",
          inline: "center",
        });
      }}
      onClose={() => setOpen(false)}
      content={({ close }) => (
        <div
          class={clsx(
            `
            date-selector-wrapper
            bg-white
            rounded-lg
            drop-shadow-lg
            grid
            ${
              props.gridTemplateColumnsNo
                ? props.gridTemplateColumnsNo === "3"
                  ? `grid-cols-3`
                  : `grid-cols-4`
                : "grid-cols-4"
            }
            gap-2
            p-2
            max-h-[10.625rem]
            max-w-[25rem]
            overflow-y-auto
            
          `,
            props.monthYearSelectorWrapperClass
          )}
          ref={props.ref}
          //@ts-ignore
          role={"composite"}
          aria-activedescendant={props.option()}
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
              <Button
                class={clsx(
                  `
                  date-selector-option
                  px-[5px] 
                  text-black 
                  text-sm
                  smallMobile:text-[12px]
                  disabled:opacity-40
                  ${
                    isSelected(value, index)
                      ? "bg-primary text-white hover:bg-primary hover:text-white selector-option-selected"
                      : ""
                  }

                `,
                  props.className,
                  props.monthYearOptionBtnClass,
                  {
                    [props.monthYearOptionBtnActiveClass || ""]: isSelected(
                      value,
                      index
                    ),
                  }
                )}
                style={{
                  ...(isSelected(value, index)
                    ? {
                        "background-color": props.primaryColor,
                        color: props.primaryTextColor,
                      }
                    : {}),
                  ...(props.textColor &&
                    !isSelected(value, index) && { color: props.textColor }),
                }}
                onClick={() => handleOptionClick(index(), value, close)}
                data-selected={isSelected(value, index)}
                data-selector-option={true}
                aria-selected={isSelected(value, index)}
                aria-disabled={false}
                aria-readonly={false}
                aria-label={value}
                aria-setsize={props.optionsArray.length}
                aria-posinset={index() + 1}
                aria-controls={"selector"}
                aria-owns={value}
                {...(props.attributes || {})}
                disabled={isDisabled(value, index)}
              >
                {value}
              </Button>
            )}
          </For>
        </div>
      )}
    >
      <Button
        class={clsx(
          `
        p-[5px]
        text-black
        text-[15px]
        animate-none
        font-bold
        date-selector-trigger
        breakTwoCalendar:text-sm
      `,
          props.monthYearTriggerBtnClass
        )}
        aria-haspopup={true}
        aria-expanded={open()}
        data-type={"date-selector-trigger"}
        style={{
          ...(props.textColor && { color: props.textColor }),
        }}
      >
        {props.useValueAsName
          ? props.option()
          : props.twoMonthsDisplay
          ? `${props.optionsArray[props.option()]} - ${
              props.option() === 11
                ? props.optionsArray[0]
                : props.optionsArray[props.option() + 1]
            }`
          : props.optionsArray[props.option()]}
      </Button>
    </Popover>
  );
};
