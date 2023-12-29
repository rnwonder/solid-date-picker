import type { Component, Setter } from "solid-js";
import { createEffect, createSignal } from "solid-js";
import { DatePickerGroup } from "./components/DatePickerGroup";
import { PickerValue, TimeValue } from "./interface/general";
import { MonthSelector } from "./components/MonthSelector";
import { YearSelector } from "./components/YearSelector";
// import { utils } from "./utils";
// import style from "./App.module.css";
// import "./themes/ark-ui/ark-ui.css";
import { utils } from "./utils";
import { DateMath } from "./index";
import TimeAnalogPicker from "./components/TimeAnalogPicker";

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

  createEffect(() => {
    // console.log("value", value());
  });

  return (
    <div class={"rn-min-h-screen rn-bg-red-400"}>
      <DatePickerGroup
        value={date}
        // type={"range"}
        setValue={setDate}
        onChange={(data) => {
          console.log(data);
        }}
        // hideCalendar
        // onMonthChange={(month) => {
        //   const obj = {
        //     ...date().value.selectedDateObject,
        //     month: month,
        //   };
        //   console.log(obj);
        //   setDate((prev) => ({
        //     value: {
        //       selectedDateObject: {
        //         ...prev.value.selectedDateObject,
        //         month: month,
        //       },
        //     },
        //     label: utils().formatDate(obj, {
        //       format: "MMM-yyyy",
        //     }),
        //   }));
        // }}
        // onYearChange={(year) => {
        //   const obj = {
        //     ...date().value.selectedDateObject,
        //     year,
        //   };
        //   console.log(obj);
        //   setDate((prev) => ({
        //     value: {
        //       selectedDateObject: {
        //         ...prev.value.selectedDateObject,
        //         year,
        //       },
        //     },
        //     label: utils().formatDate(obj, {
        //       format: "MMM-yyyy",
        //     }),
        //   }));
        // }}
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
        }
      )}
      onBlur={handleOnChange}
    />
  );
};
