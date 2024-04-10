import { Component, JSX } from "solid-js";
import { cn } from "../../utils";

interface ButtonProps extends JSX.DOMAttributes<HTMLButtonElement> {
  class?: string;
  setHeight?: boolean;
  disabled?: boolean;
  style?: JSX.CSSProperties;
  selected?: boolean;
  noButtonAnimation?: boolean;
}

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
        date-picker-main-btn 
        rn-min-h-0 
        rn-p-0
        motion-reduce:rn-no-animation
        motion-reduce:rn-transition-none
        `,
        {
          "rn-no-animation": props.noButtonAnimation,
        },
        props.class,
      )}
      data-type={"date-picker-main-btn"}
      type={"button"}
    >
      {props.children}
    </button>
  );
};
