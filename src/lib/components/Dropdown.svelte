<script lang="ts">
  export let label: string | undefined = undefined;
  export let options: { id: string; value: string }[];
  export let value: string = "";
</script>

{#if label}
  <span class="text-xs opacity-80 pb-1">{label}</span>
{/if}
<select bind:value on:change class="bg-slate-700 rounded-md p-2">
  {#each options as { id, value }}
    <option value={id}>{value}</option>
  {/each}
</select>
