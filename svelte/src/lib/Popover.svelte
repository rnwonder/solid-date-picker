<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { cn } from "../utils";
  import Portal from "./Portal.svelte";
  import { upgradedSmartDropDown } from "../utils";
  import type {
    IPopOverPositionX,
    IPopOverPositionY,
  } from "../interface/general";

  export let isShown = false;
  export let width: string | undefined = undefined;
  export let className: string | undefined = undefined;
  export let onClickOutSide:
    | ((e: PointerEvent, handleClose: () => void) => void)
    | undefined = undefined;
  export let useRefWidth: boolean | undefined = undefined;
  export let zIndex: string | undefined = undefined;
  export let contentClassName: string | undefined = undefined;
  export let positionX: IPopOverPositionX | undefined = undefined;
  export let positionY: IPopOverPositionY | undefined = undefined;
  export let onClose = () => {};
  export let onOpen = () => {};

  let triggerElement: HTMLButtonElement | null = null;
  let popoverElement: HTMLDivElement | null = null;
  let top: string | undefined = undefined;
  let left: string | undefined = undefined;
  let delayShown = false;

  onMount(() => {
    document.addEventListener("keydown", handleKeyboardEvent);
    document.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
  });

  onDestroy(() => {
    document.removeEventListener("keydown", handleKeyboardEvent);
    document.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  });

  $: {
    if (isShown) {
      setTimeout(() => {
        delayShown = true;
      }, 100);
    } else {
      delayShown = false;
    }
  }

  $: {
    if (delayShown) {
      positionDropDown({
        y: positionY || "auto",
        x: positionX || "center",
      });
    }
  }

  const handleKeyboardEvent = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  const handleElementClick = () => {
    // if (handleChildrenClick) {
    //   handleChildrenClick(setIsShown || setShown);
    //   return;
    // }
    isShown = !isShown;
  };

  const positionDropDown = (position?: {
    x?: IPopOverPositionX;
    y?: IPopOverPositionY;
  }) => {
    if (!position) {
      position = {
        x: positionX || "center",
        y: positionY || "auto",
      };
    }
    const { left: lt, top: tp } = upgradedSmartDropDown({
      inputRef: triggerElement,
      dropDownRef: popoverElement,
      positionX: position.x,
      positionY: position.y,
    });
    top = tp;
    left = lt;
  };

  const onScroll = () => {
    if (!isShown) return;
    positionDropDown({
      y: positionY || "auto",
      x: positionX || "center",
    });
  };

  export const handleClose = () => {
    isShown = false;
  };
</script>

<div>
  <button
    style="width: {width || '100%'}"
    class={cn(className)}
    bind:this={triggerElement}
    on:click={handleElementClick}
  >
    <slot />
  </button>

  <Portal
    bind:isShown
    reference={triggerElement}
    hideDefaultStyle
    onClickOutside={onClickOutSide
      ? (e) => onClickOutSide?.(e, handleClose)
      : undefined}
    {useRefWidth}
    on:close={onClose}
    on:open={onOpen}
    style="z-index: {zIndex || '1000'}; position :fixed; {top
      ? `top: ${top};`
      : ''} {left ? `left: ${left};` : ''}"
  >
    <div
      class={cn(
        `
          rn-duration-350
          rn-transition-opacity
          rn-ease-in-out
          motion-reduce:rn-transition-none
        `,
        {
          "scale-100 rn-opacity-100": delayShown,
          "scale-90 rn-opacity-0": !delayShown,
        },
        contentClassName,
      )}
      bind:this={popoverElement}
    >
      <slot name="content" />
    </div>
  </Portal>
</div>
