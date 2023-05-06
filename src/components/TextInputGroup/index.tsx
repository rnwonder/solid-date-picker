/** @jsxImportSource solid-js */

import {Component, Setter, createSignal, createEffect, Show, Accessor} from "solid-js";
import style from "./styles.module.scss";
import { styled } from "solid-styled-components";
import InsideInputLabel from "../InsideInputLabel";
import {TextInput, TextInputProps} from "../TextInput";
import { InputHelperText } from "../InputHelperText";
import { InputIcon } from "../InputIcon";

export interface TextInputGroupProps extends TextInputProps{
  ref?: any;
  value: string;
  setValue?: Setter<string>;

  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  icon?: string;

  disabled?: boolean;
  hasErrorWithoutText?: boolean;

  containerClass?: string;
  wrapperClass?: string;
  inputClass?: string;
  labelClass?: string;
  iconClass?: string;
  iconWrapperClass?: string;
  helperTextClass?: string;
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

  inputId?: string;
  helperTextId?: string;

  setValueExternally?: boolean;
  isIconBefore?: boolean;
  iconBefore?: string;
  iconBeforeWrapperClass?: string;
  iconBeforeClass?: string;
  onBeforeIconClick?: () => void;
  isPhosphorIcon?: boolean;
  isFocused?: boolean;
  isDashboard?: boolean;
  removeBorder?: boolean;
  search?: boolean;
  isFilter?: boolean;
  onEnterClick?: (e?: any) => void;

  removeIcon?: boolean;
}

const StyledTextInput = styled("div")`
  width: 100%;
`;

const StyledInputArea = styled("div")`
  position: relative;
  width: 100%;
  display: flex;

  &:hover {
    input::placeholder {
      opacity: 0;
    }
    label {
      opacity: 1;
    }
    label:empty + .input {
      &::placeholder {
        opacity: 1;
      }
    }
  }
`;

export const TextInputGroup: Component<TextInputGroupProps> = (props) => {
  const [formActive, setFormActive] = createSignal(false);
  let labelRef: any = null;
  return (
    <StyledTextInput class={props.containerClass}>
      <StyledInputArea class={props.wrapperClass} onClick={props.onClick}>
        <InsideInputLabel
          value={props.value}
          label={props.label}
          search={props.search}
          isIconBefore={props.isIconBefore}
          placeholder={props.placeholder}
          errorMessage={props.errorMessage}
          formActive={formActive() || props.isFocused || !!props.value}
          className={props.labelClass}
          ref={labelRef}
          onClick={() => {
            if (formActive() || !labelRef) return;
            labelRef.parentElement.querySelector("input").focus();
            setFormActive(true);
          }}
        >
          {props.label || ""}
        </InsideInputLabel>

        {(props.isIconBefore || props.search) && (
          <Icon {...props} isBefore formActive={formActive} />
        )}

        <TextInput
          {...props}
          onClick={() => {
            setFormActive(true);
          }}
          onBlur={() => {
            setFormActive(false);
          }}
          onChange={(e: any) => {
            props.onChange?.(e);
            if (props.setValueExternally) return;
            props.setValue?.(e.target.value);
          }}
          onInput={(e: any) => {
            props.onInput?.(e);
            if (props.setValueExternally) return;
            props.setValue?.(e.target.value);
          }}
          onKeyDown={(e) => {
            props.onKeyDown?.(e);
            if (e.key === "Enter" && props.onEnterClick) {
              props.onEnterClick(e);
            }
          }}
          isFocused={props.isFocused || formActive()}
        />

        <Show when={!props.removeIcon} keyed>
          <Icon {...props} formActive={formActive} />
        </Show>
      </StyledInputArea>

      <InputHelperText
        error={!!props.errorMessage || props.hasErrorWithoutText}
        className={props.helperTextClass}
        id={props.helperTextId}
      >
        {props.errorMessage || props.helperText}
      </InputHelperText>
    </StyledTextInput>
  );
};

const Icon = (
  props: TextInputGroupProps & {
    isBefore?: boolean;
    formActive: Accessor<boolean>;
  }
) => {
  const [isSearch, setIsSearch] = createSignal(false);
  const [isBeforeNotSearch, setIsBeforeNotSearch] = createSignal(false);

  createEffect(() => {
    setIsSearch((props.search || false) && (props.isBefore || false));
    setIsBeforeNotSearch(
      (props.isIconBefore || false) && !(props.search || false)
    );
  });
  return (
    <InputIcon
      formActive={props.formActive}
      isBefore={props.isBefore}
      disabled={props.disabled}
      search={isSearch()}
      error={props.hasErrorWithoutText || !!props.errorMessage}
      wrapperClassName={
        props.isBefore ? props.iconBeforeWrapperClass : props.iconWrapperClass
      }
      iconClass={`${
        props.iconBeforeClass
          ? props.iconBeforeClass
          : props.iconClass
          ? props.iconClass
          : isSearch()
          ? "ph-magnifying-glass"
          : props.errorMessage
          ? "ph-warning-circle"
          : ""
      }`}
      onClick={props.onIconClick}
    />
  );
};
