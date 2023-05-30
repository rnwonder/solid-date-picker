import type { Component } from "solid-js";
import { createEffect, createSignal } from "solid-js";
import { DatePickerGroup } from "./components/DatePickerGroup";
import { PickerValue } from "./interface/general";
import { MonthSelector } from "./components/MonthSelector";
import { YearSelector } from "./components/YearSelector";
// import { utils } from "./utils";

const App: Component = () => {
  const [value, setValue] = createSignal("");
  const [select, setSelect] = createSignal("");
  const [date, setDate] = createSignal<PickerValue>({
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
        type={"range"}
        monthSelectorFormat={"long"}
        shouldHighlightWeekends
        // startingMonth={7}
        // startingYear={2024}

        // disableRangeHoverEffect
        // textColor={"blue"}
        primaryColor={"orange"}
        // weekDaysType={"single"}
        weekEndDayTextColor={"blue"}
        showEndOfRange
        // inputWrapperWidth={"fit-content"}
        // renderInput={({ value, showDate }) => (
        //     <input onclick={showDate} style={{
        //         width: "200px",
        //         border: "1px solid #ccc",
        //     }} />
        // )}
        twoMonthsDisplay
        // weekDaysType={"single"}
        hideOutSideDays
        // minDate={utils().getToday()}
        // maxDate={{
        //   year: 2023,
        //   month: 4,
        //   day: 30,
        // }}
        enabledDays={[
          {
            day: 14,
            month: 1,
            year: 2024,
          },
          {
            start: {
              day: 4,
              month: 4,
              year: 2023,
            },
            end: {
              day: 10,
              year: 2023,
              month: 4,
            },
          },
          {
            start: {
              day: 20,
              month: 4,
              year: 2023,
            },
            end: {
              day: 26,
              year: 2023,
              month: 4,
            },
          },
          {
            start: {
              day: 20,
              month: 4,
              year: 2024,
            },
            end: {
              day: 26,
              year: 2024,
              month: 4,
            },
          },
          {
            day: 14,
            month: 5,
            year: 2023,
          },
          {
            day: 14,
            month: 1,
            year: 2024,
          },
        ]}
        customDaysClassName={[
          {
            day: 30,
            className: "bg-red-500",
            month: 4,
            year: 2023,
          },
        ]}
        // maxDate={{
        //     year: 2023,
        //     month: 4,
        //     day: 30,
        // }}
        // primaryColor="red"
        // secondaryColor="blue"
        // secondaryTextColor="white"
        // primaryTextColor="yellow"
        // backgroundColor="pink"
        // removeNavButtons
        // afterNextButtonAreaJSX={<>next</>}
        onChange={(data) => {
          if (data.type === "range") {
            // console.log(data.startDate, data.endDate);
          }
          if (data.type === "single") {
            // console.log(data.selectedDate);
          }

          if (data.type === "multiple") {
            // console.log(data.multipleDates)
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
