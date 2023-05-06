import { Component, JSXElement, Setter } from "solid-js";
import { styled } from "solid-styled-components";

interface MenuProps {
  maxHeight?: string;
  ref?: Setter<HTMLDivElement | undefined>;
  children?: JSXElement;
  menuClass?: string;
}

const StyledMenu = styled("div")<MenuProps>`
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  margin-top: 0.3rem;
  overflow-y: auto;
  background-color: var(--dashboard-background-color);
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  max-height: ${(props) => props.maxHeight || "100%"};
`;
export const Menu: Component<MenuProps> = (props) => {
  return <StyledMenu {...props} class={props.menuClass}>{props.children}</StyledMenu>;
};
