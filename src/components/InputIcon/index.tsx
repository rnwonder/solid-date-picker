import {Accessor, Component} from "solid-js";
import { css, styled, useTheme } from "solid-styled-components";
import { PhosphorIcon } from "../PhosphorIcon";

interface InputIconProps {
  isBefore?: boolean;
  formActive: Accessor<boolean>;
  onClick?: () => void;
  wrapperClassName?: string;
    iconClass?: string;
  error?: boolean;
  disabled?: boolean;
  search?: boolean;
}

const StyledInputIcon = styled("div")<InputIconProps>`
  position: relative;
  position: absolute;
  top: 50%;
  right: ${(props) => (props.isBefore ? "auto" : "0")};
  left: ${(props) => (props.isBefore ? "1rem" : "auto")};
  transform: translate(0, -50%) rotate(0deg);
  cursor: pointer;
  user-select: none;
  height: 100%;
  display: flex;
  align-items: center;
  width: 1.375rem;
`;

const StyledOverlay = styled("div")<InputIconProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 0, 0, 0);
  cursor: ${(props) => (props.onClick ? "pointer" : "auto")};
`;
export const InputIcon: Component<InputIconProps> = (props) => {
  const theme = useTheme();
  return (
    <StyledInputIcon {...props} class={props.wrapperClassName}>
      <PhosphorIcon
        color={
          props.disabled
            ? theme.colors.gray600
            : props.error
            ? theme.colors.red400
            : props.formActive()
            ? theme.colors.gray700
            : theme.colors.gray1000
        }
        fontSize={props.search ? "1rem" : '1.1rem'}
        onClick={props.onClick}
        iconClassName={props.iconClass}
      />
      <StyledOverlay {...props} class={''} />
    </StyledInputIcon>
  );
};
