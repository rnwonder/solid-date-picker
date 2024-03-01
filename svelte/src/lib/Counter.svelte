<script lang="ts">
  import Portal from "./Portal.svelte";
  import Popover from "./Popover.svelte";

  let mymodal: any;

  let isShown = false;

  let count: number = 0;
  const increment = () => {
    // count += 1
    // mymodal?.toggle();
    isShown = !isShown;
  };

  $: {
    console.log("isShown", isShown);
  }

  function handleModalToggleEvent() {
    console.log("modal was toggled");
  }
</script>

<div>
  <button on:click={increment}>
    count is {count}
  </button>

  <Portal
    bind:isShown
    bind:this={mymodal}
    on:open={() => console.log("open")}
    on:close={() => console.log("close")}
  >
    <p>Custom modal content from InnerContent.</p>
  </Portal>

  <Popover content={({close}) => <button slot="content" on:click={close}> button Hello</button>}>Click me</Popover>
</div>
