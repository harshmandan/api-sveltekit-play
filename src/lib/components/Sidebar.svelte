<script lang="ts" context="module">
  export type ImageAspect = "vertical" | "horizontal";
  const imageDimensionOptions: { id: ImageAspect; value: string }[] = [
    {
      id: "vertical",
      value: "Phone",
    },
    {
      id: "horizontal",
      value: "Desktop",
    },
  ];

  export type TextOptions = "inspirational" | "dad-joke" | "custom";

  const textOptions: { id: TextOptions; value: string }[] = [
    {
      id: "inspirational",
      value: "Inspirational Quote",
    },
    {
      id: "dad-joke",
      value: "Dad Joke",
    },
    {
      id: "custom",
      value: "Custom Text",
    },
  ];
</script>

<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "./Button.svelte";

  import Dropdown from "./Dropdown.svelte";
  import Input from "./Input.svelte";

  export let hideSidebar = false;
  export let selectedImageDimension: ImageAspect;
  export let selectedTextOption: TextOptions;

  const dispatch = createEventDispatcher<{
    updateImageQuery: string;
    updateTextOnImage: string | undefined;
  }>();

  function updateQuery() {
    const query = imageSearchQuery.replaceAll(",", "").replaceAll(" ", ",");
    dispatch("updateImageQuery", query);
  }

  let imageSearchQuery = "";
  let customText = "";

  $: dispatch("updateTextOnImage", customText);
</script>

<div
  class="flex overflow-hidden border-l-[1px] border-slate-800 p-4 text-white transition-all duration-200 h-full justify-between flex-col bg-black {hideSidebar
    ? 'w-0'
    : 'w-[300px]'}"
>
  <!-- TODO: Add option to minimize sidebar -->
  <div class="flex flex-col space-y-4">
    <div>LOGO/PAGE</div>
    <Dropdown
      on:change={() => dispatch("updateTextOnImage")}
      bind:value={selectedTextOption}
      label="Select text source"
      options={textOptions}
    />
    {#if selectedTextOption === "custom"}
      <Input bind:value={customText} label="Input label" />
    {/if}

    <span>Image Options</span>

    <Input
      on:blur={updateQuery}
      bind:value={imageSearchQuery}
      label="Search query"
      placeholder="Enter query to filter images"
    />

    <Dropdown
      bind:value={selectedImageDimension}
      label="Image dimensions"
      options={imageDimensionOptions}
    />
  </div>

  <div class="flex flex-col space-y-4">
    {#if selectedTextOption !== "custom"}
      <Button on:click={() => dispatch("updateTextOnImage")}>Randomize</Button>
    {/if}
    <Button on:click={() => console.log("TODO")}>Download</Button>
  </div>
</div>
