import type { Component } from "solid-js";
import { createEffect, createSignal, For } from "solid-js";
import { DatePickerGroup } from "./components/DatePickerGroup";
import { IDatePickerInputDataValue } from "./interface/date";
import { MonthSelector } from "./components/MonthSelector";
import { YearSelector } from "./components/YearSelector";

const App: Component = () => {
  const [value, setValue] = createSignal("");
  const [select, setSelect] = createSignal("");
  const [date, setDate] = createSignal<IDatePickerInputDataValue>({
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
        value={date}
        setValue={setDate}
        // type={"range"}
        monthSelectorFormat={"long"}
        removeNavButtons
        afterNextButtonAreaJSX={<>next</>}
        onChange={(data) => {
          if (data.type === "range") {
            // console.log(data.startDate, data.endDate);
          }
          if (data.type === "single") {
            // console.log(data.selectedDate);
          }
        }}
        // shouldCloseOnSelect
        // monthSelectorJSX={({ month, setMonth }) => (
        //   <select
        //     value={month()}
        //     onChange={(e: any) => setMonth(e.target.value)}
        //   >
        //     <For
        //       each={[
        //         "Jan",
        //         "Feb",
        //         "Mar",
        //         "Apr",
        //         "May",
        //         "Jun",
        //         "Jul",
        //         "Aug",
        //         "Sep",
        //         "Oct",
        //         "Nov",
        //         "Dec",
        //       ]}
        //     >
        //       {(item, index) => <option value={index()}>{item}</option>}
        //     </For>
        //   </select>
        // )}
      />
      <br />
      <br />
      <br />
      <div>
        dfdferererererer ererer Lorem ipsum dolor sit amet, consectetur
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
        // renderInput={({ value }) => (
        //   <input
        //     class={"w-full"}
        //     placeholder={"Custom input"}
        //     value={value().label}
        //   />
        // )}
        // calendarLeftAreaJSX={(props) => (
        //   <MonthSelector
        //     ref={props.setRefToAllowOutsideClick}
        //     month={props.month}
        //     setMonth={props.setMonth}
        //   />
        // )}
        // calendarRightAreaJSX={(props) => (
        //   <YearSelector
        //     ref={props.setRefToAllowOutsideClick}
        //     year={props.year}
        //     setYear={props.setYear}
        //   />
        // )}
        // calendarBottomAreaJSX={<div>bottom</div>}
        value={date}
        setValue={setDate}
        // type={"range"}
      />
      <div>dfdf</div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default App;
