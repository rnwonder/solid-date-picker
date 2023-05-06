import { Component, JSXElement, Show } from "solid-js";
import { styled } from "solid-styled-components";

interface DatePickerDayProps {
  header?: boolean;
  children?: JSXElement;
  dayRangeStartEnd?: boolean;
  dayRangeBetween?: boolean;
  dayRangeStart?: boolean;
  dayRangeEnd?: boolean;
  daysCurrent?: boolean;
  daysNotCurrentMonth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const StyledDatePickerDay = styled("div")<DatePickerDayProps>`
  font-size: ${(props) => (props.header ? "0.75rem" : "0.9375rem")};
  line-height: 0.875rem;
  font-weight: 700;
  color: #909090;
  letter-spacing: 0.02em;
  text-align: center;
  margin-bottom: 10px;
  text-transform: uppercase;

  display: ${(props) => (props.header ? "block" : "flex")};
  justify-content: center;
  align-items: center;

  position: relative;

  background-color: ${({ dayRangeBetween }) =>
    dayRangeBetween ? "rgba(86, 164, 211, 0.5)" : "transparent"};

  ${({ dayRangeStart, dayRangeStartEnd, dayRangeEnd }) =>
    dayRangeStart && dayRangeStartEnd
      ? `&::before {
            content: "";
            position: absolute;
            top: 0;
            left: 15%;
            width: 85%;
            height: 100%;
            border-radius: 50% 0 0 50%;
            background-color: rgba(86, 164, 211, 0.5);
          }`
      : dayRangeEnd && dayRangeStartEnd
      ? `&::before {
            content: "";
            position: absolute;
            top: 0;
            right: 15%;
            width: 85%;
            height: 100%;
            border-radius: 0 50% 50% 0;
            background-color: rgba(86, 164, 211, 0.5);
          }`
      : ""}
`;

const StyledDay = styled("button")<DatePickerDayProps>`
  text-align: center;
  position: relative;
  color: ${({ dayRangeStart, dayRangeEnd, dayRangeBetween }) =>
    dayRangeStart || dayRangeEnd
      ? "var(--white)"
      : dayRangeBetween
      ? "var(--date-picker-inbetween-color)"
      : "var(--body-text-color)"};
  height: 2rem;
  width: 2rem;
  font-size: 0.9375rem;
  padding: 0;
  opacity: ${(props) => (props.daysNotCurrentMonth ? "0.5" : "1")};
  background-color: ${({ dayRangeStart, dayRangeEnd }) =>
    dayRangeStart || dayRangeEnd ? "var(--primary-400)" : "transparent"};
  border: ${({ dayRangeStart, dayRangeEnd, daysCurrent }) =>
    dayRangeStart || dayRangeEnd
      ? "1px solid var(--primary-500)"
      : daysCurrent
      ? "1px dashed var(--body-text-color)"
      : "none"};

  &:disabled {
    color: var(--body-text-color);
    opacity: 0.3;
  }
  border-radius: 50%;
  cursor: pointer;
`;
export const DatePickerDay: Component<DatePickerDayProps> = (props) => {
  return (
    <StyledDatePickerDay>
      <Show when={props.header} keyed>
        {props.children}
      </Show>

      <Show when={!props.header} keyed>
        <StyledDay {...props}>{props.children}</StyledDay>
      </Show>
    </StyledDatePickerDay>
  );
};
