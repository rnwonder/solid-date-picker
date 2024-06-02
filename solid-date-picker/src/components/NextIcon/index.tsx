import { Component } from "solid-js";

interface IProps {
  color?: string;
  class?: string;
}

export const NextIcon: Component<IProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill={props.color || "currentColor"}
      viewBox="0 0 256 256"
      data-scope="button"
      data-part="icon"
      class={props.class}
    >
      <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
    </svg>
  );
};
