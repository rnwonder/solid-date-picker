import { Component, JSX } from "solid-js";
import clsx from "clsx";

interface ButtonProps extends JSX.DOMAttributes<HTMLButtonElement> {
  class?: string;
}
export const Button: Component<ButtonProps> = (props) => {
  return (
    <button
      {...{ ...props, class: undefined }}
      class={clsx(
        `
        btn 
        btn-ghost 
        h-full 
        p-0 
        min-h-0 
        `,
        props.class
      )}
    >
      {props.children}
    </button>
  );
};
