import { Component, JSX } from "solid-js";
import clsx from "clsx";

interface ButtonProps extends JSX.DOMAttributes<HTMLButtonElement> {
  class?: string;
  setHeight?: boolean;
  disabled?: boolean;
  style?: JSX.CSSProperties;
}


export const Button: Component<ButtonProps> = (props) => {
  return (
    <button
      {...{ ...props, class: undefined }}
      class={clsx(
        `
        rn-btn 
        rn-btn-ghost 
        ${props.setHeight ? "" : "rn-h-full"} 
        rn-p-0 
        rn-min-h-0 
        rn-date-picker-main-btn
        motion-reduce:rn-transition-none
        `,
        props.class
      )}
      data-type={"date-picker-main-btn"}
    >
      {props.children}
    </button>
  );
};
