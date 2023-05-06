/** @jsxImportSource solid-js */
// import clsx from "clsx";
import {
  Accessor,
  Component,
  For,
  Setter,
  createEffect,
  createSignal,
} from "solid-js";
import type {
  ISelectFormatOnChange,
  ISelectInputData,
  ISelectOnChangeProps,
} from "../../interface/input";
import { formatOnChange } from "./extra";
import { createWindowScroll } from "solid-ts-hooks";
import { TextInputGroup, TextInputGroupProps } from "../TextInputGroup";
import { CustomPortal } from "../CustomPortal";
import { Menu } from "../Menu";
import { MenuItem } from "../MenuItem";
import { upgradedSmartDropDown } from "../../../../../package/src/utils";

interface SelectInputProps extends TextInputGroupProps {
  options: ISelectInputData[];
  value: string;
  onChange?: (data: ISelectOnChangeProps) => void;
  onDropdownOpen?: (data: any) => void;
  wrapperClass?: string;
  className?: string;
  dropDownClass?: string;
  maxHeight?: string;
  inputHeight?: number;
  emptyOptionsMessage?: string;
  placeholder?: string;
  errorMessage?: string;
  label?: string;
  selectOptionClass?: string;
  selectMenuClass?: string;
  selectOptionActiveClass?: string;
  containerClass?: string;
  iconWrapperClass?: string;
  useNotInOptionsValue?: boolean;
  maxLength?: number;
  inModal?: boolean;
  isPhosphorIcon?: boolean;
  iconClass?: string;
  inputFocusedClass?: string;
  noRotateIcon?: boolean;
  id?: string;
  onMountFormChange?: boolean;
  removeDropDownMenuOptionBorder?: boolean;
  hideDropDownIcon?: boolean;
}

