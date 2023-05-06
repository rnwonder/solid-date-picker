import type { Component } from "solid-js";
import { TextInputGroup } from "./components/TextInputGroup";
import { createEffect, createSignal, onCleanup } from "solid-js";
import { createWindowScroll } from "solid-ts-hooks";
import { SelectInput } from "./components/SelectInput";
import { DatePickerGroup } from "./components/DatePickerGroup";
import { IDatePickerInputDataValue } from "./interface/date";
import { MonthSelector } from "./components/MonthSelector";
import Flex from "./components/Flex";

const App: Component = () => {
  const [value, setValue] = createSignal("");
  const [select, setSelect] = createSignal("");
  const [date, setDate] = createSignal<IDatePickerInputDataValue>({
    label: "",
    value: {},
  });

  const [month, setMonth] = createSignal(0);
  const [monthSelectorRef, setMonthSelectorRef] =
    createSignal<HTMLDivElement>();

  return (
    <div>
      <div
        style={{
          display: "flex",
        }}
      >
        <MonthSelector month={month} setMonth={setMonth} />
      </div>
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
        monthSelectorJSX={
          <MonthSelector
            ref={setMonthSelectorRef}
            month={month}
            setMonth={setMonth}
          />
        }
        value={date}
        month={month}
        setMonth={setMonth}
        setValue={setDate}
        type={"single"}
        componentsToAllowOutsideClick={[monthSelectorRef()]}
      />
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
    </div>
  );
};

export default App;
