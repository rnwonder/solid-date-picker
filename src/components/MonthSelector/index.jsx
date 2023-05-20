import { createSignal, onMount } from "solid-js";
import { Selector } from "../Selector";
export const MonthSelector = (props) => {
    const [monthArray, setMonthArray] = createSignal([]);
    onMount(() => {
        const months = Array.from({ length: 12 }, (e, i) => {
            return new Date(0, i + 1, 0).toLocaleDateString(props.locale || "en", {
                month: props.type || "short",
            });
        });
        setMonthArray(months);
    });
    return (<Selector optionsArray={monthArray()} option={props.month} setOption={props.setMonth} ref={props.ref} gridTemplateColumnsNo={props.type === "long" ? "3" : "6"} attributes={{
            "data-month": "true",
        }} className={"month-selector-option"} zIndex={props.zIndex}/>);
};
