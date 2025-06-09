import { Component, Setter, Show, JSX, Accessor, createEffect } from "solid-js";
import { Portal } from "solid-js/web";
import { ClickOutsideAccessor, clickOutsideSJ, cn } from "../../utils";
export interface ModalProps {
  children: any;
  isShown?: boolean;
  reference?: Accessor<HTMLElement | undefined>;
  class?: string;
  setIsShown: Setter<boolean>;
  onClose?: () => void;
  useRefWidth?: boolean;
  style?: JSX.CSSProperties | undefined;
  referenceId?: string;
  hideDefaultStyle?: boolean;
  onClickOutside?: (e?: MouseEvent) => void;
  ignoreClickOutside?: boolean;
  innerWrapperClass?: string;
  clickOutsideRef?: Accessor<HTMLElement | undefined>;
  onClickOutsideRef?: (e?: MouseEvent) => void;
  portalContainer?: HTMLElement;
}

function clickOutside(el: HTMLElement, accessor: ClickOutsideAccessor) {
  clickOutsideSJ(el, accessor);
}

export const CustomPortal: Component<ModalProps> = (props) => {
  createEffect(() => {
    if (!props.clickOutsideRef?.()) return;
    clickOutside(props.clickOutsideRef?.()!, (e) => {
      if (!props.isShown) return;
      if (props.ignoreClickOutside) return;
      if (props.onClickOutsideRef) {
        props.onClickOutsideRef(e);
        return;
      }
      props.setIsShown(false);
    });
  });
  return (
    <Show when={props.isShown} keyed>
      <Portal
        mount={
          props?.referenceId
            ? document.getElementById(props.referenceId)
            : props?.reference?.() ||
              props.portalContainer ||
              (document.getElementById("modal") as any)
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
          class={props.class}
          style={{
            ...(props.useRefWidth &&
              (props.reference?.() ||
                (props.referenceId &&
                  document.getElementById(props.referenceId))) && {
                width: props.reference?.()
                  ? props.reference?.()?.clientWidth + "px"
                  : document.getElementById(props.referenceId || "")
                    ? document.getElementById(props.referenceId || "")
                        ?.clientWidth + "px"
                    : "",
              }),
            ...props.style,
          }}
        >
          <div
            class={cn(
              {
                [`
                    rn-absolute
                    rn-z-10
                    rn-flex
                    rn-w-full
                    rn-flex-col
                    rn-bg-transparent
                `]: !props.hideDefaultStyle,
              },
              props.innerWrapperClass,
            )}
            style={{
              ...(props.useRefWidth && {
                width: props.reference?.()?.clientWidth + "px",
              }),
            }}
          >
            {props.children}
          </div>
        </div>
      </Portal>
    </Show>
  );
};
