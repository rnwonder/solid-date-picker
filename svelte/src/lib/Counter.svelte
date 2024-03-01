<script lang="ts">
  import Portal from "./Portal.svelte";
  import Popover from "./Popover.svelte";

  let mymodal: any;

  let isShown = false;

  let count: number = 0;
  const increment = () => {
    // count += 1
    // mymodal?.toggle();
    mymodal?.close();
    // isShown = !isShown;
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
    on:open={() => console.log("open")}
    on:close={() => console.log("close")}
  >
    <p>Custom modal content from InnerContent.</p>
  </Portal>

  <Popover bind:this={mymodal}>
    <div slot="content" class="rn-bg-slate-200">
      <h1 class="rn-text-white">Hello</h1>
      <p class="rn-text-white">This is a popover</p>
      <button on:click={mymodal.handleClose} class="rn-text-white">
        button Hello</button
      >
    </div>

    <div>Click me</div>
  </Popover>
</div>
