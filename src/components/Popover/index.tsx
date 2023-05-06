import { createEffect, createSignal, JSX, onMount, Setter } from "solid-js";
import { upgradedSmartDropDown } from "../../../../../package/src/utils";
import { CustomPortal } from "../CustomPortal";

export type IPopOverSJContentPropType =
  | JSX.Element
  | (({ close }: { close: () => void }) => JSX.Element);

interface PopoverProps {
  children: any;
  content: IPopOverSJContentPropType;
  position?: "left" | "right" | "center";
  useRefWidth?: boolean;
  isShown?: boolean;
  setIsShown?: Setter<boolean>;
  onClickOutside?: () => void;
  handleChildrenClick?: () => void;
  className?: string;
}
export const Popover = (props: PopoverProps) => {
  const [top, setTop] = createSignal<string | undefined>();
  const [left, setLeft] = createSignal<string | undefined>();
  const [popoverRef, setPopoverRef] = createSignal<any>();
  const [elementRef, setElementRef] = createSignal<any>();
  const [shown, setShown] = createSignal(false);

  createEffect(() => {
    if (!props.isShown && !shown()) return;
    const { left, top } = upgradedSmartDropDown({
      inputRef: elementRef,
      dropDownRef: popoverRef,
      position: props.position || "center",
    });

    setLeft(left);
    setTop(top);
  });

  onMount(() => {
    const portalIsland = document.getElementById("portal-island");
    if (portalIsland) return;
    const div = document.createElement("div");
    div.id = "portal-island";
    document.body.appendChild(div);
  });

  const handleElementClick = () => {
    if (props.handleChildrenClick) {
      props.handleChildrenClick();
      return;
    }
    console.log("handleElementClick");
    if (props.setIsShown) {
      props.setIsShown(!props.isShown);
    } else {
      setShown(!shown());
    }
  };

  const handleClose = () => {
    if (props.setIsShown) {
      props.setIsShown(false);
    } else {
      setShown(false);
    }
  };

  const renderContent = () => {
    if (typeof props.content === "function") {
      const content = props.content({ close: handleClose });
      return (
        <div data-type="dropdown" class={props.className}>
          {content}
        </div>
      );
    }

    return (
      <div data-type="dropdown" class={props.className}>
        {props.content}
      </div>
    );
  };

  return (
    <div>
      <div
        ref={setElementRef}
        onClick={handleElementClick}
        style={{
          width: "fit-content",
        }}
      >
        {props.children}
      </div>

      <CustomPortal
        setIsShown={props.setIsShown || setShown}
        isShown={props.isShown || shown()}
        referenceId={"portal-island"}
        hideDefaultStyle
        onClickOutside={props.onClickOutside}
        reference={elementRef}
        useRefWidth={props.useRefWidth}
        style={{
          "z-index": 101,
          position: "fixed",
          ...(top() && { top: top() }),
          ...(left() && { left: left() }),
        }}
      >
        <div ref={setPopoverRef}> {renderContent()}</div>
      </CustomPortal>
    </div>
  );
};
