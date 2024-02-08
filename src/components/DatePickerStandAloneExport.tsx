import { DatePicker, DatePickerProps } from "./DatePicker";
import { DatePickerType } from "../interface/general";

export interface DatePickerStandAloneProps
  extends Omit<DatePickerProps, "handleOnChange" | "type"> {
  type?: DatePickerType;
}

const DatePickerStandAloneExport = (props: DatePickerStandAloneProps) => {
  return (
    <DatePicker
      {...props}
      type={props.type || "single"}
      handleOnChange={() => {}}
    />
  );
};
export default DatePickerStandAloneExport;
