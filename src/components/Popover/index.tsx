import {
  createEffect,
  createSignal,
  JSX,
  JSXElement,
  onCleanup,
  onMount,
  Setter,
} from "solid-js";
import { CustomPortal } from "../CustomPortal";
import { upgradedSmartDropDown } from "../../utils";

export type IPopOverSJContentPropType =
  | JSX.Element
  | (({ close }: { close: () => void }) => JSX.Element);

export type IPopOverPositionX = "left" | "right" | "center";
export type IPopOverPositionY = "top" | "bottom" | "auto";

interface PopoverProps {
  children: JSXElement;
  content: IPopOverSJContentPropType;
  positionX?: IPopOverPositionX;
  positionY?: IPopOverPositionY;
  useRefWidth?: boolean;
  isShown?: boolean;
  setIsShown?: Setter<boolean>;
  onClickOutside?: (e?: Event, isShown?: Setter<boolean>) => void;
  handleChildrenClick?: (setIsShown?: Setter<boolean>) => void;
  className?: string;
  onOpen?: () => void;
  onClose?: () => void;
  zIndex?: number;
}

export const Popover = (props: PopoverProps) => {
  const [top, setTop] = createSignal<string | undefined>();
  const [left, setLeft] = createSignal<string | undefined>();
  const [popoverRef, setPopoverRef] = createSignal<any>();
  const [elementRef, setElementRef] = createSignal<any>();
  const [shown, setShown] = createSignal(false);

  const [delayShown, setDelayShown] = createSignal(false);

  const positionDropDown = (position?: {
    x?: IPopOverPositionX;
    y?: IPopOverPositionY;
  }) => {
    if (!position) {
      position = {
        x: props.positionX || "center",
        y: props.positionY || "auto",
      };
    }
    const { left, top } = upgradedSmartDropDown({
      inputRef: elementRef,
      dropDownRef: popoverRef,
      positionX: position.x,
      positionY: position.y,
    });

    setLeft(left);
    setTop(top);
  };

  createEffect(() => {
    const onScroll = () => {
      if (!props.isShown && !shown()) return;
      positionDropDown({
        y: props.positionY || "auto",
        x: props.positionX || "center",
      });
    };
    document.addEventListener("scroll", onScroll);
    onCleanup(() => {
      document.removeEventListener("scroll", onScroll);
    });
  });

  createEffect(() => {
    if (props.isShown || shown()) {
      setTimeout(() => {
        setDelayShown(true);
      }, 100);
    } else {
      setDelayShown(false);
    }
  });

  createEffect(() => {
    if (!props.isShown && !shown()) {
      props.onClose?.();
      return;
    }
    props.onOpen?.();
    positionDropDown();
  });

  createEffect(() => {
    if (!delayShown()) return;
    positionDropDown({
      y: props.positionY || "auto",
      x: props.positionX || "center",
    });
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
      props.handleChildrenClick(props.setIsShown || setShown);
      return;
    }
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
      <div ref={setElementRef} onClick={handleElementClick}>
        {props.children}
      </div>

      <CustomPortal
        setIsShown={props.setIsShown || setShown}
        isShown={props.isShown || shown()}
        referenceId={"portal-island"}
        hideDefaultStyle
        onClickOutside={
          props.onClickOutside
            ? (e) => props.onClickOutside?.(e, props.setIsShown || setShown)
            : undefined
        }
        reference={elementRef}
        useRefWidth={props.useRefWidth}
        style={{
          "z-index": props.zIndex || 1000,
          position: "fixed",
          ...(top() && { top: top() }),
          ...(left() && { left: left() }),
        }}
      >
        <div
          class={`
            ${
              delayShown()
                ? `opacity-100 translate-y-[0rem]`
                : `opacity-0 -translate-y-[1rem]`
            }
            duration-350 
            ease-in-out
            delay-50
            transition-transform
            motion-reduce:transition-none
        `}
          ref={setPopoverRef}
        >
          <div
            class={`
            ${
              delayShown()
                ? `opacity-100 scale-100`
                : `opacity-0 scale-90`
            }
            duration-350 
            ease-in-out
            transition-opacity
            motion-reduce:transition-none
        `}
          >
            {renderContent()}
          </div>
        </div>
      </CustomPortal>
    </div>
  );
};
