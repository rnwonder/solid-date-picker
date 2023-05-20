import { Accessor, onCleanup } from "solid-js";
import {DateObjectUnits} from "../interface/date";

export function clickOutsideSJ(el: any, accessor: any) {
  const onClick = (e: any) => !el.contains(e.target) && accessor(e)?.(e);
  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.removeEventListener("click", onClick));
}

export const upgradedSmartDropDown = ({
  inputRef,
  dropDownRef,
  positionX,
  positionY,
}: {
  inputRef: Accessor<any>;
  dropDownRef: Accessor<any>;
  positionY?: "top" | "bottom" | "auto";
  positionX?: "center" | "left" | "right";
}): {
  top?: string;
  left?: string;
} => {
  const inputRect = inputRef()?.getBoundingClientRect();
  const pickerHeight = dropDownRef()?.offsetHeight;
  const pickerWidth = dropDownRef()?.offsetWidth;
  const windowHeight = window.innerHeight;
  const spaceBelow = windowHeight - inputRect?.bottom;
  const spaceAbove = inputRect?.top;
  const spaceLeft = inputRect?.left;
  const spaceRight = window.innerWidth - inputRect?.right;
  const windowWidth = window.innerWidth;

  let top, left;

  const isTopOrBottom = positionY === "top" || positionY === "bottom";

  const topDimension = `${inputRect?.top - pickerHeight - 10}px`;
  const bottomDimension = `${inputRect?.bottom}px`;

  if (positionY === "top") {
    top = topDimension;
  }

  if (positionY === "bottom") {
    top = bottomDimension;
  }

  if (spaceBelow > pickerHeight && !isTopOrBottom) {
    top = bottomDimension;
  } else if (spaceAbove > pickerHeight && !isTopOrBottom) {
    top = topDimension;
  } else if (
    spaceBelow < pickerHeight &&
    positionY === "bottom" &&
    spaceAbove > pickerHeight
  ) {
    top = topDimension;
  }

  if (
    (!(spaceBelow > pickerHeight) &&
      !(spaceAbove > pickerHeight) &&
      !isTopOrBottom) ||
    (positionY === "top" && !(spaceAbove > pickerHeight)) ||
    (positionY === "bottom" &&
      !(spaceBelow > pickerHeight) &&
      !(spaceAbove > pickerHeight))
  ) {
    top = `${0}px`;
  }

  let leftSpace = 0;

  if (positionX === "left") {
    leftSpace = spaceLeft >= pickerWidth ? spaceLeft - pickerWidth : 0;
  } else if (positionX === "right") {
    leftSpace =
      spaceRight >= pickerWidth ? inputRect?.right : windowWidth - pickerWidth;
  } else {
    // center position
    const center = inputRect?.left + inputRect?.width / 2;
    const halfPickerWidth = pickerWidth / 2;
    if (
      center - halfPickerWidth >= 0 &&
      center + halfPickerWidth <= windowWidth
    ) {
      leftSpace = center - halfPickerWidth;
    } else if (center - halfPickerWidth < 0) {
      leftSpace = 0;
    } else {
      leftSpace = windowWidth - pickerWidth;
    }
  }
  left = `${leftSpace}px`;

  return { top, left };
};

