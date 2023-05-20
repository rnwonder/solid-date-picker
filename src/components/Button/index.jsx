import clsx from "clsx";
export const Button = (props) => {
    return (<button {...{ ...props, class: undefined }} class={clsx(`
        btn 
        btn-ghost 
        ${props.setHeight ? "" : "h-full"} 
        p-0 
        min-h-0 
        motion-reduce:transition-none
        `, props.class)}>
      {props.children}
    </button>);
};
