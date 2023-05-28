<script lang="ts">
  import Button from '$lib/components/Button.svelte';

  export let onCancel: () => void;
  export let onConfirm: () => void;
</script>

<h1 class="text-2xl text-dark-blue font-medium">Delete comment</h1>
<p class="text-grayish-blue">
  Are you sure you want to delete this comment? This will remove the comment and can't be undone
</p>

<div class="flex gap-4">
  <Button on:click={onCancel} class="grow uppercase text-white bg-grayish-blue rounded-md"
    >No, cancel</Button
  >
  <Button on:click={onConfirm} class="grow uppercase text-white bg-soft-red rounded-md"
    >Yes, delete</Button
  >
</div>
