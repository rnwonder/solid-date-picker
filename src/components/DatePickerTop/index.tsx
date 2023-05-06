import { Accessor, Component, JSXElement, Setter, Show } from "solid-js";
import { styled } from "solid-styled-components";
import { PhosphorIcon } from "../PhosphorIcon";
import { DatePickerMonthAndYearSelector } from "../DatePickerMonthAndYearSelector";

export interface DatePickerTopProps {
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  setMonth: Setter<number>;
  setYear: Setter<number>;
  month: Accessor<number>;
  year: Accessor<number>;
  render: Accessor<boolean>;
  monthSelectorJSX?: JSXElement;
  yearSelectorJSX?: JSXElement;
  monthYearSelectorJSX?: JSXElement;
}

const StyledDatePickerTop = styled("div")<DatePickerTopProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 0.3125rem 0;
  padding: 0 0.5rem;
`;

const StyledButton = styled("button")`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
export const DatePickerTop: Component<DatePickerTopProps> = (props) => {
  return (
    <StyledDatePickerTop {...props}>
      <StyledButton onClick={props.handlePrevMonth}>
        <PhosphorIcon iconClassName={"ph-caret-left"} />
      </StyledButton>

      <Show when={props.monthYearSelectorJSX} keyed>
        {props.monthYearSelectorJSX}
      </Show>
      <Show when={!props.monthYearSelectorJSX} keyed>
        {props.monthYearSelectorJSX}
        <DatePickerMonthAndYearSelector
          setYear={props.setYear}
          setMonth={props.setMonth}
          month={props.month}
          year={props.year}
          render={props.render}
          monthSelectorJSX={props.monthSelectorJSX}
          yearSelectorJSX={props.yearSelectorJSX}
        />
      </Show>

      <StyledButton onClick={props.handleNextMonth}>
        <PhosphorIcon iconClassName={"ph-caret-right"} />
      </StyledButton>
    </StyledDatePickerTop>
  );
};
