import { Component, JSXElement } from "solid-js";
import { styled } from "solid-styled-components";

interface InputHelperTextProps {
  error?: boolean;
  className?: string;
  children?: JSXElement;
  id?: string;
}

const StyledInputHelperText = styled("small")<InputHelperTextProps>`
  display: block;
  margin-left: 1rem;
  font-size: 12px;

  color: var(--red-400);
  &:empty {
    display: none;
  }
`;
export const InputHelperText: Component<InputHelperTextProps> = (props) => {
  return (
    <StyledInputHelperText {...props} class={props.className}>
      {props.children}
    </StyledInputHelperText>
  );
};
