import { Component } from "solid-js";
import { styled } from "solid-styled-components";

interface PhosphorIconProps {
  iconClassName?: string;
  fontSize?: string;
  color?: string;
  weight?: string;
  onClick?: () => void;
}

const StyledPhosphorIcon = styled("i")<PhosphorIconProps>`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.3rem")};
  color: ${(props) => (props.color ? props.color : "var(--gray-600)")};
  font-weight: ${(props) => (props.weight ? props.weight : "normal")};
`;

export const PhosphorIcon: Component<PhosphorIconProps> = (props) => {
  return (
    <StyledPhosphorIcon
      {...props}
      class={`ph ${props.iconClassName}`}
    ></StyledPhosphorIcon>
  );
};
