import type { Setter } from "solid-js";
import type {
  ISelectFormatOnChange,
  ISelectOnChangeProps,
} from "../../../../interface/input";

export const smartDropdown = ({
  buttonRef,
  dropDownRef,
  reference,
  setTop,
}: {
  reference: any;
  buttonRef: any;
  dropDownRef: any;
  setTop: Setter<string | undefined>;
}) => {
  const windowHeight =
    Math.max(document.documentElement.clientHeight, window.innerHeight || 0) +
    Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop,
      window.pageYOffset || 0
    );

  const buttonHeight = buttonRef.getBoundingClientRect().height;
  const dropDownHeight = dropDownRef()
    ? dropDownRef()!.getBoundingClientRect().height
    : undefined;
  const buttonPosition =
    reference()!.getBoundingClientRect().top + window.pageYOffset;

  const inputMenu = buttonPosition + buttonHeight + dropDownHeight;

  if (inputMenu > windowHeight) {
    setTop(buttonPosition - (dropDownHeight + 10) + "px");
  } else {
    setTop(undefined);
  }
};

export const formatOnChange = ({
  value,
  option,
  options,
  onMount,
}: ISelectFormatOnChange): ISelectOnChangeProps => {
  if (!value && !option) return { value: "", matched: false, label: "" };
  if (!options && !option) return { value, matched: false, label: value };
  if (!option)
    option = options?.find(
      (option) => option.label.toLowerCase() === value.toLowerCase()
    );
  return {
    value: option?.value || value,
    matched: !!option,
    label: option?.label || value,
    isSelected: option?.isSelected,
    labelJSX: option?.labelJSX,
    data: option?.data,
    onMount,
  };
};
