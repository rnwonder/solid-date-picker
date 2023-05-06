import { styled } from "solid-styled-components";
import { Accessor, For, Setter } from "solid-js";
import { monthNames } from "../../store/date";
import { Popover } from "../Popover";

interface MonthSelectorProps {
  month: Accessor<number>;
  setMonth: Setter<number>;
  ref?: Setter<HTMLDivElement | undefined>;
}

const StyledMonthSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: var(--dashboard-background-color);
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.08);
  height: 150px;
  overflow-y: auto;
  max-width: 400px;
  font-family: inherit;
`;

const StyledMonth = styled.button<{
  selected: boolean;
}>`
  background-color: ${(props) =>
    props.selected ? "var(--primary-400)" : "transparent"};
  color: ${(props) =>
    props.selected ? "var(--white)" : "var(--body-text-color)"};
  min-height: 32px;
  padding: 4px 5px;
  border-radius: 2px;
  border: none;
  cursor: pointer;
  font-family: inherit;
`;

const StyledMonthName = styled.button`
  font-weight: 400;
  font-size: 16px;
  font-family: inherit;
  line-height: 22px;
  background-color: transparent;
  border: none;
  padding: 0 5px;
  cursor: pointer;
`;
export const MonthSelector = (props: MonthSelectorProps) => {
  const handleMonthClick = (month: number, fn?: () => void) => {
    props.setMonth(month);
    fn?.();
  };
  return (
    <Popover
      content={({ close }) => (
        <StyledMonthSelector ref={props.ref}>
          <For each={monthNames}>
            {(monthName, index) => (
              <StyledMonth
                selected={props.month() === index()}
                onClick={() => handleMonthClick(index(), close)}
              >
                {monthName}
              </StyledMonth>
            )}
          </For>
        </StyledMonthSelector>
      )}
    >
      <StyledMonthName>{monthNames[props.month()]}</StyledMonthName>
    </Popover>
  );
};
