<script lang="ts">
  import Sidebar, {
    type ImageAspect,
    type TextOptions,
  } from "$lib/components/Sidebar.svelte";
  import { getDadJoke, getInspirationalQuote } from "$lib/services/quote";
  import { onMount } from "svelte";

  let selectedImageDimension: ImageAspect = "vertical";
  let selectedTextOption: TextOptions = "dad-joke";

  let textOnImage = "";
  let hideSidebar = false;

  const imgHost = "https://source.unsplash.com/random";
  let imgSrc = imgHost;

  async function updateTextOnImage(customText?: string) {
    try {
      switch (selectedTextOption) {
        case "inspirational":
          textOnImage = await getInspirationalQuote();
          break;
        case "dad-joke":
          textOnImage = await getDadJoke();
          break;
        case "custom":
          textOnImage = customText || "";
          break;
      }
    } catch (e) {
      console.log("error", { e });
    }
  }
  onMount(() => updateTextOnImage());
</script>

<div class="flex bg-gray-500 h-screen w-full">
  <div class="grow relative flex items-center h-full w-full justify-center">
    <div
      style="background-image: url('{imgSrc}')"
      class="relative duration-500 shadow-2xl bg-cover bg-center ease-in-out transition-all {selectedImageDimension ===
      'vertical'
        ? 'h-5/6 aspect-[9/16] rounded-xl'
        : 'h-full w-full'} "
    >
      <div
        class="absolute inset-0 w-full h-full flex items-center justify-center  "
      >
        <span
          class="text-white text-center capitalize font-bold {selectedImageDimension ===
          'vertical'
            ? 'text-lg px-8 py-2'
            : 'text-4xl'}"
        >
          {textOnImage}
        </span>
      </div>
    </div>
    <button
      on:click={() => (hideSidebar = !hideSidebar)}
      class="bg-black h-8 w-8 flex items-center justify-center pl-1 rounded-l-full absolute bottom-4 right-0 "
    >
      <span class="transition-transform {hideSidebar ? 'rotate-180' : ''}">
        ⏩
      </span>
    </button>
  </div>
  <Sidebar
    {hideSidebar}
    bind:selectedImageDimension
    bind:selectedTextOption
    on:updateTextOnImage={({ detail }) => updateTextOnImage(detail)}
    on:updateImageQuery={({ detail }) => (imgSrc = `${imgHost}?${detail}`)}
  />
</div>
