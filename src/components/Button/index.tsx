import { Component, JSX } from "solid-js";
import clsx from "clsx";

interface ButtonProps extends JSX.DOMAttributes<HTMLButtonElement> {
  class?: string;
  setHeight?: boolean;
  disabled?: boolean;
}
export const Button: Component<ButtonProps> = (props) => {
  return (
    <button
      {...{ ...props, class: undefined }}
      class={clsx(
        `
        btn 
        btn-ghost 
        ${props.setHeight ? "" : "h-full"} 
        p-0 
        min-h-0 
        motion-reduce:transition-none
        `,
        props.class
      )}
    >
      {props.children}
    </button>
  );
};
