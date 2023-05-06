import { styled } from "solid-styled-components";
import { Component, JSXElement } from "solid-js";

interface Props {
  errorMessage?: string;
  formActive: boolean;
  value?: string;
  label?: string;
  placeholder?: string;
  children?: JSXElement;
  onClick?: () => void;
  ref?: HTMLLabelElement;
  className?: string;
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  search?: boolean;
  isIconBefore?: boolean;
}

const StyledLabel = styled("label")<Props>`
  position: absolute;
  font-size: ${(props) => (props.formActive || props.value ? "11px" : "14px")};
  top: ${(props) => (props.formActive || props.value ? "15%" : "50%")};
  left: ${({ search, isIconBefore }) =>
    search || isIconBefore ? "2.5rem" : "1rem"};
  transform: ${(props) =>
    props.formActive ? "translate(0%, -30%)" : "translate(0%, -50%)"};
  color: ${({ color, formActive, value, errorMessage }) => {
    if (color) {
      return color;
    } else if ((formActive || value) && errorMessage) {
      return "#dc2626";
    } else if (formActive || value) {
      return "#0277bd";
    } else if (errorMessage) {
      return "#111111";
    } else {
      return "#909090";
    }
  }};
  z-index: 1;
  opacity: ${(props) =>
    !props.placeholder && props.label
      ? "1"
      : props.formActive || props.value
      ? "1"
      : "0"};
  pointer-events: ${(props) =>
    props.formActive || props.value ? "auto" : "none"};

  transition: top
      ${(props) => (props.formActive || props.value ? "0.1s" : "0.2s")}
      ease-in-out,
    font-size 0.2s ${(props) => (props.formActive || props.value ? "" : "0.2s")}
      ease-in-out,
    opacity 0.2s ease-in;

  &:empty {
    display: none;
  }

  &:not(:empty) {
    & + input {
    }
  }
`;

const InsideInputLabel: Component<Props> = (props) => {
  return (
    <StyledLabel
      {...props}
      class={props.className}
      aria-labelledby={props.label}
      aria-describedby={props.label + "-input-field"}
      aria-invalid={!!props.errorMessage}
      aria-required={props.required}
      aria-readonly={props.readonly}
      aria-disabled={props.disabled}
    >
      {props.children || props.label}
    </StyledLabel>
  );
};

export default InsideInputLabel;
