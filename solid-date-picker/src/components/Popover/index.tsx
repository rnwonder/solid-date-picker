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
import { cn } from "../../utils";
import { smartDropDownPosition } from "@rnwonder/simple-datejs/utils";

export type IPopOverSJContentPropType =
  | JSX.Element
  | (({ close }: { close: () => void }) => JSX.Element);

export type IPopOverPositionX = "left" | "right" | "center";
export type IPopOverPositionY = "top" | "bottom" | "auto";

export interface PopoverProps {
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
  width?: JSX.CSSProperties["width"];
  contentClassName?: string;
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
    const { left, top } = smartDropDownPosition({
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
    window.addEventListener("resize", onScroll);
    onCleanup(() => {
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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
      return <div data-type="dropdown">{content}</div>;
    }

    return <div data-type="dropdown">{props.content}</div>;
  };

  return (
    <div
      onkeyup={(e) => {
        if (e.key === "Escape" && (props.isShown || shown())) {
          handleClose();
        }
      }}
    >
      <div
        style={{
          ...(props.width && { width: props.width || "100%" }),
        }}
        class={cn(props.className)}
        ref={setElementRef}
        onClick={handleElementClick}
      >
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
                  ? `rn-translate-y-[0rem] rn-opacity-100`
                  : `-rn-translate-y-[1rem] rn-opacity-0`
              }
              rn-duration-350 
              rn-delay-50
              rn-transition-transform
              rn-ease-in-out
              motion-reduce:rn-transition-none
          `}
          ref={setPopoverRef}
        >
          <div
            class={cn(
              `
                ${
                  delayShown()
                    ? `scale-100 rn-opacity-100`
                    : `scale-90 rn-opacity-0`
                }
                rn-duration-350 
                rn-transition-opacity
                rn-ease-in-out
                motion-reduce:rn-transition-none
            `,
              props.contentClassName,
            )}
          >
            {renderContent()}
          </div>
        </div>
      </CustomPortal>
    </div>
  );
};
