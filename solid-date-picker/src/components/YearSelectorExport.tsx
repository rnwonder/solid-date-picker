import { YearSelector, YearSelectorProps } from "./YearSelector";
import { Popover } from "./Popover";
import { createSignal } from "solid-js";
import { SelectorProps } from "./Selector";
import SelectorTwo, { defaultSelectorProps } from "./SelectorTwo";
import { cn } from "../utils";
import { currentYear } from "@rnwonder/simple-datejs/datePicker";

export interface YearSelectorExportProps
  extends Omit<
    YearSelectorProps,
    "type" | "setShowSelectorTwo" | "setSelectorTwoProps" | "showSelectorTwo"
  > {}

const YearSelectorExport = (props: YearSelectorExportProps) => {
  const [showSelectorTwo, setShowSelectorTwo] = createSignal(false);
  const [selectorTwoProps, setSelectorTwoProps] =
    createSignal<SelectorProps>(defaultSelectorProps);
  const [year, setYear] = createSignal<number>(currentYear);

  return (
    <>
      {props.yearSelectorType === "compact-dropdown" ? (
        <YearSelector
          {...props}
          setSelectorTwoProps={setSelectorTwoProps}
          setShowSelectorTwo={setShowSelectorTwo}
          showSelectorTwo={showSelectorTwo}
        />
      ) : (
        <Popover
          content={({ close }) => (
            <div
              class={cn(`
                rn-w-[17.5rem]
              `)}
            >
              <SelectorTwo
                {...selectorTwoProps()}
                setShowSelectorTwo={setShowSelectorTwo}
                setSelectorTwoProps={setSelectorTwoProps}
                close={close}
                year={props.year || year}
                setOption={props.setYear || setYear}
                option={props.year || year}
              />
            </div>
          )}
          width={"fit-content"}
          onClose={() => {
            setShowSelectorTwo(false);
            setSelectorTwoProps(defaultSelectorProps);
          }}
        >
          <YearSelector
            {...props}
            setSelectorTwoProps={setSelectorTwoProps}
            setShowSelectorTwo={setShowSelectorTwo}
            showSelectorTwo={showSelectorTwo}
            yearSelectorType={"full-size"}
          />
        </Popover>
      )}
    </>
  );
};

export default YearSelectorExport;
