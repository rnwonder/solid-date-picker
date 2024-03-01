export function clickOutside(node: HTMLElement, func: (e: any) => void) {
  const onClick = (e: any) => !node.contains(e.target) && func(e);
  document.body.addEventListener("click", onClick);

  return {
    destroy() {
      document.body.removeEventListener("click", onClick);
    },
  };
}

export function teleport(node: HTMLElement, reference?: string | HTMLElement) {
  let teleportContainer = getReferencedElement(reference);
  teleportContainer?.appendChild(node);
  return {
    destroy() {
      node.remove();
    },
  };
}

export function getReferencedElement(
  reference?: string | HTMLElement,
): HTMLElement | null {
  if (!reference) {
    const island = document.getElementById("portal-island");
    if (!island) {
      const newIsland = document.createElement("div");
      newIsland.id = "portal-island";
      document.body.appendChild(newIsland);
      return newIsland;
    }
    return island;
  }

  if (typeof reference === "string") {
    return document.getElementById(reference);
  } else {
    return reference;
  }
}

export const upgradedSmartDropDown = ({
  inputRef,
  dropDownRef,
  positionX,
  positionY,
}: {
  inputRef: any;
  dropDownRef: any;
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
