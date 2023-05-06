import { Component, JSXElement } from "solid-js";
import { styled } from "solid-styled-components";

interface MenuItemProps {
  isActive?: boolean;
  isFound?: boolean;
  empty?: boolean;
  onClick?: () => void;
  children?: JSXElement;
  menuItemClass?: string;
}

const StyledMenuItem = styled("div")<MenuItemProps>`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  align-items: center;
  min-height: 2rem;
  border-radius: 8px;
  background-color: ${({ isActive, isFound }) =>
    isFound
      ? "var(--input-select-hover-bg-color)"
      : isActive
      ? "var(--primary-400)"
      : "transparent"};
  color: ${({ isActive }) =>
    isActive ? "var(--white)" : "var(--body-text-color)"};

  &:hover {
    background-color: ${({ empty }) =>
      empty ? "transparent" : "var(--input-select-hover-bg-color)"};
  }
`;
export const MenuItem: Component<MenuItemProps> = (props) => {
  return (
    <StyledMenuItem {...props} class={props.menuItemClass}>
      {props.children}
    </StyledMenuItem>
  );
};
