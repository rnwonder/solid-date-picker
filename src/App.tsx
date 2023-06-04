import type { Component } from "solid-js";
import { createEffect, createSignal } from "solid-js";
import { DatePickerGroup } from "./components/DatePickerGroup";
import { PickerValue } from "./interface/general";
import { MonthSelector } from "./components/MonthSelector";
import { YearSelector } from "./components/YearSelector";
import { utils } from "./utils";

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
        value={singleCustomDate}
        backgroundColor="#FFEE00"
        calendarTopAreaJSX={
          <div class="top-area">
            <h6>CyberPunk DatePicker</h6>
            <p>
              Huh? I can add <code>top</code>, <code>left</code>,{" "}
              <code>right</code> and <code>bottom</code> jsx? So cool!
            </p>
          </div>
        }
        calendarLeftAreaJSX={({ handleNextMonth, handlePrevMonth }) => (
          <div class="side-area">
            <button onClick={handlePrevMonth}>{`<`}</button>
            <button onClick={handleNextMonth}>{`>`}</button>
          </div>
        )}
        calendarRightAreaJSX={({
          year,
          setYear,
          setRefToAllowOutsideClick,
          month,
          setMonth,
        }) => (
          <div class="side-area right">
            <div>
              <MonthSelector
                month={month}
                setMonth={setMonth}
                ref={setRefToAllowOutsideClick}
                backgroundColor="#FFEE00"
              />
              <YearSelector
                setYear={setYear}
                year={year}
                ref={setRefToAllowOutsideClick}
                backgroundColor="#FFEE00"
              />
            </div>
          </div>
        )}
        calendarBottomAreaJSX={({ selectedDate }) => (
          <div class="bottom-area">
            {utils().formatDate(selectedDate() || {})}
          </div>
        )}
        renderInput={({ showDate, value }) => (
          <div class="custom-input">
            <input value={value().label} readOnly />
            <button onClick={showDate}>c</button>
          </div>
        )}
        weekDaysNameColor="green"
        onChange={(data) => {
          if (data.type === "single") {
            const label = `${data.selectedDate?.day || 1}/${
              data.selectedDate?.month || 1
            }/${data.selectedDate?.year || 2023}`;

            const ISODate = new Date(
              data.selectedDate?.year || 2023,
              data.selectedDate?.month || 1,
              data.selectedDate?.day || 1
            ).toISOString();

            setSingleCustomDate({
              label: label,
              value: {
                selected: ISODate,
              },
            });
          }
        }}
      />

      <DatePickerGroup
        value={date}
        setValue={setDate}
        type={"single"}
        monthSelectorFormat={"long"}
        shouldHighlightWeekends
        formatInputLabel={"MMM DDD, yyyy"}
        locale={"es-MX"}
        // daysActiveRangeBetweenWrapperClass={cssEx}
        // datePickerWrapperClass={"bg-blue-500"}
        monthYearOptionBtnActiveClass={"bg-pink-200 hover:bg-pink-200"}
        // startingMonth={7}
        // startingYear={2024}

        // disableRangeHoverEffect
        // textColor={"blue"}
        // primaryColor={"orange"}
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
        // twoMonthsDisplay
        // weekDaysType={"single"}
        // hideOutSideDays
        // minDate={utils().getToday()}
        // maxDate={{
        //   year: 2023,
        //   month: 4,
        //   day: 30,
        // }}

        weekStartDay={1}
        // enabledDays={[
        //   {
        //     day: 14,
        //     month: 1,
        //     year: 2024,
        //   },
        //   {
        //     start: {
        //       day: 4,
        //       month: 4,
        //       year: 2023,
        //     },
        //     end: {
        //       day: 10,
        //       year: 2023,
        //       month: 4,
        //     },
        //   },
        //   {
        //     start: {
        //       day: 20,
        //       month: 4,
        //       year: 2023,
        //     },
        //     end: {
        //       day: 26,
        //       year: 2023,
        //       month: 4,
        //     },
        //   },
        //   {
        //     start: {
        //       day: 20,
        //       month: 4,
        //       year: 2024,
        //     },
        //     end: {
        //       day: 26,
        //       year: 2024,
        //       month: 4,
        //     },
        //   },
        //   {
        //     day: 14,
        //     month: 5,
        //     year: 2023,
        //   },
        //   {
        //     day: 14,
        //     month: 1,
        //     year: 2024,
        //   },
        // ]}
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

