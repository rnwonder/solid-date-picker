import { Component, createSignal, Setter } from "solid-js";
import { createEffect } from "solid-js";
import { DatePickerGroup } from "./components/DatePickerGroup";
import { PickerValue, TimeValue } from "./interface/general";
// import { utils } from "./utils";
// import style from "./App.module.css";
// import "./themes/ark-ui/ark-ui.css";
// import "./themes/shad-cn-ui/shad-cn-ui.css";
import { clickOutsideSJ, utils } from "./utils";
import TimeAnalogPicker from "./components/TimeAnalogPicker";
import DateMath from "./utils/math";
import { CustomPortal } from "./components/CustomPortal";
import { Popover } from "./components/Popover";
import DatePickerStandAloneExport from "./components/DatePickerStandAloneExport";


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

  createEffect(() => {
    // console.log("value", value());
  });

  const [show, setShow] = createSignal(false);

  const [ref, setRef] = createSignal<HTMLButtonElement>();

  return (
    <div class={"rn-min-h-screen rn-bg-red-400"}>
      <DatePickerGroup
        value={date}
        setValue={setDate}
        onValueChange={(data) => {
          console.log("onValueChange", data);
        }}
        onChange={(data) => {
          console.log(data);
        }}
        minDate={utils().getToday()}
        weekDaysType="double"
        monthSelectorFormat={"long"}
        calendarLeftAreaJSX={(props) => <div>Left</div>}
        calendarRightAreaJSX={(props) => <div>Right</div>}
        calendarBottomAreaJSX={(props) => <div>Bottom</div>}
        pickerPositionX={"right"}
        type={"range"}
      />

      <TimeAnalogPicker
        value={time}
        setValue={setTime}
        allowedView={["hour"]}
        hideTopArea
        topAreaJSX={(data) => {
          // available props
          console.log(
            data.time(),
            data.view(),
            data.setView,
            data.meridiem(),
            data.setMeridiem,
            data.handleNext,
            data.handlePrev,
          );
          return (
            <div class={"rn-text-center"}>top jsx hour{data.time()?.hour}</div>
          );
        }}
        leftAreaJSX={<div>left jsx</div>}
        rightAreaJSX={<div>right jsx</div>}
        bottomAreaJSX={<div class={"rn-text-center"}>bottom jsx</div>}
      />
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

      <DatePickerStandAloneExport
        onChange={(value) => {
          console.log("onChange", value);
        }}
        onValueChange={(value) => {
          console.log("onValueChange", value);
        }}
      />
    </div>
  );
};

export default App;

const CustomInput = (props: {
  value: PickerValue;
  setDate: Setter<PickerValue>;
  showDate: () => void;
}) => {
  // createEffect(() => console.log("inner effect", { value: props.value }));
  const handleOnChange = (event: any) => {
    // console.log("on blur", event.target.value);
    if (!event.target.value) return;
    const formattedDateValue = utils().formatDate(event.target.value, {
      format: "dd.mm.yyyy",
    });

    const newSelectedDate = DateMath.set(event.target.value);

    const newDate: PickerValue = {
      label: formattedDateValue,
      value: {
        selected: newSelectedDate.toISO(),
        selectedDateObject: newSelectedDate.toObject(),
      },
    };

    // console.log("from input", newDate);

    props.setDate(newDate);
  };

  return (
    <input
      type="date"
      onClick={props.showDate} // this opens the date picker
      placeholder="I'm a custom input"
      onChange={() => {}}
      value={utils().formatDate(
        new Date(props.value.value.selected as string),
        {
          format: "yyyy-mm-dd",
        },
      )}
      onBlur={handleOnChange}
    />
  );
};
