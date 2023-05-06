import { Component, Setter } from "solid-js";
import { styled } from "solid-styled-components";

export interface TextInputProps {
  ref?: any;
  value?: string;
  setValue?: Setter<string>;

  label?: string;
  placeholder?: string;
  errorMessage?: string;

  disabled?: boolean;
  error?: boolean;

  inputClass?: string;
  inputFocusedClass?: string;

  type?: HTMLInputElement["type"];
  inputMode?: HTMLInputElement["inputMode"];
  autoComplete?: HTMLInputElement["autocomplete"];
  pattern?: HTMLInputElement["pattern"];
  maxLength?: HTMLInputElement["maxLength"];
  required?: boolean;
  minLength?: HTMLInputElement["min"];
  readOnly?: boolean;

  onChange?: (e: any) => void;
  onInput?: (e: any) => void;
  onIconClick?: () => void;
  onClick?: () => void;
  onPaste?: (e: any) => void;
  onFocus?: (e: any) => void;
  onKeyDown?: (e: any) => void;
  onWheel?: (e: any) => void;
  onBeforeInput?: (e: any) => void;
  onBlur?: (e: any) => void;

  inputId?: string;

  isIconBefore?: boolean;
  isFocused?: boolean;
  removeBorder?: boolean;
  search?: boolean;

  removeIcon?: boolean;

  height?: string;
  cursor?: string;
  width?: string;
  fontSize?: string;
  textAlign?: string;
  padding?: string;
  backgroundColor?: string;
}

const StyledInput = styled("input")<TextInputProps>`
  position: relative;
  border: ${({ removeBorder }) => (removeBorder ? "none" : "1px solid")};
  border-color: ${({ error, errorMessage, value, isFocused }) => {
    if (error || errorMessage) return "var(--red-400)";
    if (value || isFocused) return "var(--primary-400)";
    return "var(--gray-600-400)";
  }};
  border-radius: 6px;
  padding-left: ${({ search, isIconBefore }) =>
    search || isIconBefore ? "2.5rem" : "1rem"};
  padding-top: ${({ label }) => (label ? "0.5rem" : "0")};
  padding-right: 1.375rem;
  color: ${({ value, isFocused }) => {
    if (value || isFocused) return "var(--event-button-gray-1000)";
    return "var(--gray-600-400)";
  }};
  outline: none;
  font-family: inherit;
  background-color: ${({ backgroundColor }) =>
    backgroundColor || "var(--dashboard-background-color)"};
  letter-spacing: 0.02em;
  height: ${(props) => props.height || "2rem"};
  cursor: ${(props) => props.cursor || "auto"};
  width: ${(props) => props.width || "100%"};
  font-size: ${(props) => props.fontSize || "1rem"};
  text-align: ${(props) => props.textAlign || "start"};
  ${(props) => props.padding && `padding: ${props.padding};`}

  &:hover {
    border-color: var(--gray-1000-100);
  }

  &:focus,
  &:active {
    border-color: var(--primary-400);
    color: var(--event-button-gray-1000);
  }

  &:disabled {
    border-color: var(--gray-600);
    background-color: var(--gray-100-800);
    color: var(--gray-1000-100);
  }

  &::placeholder {
    transition: opacity 0.15s ease-out;
    color: var(--input-placeholder-color);
  }

  &[type="number"] {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    -moz-appearance: textfield;
  }
`;
export const TextInput: Component<TextInputProps> = (props) => {
  return (
    <StyledInput
      {...props}
      type={props.type || "text"}
      inputMode={(props.inputMode as any) || undefined}
      autocomplete={props.autoComplete || undefined}
      id={props.inputId}
      class={props.inputClass}
      aria-label={props.label}
      aria-errormessage={props.errorMessage}
      aria-invalid={!!props.errorMessage}
      aria-required={props.required}
      aria-disabled={props.disabled}
      aria-readonly={props.readOnly}
      aria-autocomplete={props.autoComplete ? "list" : undefined}
      aria-placeholder={props.placeholder}
      aria-valuemax={props.maxLength}
      aria-valuemin={props.minLength}
      aria-valuenow={props.value}
      aria-valuetext={props.value}
      role={props.search ? "searchbox" : "textbox"}
    ></StyledInput>
  );
};