export const SelectInput: Component<SelectInputProps> = (props) => {
  const [reference, setReference] = createSignal<any>();
  const [dropDownRef, setDropDownRef] = createSignal<any>();
  const [buttonRef, setButtonRef] = createSignal<any>();
  const [isShown, setIsShown] = createSignal(false);
  const [top, setTop] = createSignal<string | undefined>();
  const [left, setLeft] = createSignal<string | undefined>();
  const [textValue, setTextValue] = createSignal("");
  const [optionsData, setOptionsData] = createSignal<ISelectInputData[]>([]);
  const [hasMounted, setHasMounted] = createSignal(false);

  const setScroll = createWindowScroll();

  const positionDropDown = () => {
    if (!reference?.()) return;
    if (isShown()) {
      const { left, top } = upgradedSmartDropDown({
        dropDownRef,
        inputRef: buttonRef,
      });
      setLeft(left);
      setTop(top);
      return;
    }
  };
  setScroll(positionDropDown);

  // Position the dropdown
  createEffect(() => {
    if (!reference?.()) return;
    if (isShown()) {
      positionDropDown();
    }
  });

  // Filter options
  createEffect(() => {
    if (!props.options) return;
    let options = props.options
      .map((option) => ({
        ...option,
        isSelected:
          textValue().toLowerCase()?.length > 3 &&
          option.label.toLowerCase().includes(textValue().toLowerCase()),
      }))
      .sort((a, b) => {
        if (a.isSelected && !b.isSelected) return -1; // If a is selected and b is not, move a up
        if (!a.isSelected && b.isSelected) return 1; // If b is selected and a is not, move b up
        if (a.value === "Others") return 1; // If a is Others, move it down
        if (b.value === "Others") return -1; // If b is Others, move it down
        return 0; // Otherwise, leave them in the same order
      });

    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(textValue().toLowerCase())
    );

    options = !filteredOptions.length
      ? props.useNotInOptionsValue
        ? [
            ...options,
            {
              value: textValue(),
              label: textValue(),
              isSelected: false,
            },
          ]
        : []
      : options;
    setOptionsData(options);
  });

  // Get the label of the value prop from the options prop and set it as the text value
  createEffect(() => {
    if (!props.options) return;
    if (!props.value) return;

    const selectedOption = props.options.find(
      (option) => option.value === props.value
    );

    if (selectedOption?.label === textValue()) {
      return;
    }

    if (!selectedOption && !props.useNotInOptionsValue) {
      props.onChange?.(formatOnChange({ value: "" }));
      return;
    }

    if (!selectedOption && props.useNotInOptionsValue) {
      props.onChange?.(
        formatOnChange({
          value: props.value,
          option: { label: props.value, value: props.value },
        })
      );
      setOptionsData([
        ...props.options,
        {
          value: props.value,
          label: props.value,
          isSelected: false,
        },
      ]);
      setTextValue(props.value);
      return;
    }

    props.onMountFormChange &&
      props.onChange?.(
        formatOnChange({
          value: selectedOption!.value,
          option: selectedOption,
          onMount: true,
        })
      );

    if (hasMounted()) return;
    setTextValue(selectedOption!.label);
    setHasMounted(true);
  });

  return (
    <div class={props.wrapperClass} ref={setReference} id={props.id}>
      {isShown() ? (
        <Input
          {...props}
          ref={setButtonRef}
          isShown={isShown}
          setIsShown={setIsShown}
          isFocused={isShown}
          setTextValue={setTextValue}
          textValue={textValue}
          optionsData={optionsData}
          className={props.className}
        />
      ) : (
        <Input
          {...props}
          isShown={isShown}
          setIsShown={setIsShown}
          onClick={() => {
            if (props.disabled) return;
            setIsShown(true);
            buttonRef()?.focus();
          }}
          isFocused={isShown}
          ref={setButtonRef}
          setTextValue={setTextValue}
          textValue={textValue}
          optionsData={optionsData}
          className={props.className}
        />
      )}

      <CustomPortal
        className={props.dropDownClass}
        isShown={isShown()}
        reference={reference}
        referenceId={props.inModal ? "portal-island" : undefined}
        setIsShown={setIsShown}
        onClose={() => {}}
        useRefWidth
        hideDefaultStyle={props.inModal}
        style={{
          ...(top && { top: top() }),
          ...(left && { left: left() }),
        }}
      >
        <Menu
          menuClass={props.selectMenuClass}
          maxHeight={props.maxHeight || "12.5rem"}
          ref={setDropDownRef}
        >
          <For
            each={optionsData()}
            fallback={
              <MenuItem menuItemClass={props.selectOptionClass} empty>
                {props.emptyOptionsMessage || "No options found"}
              </MenuItem>
            }
          >
            {(option) => (
              <MenuItem
                menuItemClass={props.selectOptionClass}
                onClick={() => {
                  props.onChange?.(formatOnChange({ value: "", option }));
                  setTextValue(option.label);
                  setIsShown(false);
                }}
              >
                {option.labelJSX || option.label}
              </MenuItem>
            )}
          </For>
        </Menu>
      </CustomPortal>
    </div>
  );
};

interface InputProps extends Omit<SelectInputProps, "isFocused"> {
  isShown: Accessor<boolean>;
  setIsShown: Setter<boolean>;
  onClick?: () => void;
  ref?: (el: HTMLButtonElement) => void;
  setTextValue: Setter<string>;
  textValue: Accessor<string>;
  optionsData?: Accessor<ISelectInputData[]>;
  isFocused?: Accessor<boolean>;
}

const Input = (props: InputProps) => {
  return (
    <TextInputGroup
      {...props}
      ref={props.ref}
      value={props.textValue()}
      onClick={props.onClick}
      onInput={(e) => {
        props.setTextValue(e.target.value);
        props.onChange?.(
          formatOnChange({ value: e.target.value, options: props.options })
        );
      }}
      isFocused={props.isFocused?.()}
      onChange={() => {}}
      inputClass={props.className}
      iconClass={props.hideDropDownIcon ? "" : "ph-caret-down"}
      onEnterClick={() => {
        const selected = props
          .optionsData?.()
          .find((option) => option.isSelected);
        let onChangeData: ISelectFormatOnChange = {
          value: "",
        };
        if (selected) {
          onChangeData.option = selected;
          props.setTextValue(selected.label);
        } else {
          onChangeData.value = props.textValue();
          onChangeData.options = props.options;
        }
        props.onChange?.(formatOnChange(onChangeData));
        props.setIsShown(false);
      }}
    />
  );
};
