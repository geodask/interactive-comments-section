<script lang="ts">
  import type { DOMAttributes, HTMLButtonAttributes } from 'svelte/elements';

  interface $$Props extends Omit<HTMLButtonAttributes, keyof DOMAttributes<HTMLButtonElement>> {}
</script>

<button
  on:click
  {...$$restProps}
  class="text-moderate-blue font-medium items-center gap-1 inline-flex justify-center hover:opacity-70 p-3 {$$restProps.class}"
>
  <slot name="icon" />
  <slot />
</button>
