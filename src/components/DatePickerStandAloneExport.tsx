import { DatePicker, DatePickerProps } from "./DatePicker";
import { IDatePickerType } from "../interface/general";

export interface DatePickerStandAloneProps
  extends Omit<DatePickerProps, "handleOnChange" | "type"> {
  type?: IDatePickerType;
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
