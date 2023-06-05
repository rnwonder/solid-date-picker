import { DatePickerGroup } from "./components/DatePickerGroup";
export { CustomPortal as RnPortal } from "./components/CustomPortal";
export { MonthSelector } from "./components/MonthSelector";
export { YearSelector } from "./components/YearSelector";
export { CalendarArea } from "./components/CalendarArea";
export { Popover } from "./components/Popover";
export { DatePicker as DatePickerStandAlone } from "./components/DatePicker";

export { utils } from "./utils";
export * from "./interface/general";
import "./index.css";

const DatePicker = DatePickerGroup;
export default DatePicker;
