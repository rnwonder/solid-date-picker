import type { Component } from "solid-js";
import { createEffect, createSignal } from "solid-js";
import { DatePickerGroup } from "./components/DatePickerGroup";
import { PickerValue } from "./interface/general";
import { MonthSelector } from "./components/MonthSelector";
import { YearSelector } from "./components/YearSelector";
// import { utils } from "./utils";
// import style from "./App.module.css";
// import "./themes/ark-ui.css";

const App: Component = () => {
  const [value, setValue] = createSignal("");
  const [select, setSelect] = createSignal("");
  const [date, setDate] = createSignal<PickerValue>({
    label: "",
    value: {},
  });

  const [singleCustomDate, setSingleCustomDate] = createSignal<PickerValue>({
    label: "",
    value: {},
  });

  createEffect(() => {
    // console.log(date());
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
        }}
      ></div>

      <DatePickerGroup
        weekDaysType="single"
        type={"range"}
        value={singleCustomDate}
        setValue={setSingleCustomDate}
      />

      <br />
      <br />
      <br />
      <br />
      <br />
      <DatePickerGroup
        value={date}
        setValue={setDate}
        type={"range"}
        monthSelectorFormat={"long"}
        shouldHighlightWeekends
        formatInputLabel="DDD, yyyy MM dd"
        twoMonthsDisplay
        showEndOfRange
        weekStartDay={1}
      />
      <br />
      <br />
      <br />
      <div>
        Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Amet eligendi inventore, ipsum libero officia officiis
        voluptas! Ad autem distinctio explicabo, iure maiores maxime nihil qui,
        ratione, saepe tempore unde ut.
      </div>
      <br />
      <br />
      <br />

      <div>dfdf</div>
      <br />
      <br />
      <br />
      <div>dfdf</div>
      <br />
      <br />
      <br />
      <div>dfdf</div>
      <br />
      <br />
      <br />
      <div>dfdf</div>
      <br />
      <br />
      <br />
      <div>dfdf</div>
      <br />
      <br />
      <br />
      <div>dfdf</div>
      <br />
      <br />
      <br />
      <div>dfdf</div>
      <br />
      <br />
      <br />
      <div>dfdf</div>
      <br />
      <br />
      <br />
      <div>dfdf</div>
      <br />
      <br />
      <br />
      <div>dfdf</div>
      <br />
      <br />
      <br />
      <div>dfdf</div>
      <br />
      <br />
      <br />
      <div>dfdf</div>
      <DatePickerGroup
        monthSelectorJSX={(props) => (
          <MonthSelector
            ref={props.setRefToAllowOutsideClick}
            month={props.month}
            setMonth={props.setMonth}
            type={"long"}
          />
        )}
        yearSelectorJSX={({ year, setYear, setRefToAllowOutsideClick }) => (
          <YearSelector
            ref={setRefToAllowOutsideClick}
            year={year}
            setYear={setYear}
          />
        )}
        calendarPositionY={"bottom"}
        calendarPositionX={"right"}
        value={date}
        setValue={setDate}
      />
      <div>dfdf</div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default App;
