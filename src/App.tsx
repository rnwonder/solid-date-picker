import type { Component } from "solid-js";
import { TextInputGroup } from "./components/TextInputGroup";
import { createEffect, createSignal } from "solid-js";
import { SelectInput } from "./components/SelectInput";
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

  return (
    <div>
      <div
        style={{
          display: "flex",
        }}
      ></div>
      <TextInputGroup
        search
        errorMessage={"hhsa"}
        value={value()}
        setValue={setValue}
        label="Test"
      />
      <SelectInput
        value={select()}
        options={[
          { label: "test", value: "test" },
          { label: "test2", value: "test2" },
          { label: "test3", value: "test3" },
        ]}
        onChange={({ value, matched }) => {
          if (matched) {
            setSelect(value);
          } else {
            setSelect("");
          }
        }}
      />
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
