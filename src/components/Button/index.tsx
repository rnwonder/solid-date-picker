import {Component, createSignal, JSX} from "solid-js";
import {cn} from "../../utils";

interface ButtonProps extends JSX.DOMAttributes<HTMLButtonElement> {
  class?: string;
  setHeight?: boolean;
  disabled?: boolean;
  style?: JSX.CSSProperties;
  selected?: boolean;
}

export const [showAnimation, setShowAnimation] = createSignal(true)

export const Button: Component<ButtonProps> = (props) => {
  return (
    <button
      {...{ ...props, class: undefined }}
      class={cn(
        `
        rn-btn 
        rn-btn-ghost 
        ${props.setHeight ? "" : "rn-h-full"} 
        ${props.selected ? "" : "dark:hover:rn-bg-black-tie"}
        rn-p-0 
        rn-min-h-0 
        date-picker-main-btn
        motion-reduce:rn-transition-none
       
        `,
          {
              'rn-no-animation': !showAnimation()
          },
        props.class
      )}
      data-type={"date-picker-main-btn"}
      type={"button"}
    >
      {props.children}
    </button>
  );
};
