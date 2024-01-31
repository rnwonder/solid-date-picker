import { Component, Setter, Show, JSX } from "solid-js";
import { Portal } from "solid-js/web";
import { clickOutsideSJ } from "../../utils";
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
          <div
            class={`
            ${
              props.hideDefaultStyle
                ? ""
                : `
                rn-bg-transparent
                rn-w-full
                rn-absolute
                rn-z-10
                rn-flex
                rn-flex-col
            `
            }
            `}
            {...props}
          >
            {props.children}
          </div>
        </div>
      </Portal>
    </Show>
  );
};
