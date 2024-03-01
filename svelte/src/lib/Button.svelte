<script lang="ts">
  import { cn } from "../utils";
  import type { HTMLButtonAttributes } from "svelte/elements";

  export let className = "";
  export let setHeight = false;
  export let disabled = false;
  export let style = "";
  export let selected = false;
  export let onClick = () => {};

  let showAnimation = true;

  interface $$Props extends HTMLButtonAttributes {
    className?: string;
    setHeight?: boolean;
    disabled?: boolean;
    style?: string;
    selected?: boolean;
    onClick?: () => void;
    showAnimation?: boolean;
  }
</script>

<button
  {...$$restProps}
  class={cn(
    `
        rn-btn
        rn-btn-ghost
        rn-p-0
        rn-min-h-0
        date-picker-main-btn
        motion-reduce:rn-transition-none
      `,
    {
      "rn-no-animation": !showAnimation,
      "rn-h-full": !setHeight,
      "dark:hover:rn-bg-black-tie": !selected,
    },
    className,
  )}
  {style}
  data-type={"date-picker-main-btn"}
  type={"button"}
  on:click={onClick}
  {disabled}
>
  <slot />
</button>

<style>
  /* Add your styles here */
</style>
