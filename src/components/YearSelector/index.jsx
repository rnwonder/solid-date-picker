import { Selector } from "../Selector";
import { currentYear, generateYearsArray, } from "../DatePickerMonthAndYearSelector/config";
export const YearSelector = (props) => {
    return (<Selector optionsArray={generateYearsArray(props.yearRange?.start || currentYear - 51, props.yearRange?.end || currentYear + 20).map((year) => year.toString())} option={props.year} setOption={props.setYear} ref={props.ref} attributes={{
            "data-year": "true",
        }} useValueAsName className={"year-selector-option"} zIndex={props.zIndex}/>);
};
