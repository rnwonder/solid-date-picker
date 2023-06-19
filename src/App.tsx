import type { Component, Setter } from "solid-js";
import { createEffect, createSignal } from "solid-js";
import { DatePickerGroup } from "./components/DatePickerGroup";
import { PickerValue, TimeValue } from "./interface/general";
import { MonthSelector } from "./components/MonthSelector";
import { YearSelector } from "./components/YearSelector";
// import { utils } from "./utils";
// import style from "./App.module.css";
// import "./themes/ark-ui/ark-ui.css";
// import "./themes/temptress/temptress.css";
import { utils } from "./utils";
import { DateMath } from "./index";
import  TimeAnalogPicker  from "./components/TimeAnalogPicker";

const App: Component = () => {
    const [value, setValue] = createSignal<TimeValue>({
        label: "",
        value: {},
    });
    const [select, setSelect] = createSignal("");
    const [date, setDate] = createSignal<PickerValue>({
        label: "",
        value: {},
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
        <div>
            <div
                style={{
                    display: "flex",
                }}
            ></div>
            <TimeAnalogPicker
                // allowedView={["second", "minute", "hour"]}
                value={value}
                setValue={setValue}
            />

            {/*<TimeSJ setTime={setValue} time={value} />*/}

            <DatePickerGroup
                value={date2}
                setValue={setDate2}
                formatInputLabel="dd.mm.yyyy"
                renderInput={({ value, showDate }) => (
                    <CustomInput
                        showDate={showDate}
                        value={value()}
                        setDate={(val) => setDate2(val)}
                    />
                )}
                onChange={(data) => {
                    console.log("change", date2());
                }}
            />

            <DatePickerGroup
                weekDaysType="double"
                type={"range"}
                value={singleCustomDate}
                setValue={setSingleCustomDate}
                shouldHighlightWeekends
                // hideOutSideDays
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
                eligendi inventore, ipsum libero officia officiis voluptas! Ad
                autem distinctio explicabo, iure maiores maxime nihil qui,
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
                yearSelectorJSX={({
                    year,
                    setYear,
                    setRefToAllowOutsideClick,
                }) => (
                    <YearSelector
                        ref={setRefToAllowOutsideClick}
                        year={year}
                        setYear={setYear}
                    />
                )}
                pickerPositionY={"bottom"}
                pickerPositionX={"right"}
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
