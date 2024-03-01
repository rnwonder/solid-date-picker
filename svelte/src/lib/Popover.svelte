<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import type {} from "svelte";

  type IPopOverSJContentPropType =
    | any
    | (({ close }: { close: () => void }) => any);

  export let isShown = false;
  export let content: IPopOverSJContentPropType;

  onMount(() => {
    document.addEventListener("keydown", handleKeyboardEvent);
  });

  onDestroy(() => {
    document.removeEventListener("keydown", handleKeyboardEvent);
  });

  const handleKeyboardEvent = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  const handleClose = () => {
    console.log("closesss");
    isShown = false;
  };

  const renderContent = () => {
    if (typeof content === "function") {
      return content({ close: handleClose });
    }
    return content;
  };
</script>

<div>
  {#if content}
    <div data-type="dropdown">
      {#if typeof content === "function"}
        {renderContent()}
      {:else}
        {content}
      {/if}
    </div>
  {/if}
</div>
