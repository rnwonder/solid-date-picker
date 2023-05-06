import { Component, JSXElement } from "solid-js";
import { styled } from "solid-styled-components";

interface DatePickerWeekDaysProps {
  children: JSXElement;
}

const StyledWeek = styled("div")`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-content: space-between;
  margin: 0.5rem 0;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--body-text-color);
  padding: 0 1rem;
  row-gap: 1rem;
`;
export const DatePickerWeek: Component<DatePickerWeekDaysProps> = (props) => {
  return <StyledWeek>{props.children}</StyledWeek>;
};
