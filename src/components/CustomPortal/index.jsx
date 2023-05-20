import { Show } from "solid-js";
import { Portal } from "solid-js/web";
import { clickOutsideSJ } from "../../utils";
function clickOutside(el, accessor) {
    clickOutsideSJ(el, accessor);
}
export const CustomPortal = (props) => {
    return (<Show when={props.isShown} keyed>
      <Portal mount={props?.referenceId
            ? document.getElementById(props.referenceId)
            : props?.reference?.() || document.getElementById("modal")}>
        <div 
    // @ts-ignore
    use:clickOutside={(e) => {
            if (props.ignoreClickOutside)
                return;
            if (props.onClickOutside) {
                props.onClickOutside(e);
                return;
            }
            props.setIsShown(false);
            props.onClose && props.onClose();
        }} class={props.className} style={{
            ...(props.isShown &&
                props.useRefWidth && {
                width: props.reference()?.clientWidth + "px",
            }),
            ...props.style,
        }}>
          <div class={`
            ${props.hideDefaultStyle
            ? ""
            : `
                bg-transparent
                w-full
                absolute
                z-10
                flex
                flex-col
            `}
            `} {...props}>
            {props.children}
          </div>
        </div>
      </Portal>
    </Show>);
};
