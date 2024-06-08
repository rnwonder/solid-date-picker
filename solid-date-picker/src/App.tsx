import { Component, createSignal, Setter } from "solid-js";
import { createEffect } from "solid-js";
import { DatePickerGroup } from "./components/DatePickerGroup";
import { PickerValue, TimeValue } from "./interface/general";
import TimeAnalogPicker from "./components/TimeAnalogPicker";
import { CustomPortal } from "./components/CustomPortal";
import { Popover } from "./components/Popover";
import CalendarExport from "./components/CalendarExport";
import YearSelectorExport from "./components/YearSelectorExport";
import MonthSelectorExport from "./components/MonthSelectorExport";
import { utils } from "./utils";

const App: Component = () => {
  const [value, setValue] = createSignal<TimeValue>({
    label: "",
    value: {},
  });
  const [select, setSelect] = createSignal("");
  const [date, setDate] = createSignal<PickerValue>({
    label: "",
    value: {
      selectedDateObject: utils().getToday(),
    },
  });

  const [date2, setDate2] = createSignal<PickerValue>({
    label: "",
    value: {},
  });

  const [singleCustomDate, setSingleCustomDate] = createSignal<PickerValue>({
    label: "",
    value: {},
  });

  const [time, setTime] = createSignal<TimeValue>({
    value: {
      hour: 13,
      minute: 30,
      second: 15,
    },
    label: "01:30 PM",
  });

  const [value33, setValue33] = createSignal(2024);
  const [valueM, setValueM] = createSignal(1);
  createEffect(() => {
    // console.log("value", value());
  });

  const [show, setShow] = createSignal(false);

  const [ref, setRef] = createSignal<HTMLButtonElement>();

  return (
    <div class={"rn-min-h-screen rn-bg-red-200"}>
      <DatePickerGroup
        type={"range"}
        customDaysClassName={[
          { day: 8, month: 5, year: 2024, className: "jjjj" },
          {
            month: 5,
            year: 2024,
            day: 18,
            className: "orangeDay",
          },
        ]}
        locale={"zh-u-nu-hanidec"}
        // locale={"ar-EG"}
        yearSelectorCount={12}
        calendarLeftAreaJSX={({ close }) => (
          <div>
            Hello <button onClick={close}>close</button>
          </div>
        )}
        disabledDays={[
          {
            start: {
              day: 8,
              month: 5,
              year: 2025,
            },
            end: {
              day: 18,
              month: 5,
              year: 2025,
            },
          },
        ]}
        onDisabledDayError={(data) => {
          console.log(data.day);
        }}
      />

      <TimeAnalogPicker />
      <button
        class={"rn-w-[10rem] rn-bg-white"}
        id={"portal"}
        onClick={() => setShow(true)}
        ref={setRef}
      >
        Hey Click me
      </button>
      <CustomPortal
        setIsShown={setShow}
        isShown={show()}
        // reference={ref}
        referenceId={"portal"}
      >
        <div>
          <p>I am a portal</p>
        </div>
      </CustomPortal>

      <Popover
        content={
          <div
            class={"rn-start rn-flex rn-flex-col rn-gap-y-4 rn-px-4 rn-py-4"}
          >
            <button
              class={"rn-rounded-md rn-p-1 rn-text-start hover:rn-bg-slate-200"}
            >
              Open
            </button>
            <button
              class={"rn-rounded-md rn-p-1 rn-text-start hover:rn-bg-slate-200"}
            >
              Copy
            </button>
            <button
              class={"rn-rounded-md rn-p-1 rn-text-start hover:rn-bg-slate-200"}
            >
              Download
            </button>
          </div>
        }
        contentClassName={"rn-bg-white  rn-shadow-md rn-rounded-md"}
        className={"rn-w-40"}
        useRefWidth
      >
        <button>Click to see a popover</button>
      </Popover>

      <CalendarExport
        onChange={(value) => {
          console.log("onChange", value);
        }}
        onValueChange={(value) => {
          console.log("onValueChange", value);
        }}
        monthSelectorType={"full-size"}
        yearSelectorType={"full-size"}
        yearSelectorCount={32}
        yearRange={{ start: 1998, end: 2030 }}
      />

      <YearSelectorExport
        setYear={setValue33}
        year={value33}
        yearSelectorType={"compact-dropdown"}
      />

      <YearSelectorExport setYear={setValue33} year={value33} />
      <MonthSelectorExport
        setMonth={setValueM}
        month={valueM}
        monthSelectorType={"full-size"}
        twoMonthsDisplay
        locale={"es-MX"}
      />
    </div>
  );
};

export default App;
