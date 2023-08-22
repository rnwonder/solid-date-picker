import { Component, JSX } from "solid-js";
import clsx from "clsx";

interface ButtonProps extends JSX.DOMAttributes<HTMLButtonElement> {
  class?: string;
  setHeight?: boolean;
  disabled?: boolean;
  style?: JSX.CSSProperties;
  selected?: boolean;
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
        ${props.selected ? "" : "dark:hover:rn-bg-slate-700"}
        rn-p-0 
        rn-min-h-0 
        date-picker-main-btn
        motion-reduce:rn-transition-none
        `,
        props.class
      )}
      data-type={"date-picker-main-btn"}
      type={"button"}
    >
      {props.children}
    </button>
  );
};
