<script lang="ts">
  import { teleport, clickOutside, getReferencedElement, cn } from "../utils";
  import { createEventDispatcher } from "svelte";

  let isOpen = false;
  let ref: HTMLElement | null = null;

  const dispatch = createEventDispatcher();

  export let isShown: boolean = false;
  export let reference: HTMLElement | string = "";
  export let className: string = "";
  export let style: string = "";
  export let useRefWidth: boolean = false;
  export let hideDefaultStyle: boolean = false;
  export let ignoreClickOutside: boolean = false;
  export let onClickOutside: ((e: PointerEvent) => void) | undefined =
    undefined;
  export let innerWrapperClass: string = "";

  $: {
    if (!isShown && isOpen) {
      isOpen = false;
      dispatch("close");
    }
  }

  $: {
    if (reference) {
      ref = getReferencedElement(reference);
    }
  }
</script>

{#if isShown}
  <div
    use:teleport={reference}
    use:clickOutside={(e) => {
      if (!isOpen) {
        isOpen = true;
        dispatch("open");
        return;
      }

      if (ignoreClickOutside) return;
      dispatch("clickOutside", { e });
      if (onClickOutside) {
        onClickOutside(e);
        return;
      }
      isOpen = false;
      isShown = false;
      dispatch("close");
    }}
    class={className}
    style="width: {useRefWidth && ref ? ref.clientWidth + 'px' : ''}; {style}"
  >
    <div
      class={cn(
        {
          [`
            rn-absolute
            rn-z-10
            rn-flex
            rn-w-full
            rn-flex-col
            rn-bg-transparent
          `]: !hideDefaultStyle,
        },
        innerWrapperClass,
      )}
    >
      <slot />
    </div>
  </div>
{/if}
