<script lang="ts">
  export let label: string | undefined = undefined;
  export let value: string = "";
  export let placeholder: string = "";
</script>

{#if label}
  <span class="text-xs opacity-80 pb-1">{label}</span>
{/if}
<input {placeholder} on:blur bind:value class="bg-slate-700 rounded-md p-2" />
