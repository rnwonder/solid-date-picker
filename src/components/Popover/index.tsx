import {
  createEffect,
  createSignal,
  JSX,
  JSXElement,
  onCleanup,
  onMount,
  Setter,
} from "solid-js";
import { upgradedSmartDropDown } from "../../../../../package/src/utils";
import { CustomPortal } from "../CustomPortal";
import { styled } from "solid-styled-components";

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
  handleChildrenClick?: () => void;
  className?: string;
  onOpen?: () => void;
  onClose?: () => void;
}

const StyledContent = styled("div")<{
  isShown: boolean;
}>`
  opacity: ${(props) => (props.isShown ? 1 : 0)};
  transform: ${(props) =>
    props.isShown
      ? "translateY(0rem) scale(1)"
      : "translateY(-1rem) scale(0.9)"};
  transition: opacity 0.35s ease-in-out, transform 0.35s 0.15s ease-in-out;
`;

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
          "z-index": 10000,
          position: "fixed",
          ...(top() && { top: top() }),
          ...(left() && { left: left() }),
        }}
      >
        <StyledContent isShown={delayShown()} ref={setPopoverRef}>
          {renderContent()}
        </StyledContent>
      </CustomPortal>
    </div>
  );
};
