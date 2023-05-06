import { JSXElement } from "solid-js";

export interface ISelectInputData {
  value: string;
  label: string;
  data?: any;
  isSelected?: boolean;
  labelJSX?: JSXElement;
}

export interface ISelectOnChangeProps {
  value: string;
  matched: boolean;
  label: string;
  data?: any;
  isSelected?: boolean;
  labelJSX?: JSXElement;
  onMount?: boolean;
}

export interface ISelectFormatOnChange {
  value: string;
  option?: ISelectInputData;
  options?: ISelectInputData[];
  onMount?: boolean;
}
