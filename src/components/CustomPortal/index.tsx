import { Component, Setter, Show, JSX } from "solid-js";
import { Portal, style } from "solid-js/web";
import { styled } from "solid-styled-components";
import { clickOutsideSJ } from "../../../../../package/src/utils";

export interface ModalProps {
  children: any;
  isShown?: boolean;
  reference?: any;
  className?: string;
  setIsShown: Setter<boolean>;
  onClose?: () => void;
  useRefWidth?: boolean;
  style?: JSX.CSSProperties | undefined;
  removeMaxWidth?: boolean;
  referenceId?: string;
  hideDefaultStyle?: boolean;
  onClickOutside?: (e?: any) => void;
  ignoreClickOutside?: boolean;
}

const StyledPortal = styled("div")<ModalProps>`
  ${(props) =>
    props.hideDefaultStyle
      ? ""
      : `
  background-color: transparent;
  width: 100%;
  position: absolute;
  z-index: 10;
  display: flex;
  flex-direction: column;
  `}
`;

function clickOutside(el: any, accessor: any) {
  clickOutsideSJ(el, accessor);
}

export const CustomPortal: Component<ModalProps> = (props) => {
  return (
    <Show when={props.isShown} keyed>
      <Portal
        mount={
          props?.referenceId
            ? document.getElementById(props.referenceId)
            : props?.reference?.() || document.getElementById("modal")
        }
      >
        <div
          // @ts-ignore
          use:clickOutside={(e: any) => {
            if (props.ignoreClickOutside) return;
            if (props.onClickOutside) {
              props.onClickOutside(e);
              return;
            }
            props.setIsShown(false);
            props.onClose && props.onClose();
          }}
          class={props.className}
          style={{
            ...(props.isShown &&
              props.useRefWidth && {
                width: props.reference()?.clientWidth + "px",
              }),
            ...props.style,
          }}
        >
          <StyledPortal {...props}>{props.children}</StyledPortal>
        </div>
      </Portal>
    </Show>
  );
};
