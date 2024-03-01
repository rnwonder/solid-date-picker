<script lang="ts">
  import { cn } from '../../utils';
  import type { HTMLButtonAttributes } from 'svelte/elements'

  export let className: string;
  export let setHeight: boolean = true;
  export let disabled: boolean = false;
  export let style: string;
  export let selected: boolean = false;
  export let onClick: () => void;
  let showAnimation = true;

  interface ButtonAttributes extends Partial<HTMLButtonAttributes> {
      class?: string;
      setHeight?: boolean;
      disabled?: boolean;
      style?: string;
      selected?: boolean;
  }

    export let props: ButtonAttributes ;
</script>

<button
        {...props}
  class={cn(`
      rn-btn
      rn-btn-ghost
      rn-p-0
      rn-min-h-0
      date-picker-main-btn
      motion-reduce:rn-transition-none
    `,
    {
      'rn-no-animation': !showAnimation,
      'rn-h-full': !setHeight,
      'dark:hover:rn-bg-black-tie': !selected,
    },
    className
  )}
        style={style}
        data-type={"date-picker-main-btn"}
        type={"button"}
        on:click={onClick}
        {disabled}
>
    <slot></slot>
</button>

<style>
    /* Add your styles here */
</style>
