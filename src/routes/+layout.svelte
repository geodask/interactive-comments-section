<script lang="ts">
  import '../app.postcss';

  import Modal from '$lib/components/Modal.svelte';
</script>

<div class="container mx-auto h-full flex flex-col p-2 max-w-4xl">
  <div class="flex-grow">
    <slot />
  </div>

  <div class="attribution">
    Challenge by
    <a
      href="https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9"
      target="_blank">Frontend Mentor</a
    >. Coded by <a href="https://github.com/geodask">geodask</a>.
  </div>
</div>

<Modal />

<style>
  .attribution {
    font-size: 11px;
    text-align: center;
  }
  .attribution a {
    color: hsl(228, 45%, 44%);
  }
</style>
