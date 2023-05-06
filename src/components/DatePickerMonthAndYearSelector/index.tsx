import { Accessor, Component, Setter, Show } from "solid-js";
import { styled } from "solid-styled-components";
import { SelectInput } from "../SelectInput";
import { ISelectInputData, ISelectOnChangeProps } from "../../interface/input";
import { monthNames } from "../../store/date";
import { currentYear, generateYearsArray } from "./config";
import { DatePickerTopProps } from "../DatePickerTop";

interface DatePickerMonthAndYearSelectorProps
  extends Omit<DatePickerTopProps, "handlePrevMonth" | "handleNextMonth"> {}

const StyledSelector = styled("div")`
  display: flex;
`;

export const DatePickerMonthAndYearSelector: Component<
  DatePickerMonthAndYearSelectorProps
> = (props) => {
  const options = monthNames.map((month, index) => ({
    value: month,
    label: month,
    data: { index },
  }));

  return (
    <StyledSelector>
      <Show when={props.render()} keyed>
        <Show when={props.monthSelectorJSX} keyed>
          {props.monthSelectorJSX}
        </Show>
        <Show when={!props.monthSelectorJSX} keyed>
          <Select
            value={monthNames[props.month()]}
            options={options}
            onChange={({ matched, data }) => {
              if (matched) {
                props.setMonth(data.index);
              }
            }}
            emptyOptionsMessage="Not valid"
            width={"6.5rem"}
          />
        </Show>
        <Show when={props.yearSelectorJSX} keyed>
          {props.yearSelectorJSX}
        </Show>
        <Show when={!props.yearSelectorJSX} keyed>
          <Select
            value={String(props.year())}
            options={generateYearsArray(currentYear - 50, currentYear + 20).map(
              (year, index) => ({
                value: String(year),
                label: String(year),
                data: { year },
              })
            )}
            onChange={({ value, data }) => {
              const selectedYear = data?.year || Number(value);
              props.setYear(selectedYear);
            }}
            maxLength={4}
            useNotInOptionsValue
            width={"4rem"}
          />
        </Show>
      </Show>
    </StyledSelector>
  );
};

const Select = (props: {
  value: string;
  options: ISelectInputData[];
  onChange: (data: ISelectOnChangeProps) => void;
  selectedOptionClass?: string;
  maxLength?: number;
  useNotInOptionsValue?: boolean;
  emptyOptionsMessage?: string;
  width: string;
}) => {
  return (
    <SelectInput
      options={props.options}
      value={props.value}
      maxLength={props.maxLength}
      onChange={props.onChange}
      emptyOptionsMessage={props.emptyOptionsMessage || "Invalid"}
      backgroundColor={"transparent"}
      padding={"0"}
      removeBorder
      textAlign={"center"}
      width={props.width}
      useNotInOptionsValue={props.useNotInOptionsValue}
    />
  );
};
