<script lang="ts">
    import { base } from '$app/paths';
  import Button from '$lib/components/Button.svelte';
  import NewCommentSkeleton from '$lib/components/comments/skeletons/NewCommentSkeleton.svelte';
  import type { User } from '$lib/models/user';
  import { createEventDispatcher } from 'svelte';

  export let user: User;
  export let isReply: boolean = false;

  let value = '';

  const dispatch = createEventDispatcher();

  const onSend = () => {
    dispatch('send', { isReply, content: value });
    value = '';
  };
</script>

<NewCommentSkeleton>
  <textarea
    placeholder="Add a comment..."
    bind:value
    slot="edit-area"
    class="w-full outline-moderate-blue outline outline-1 focus:outline-2 p-4 rounded-md resize-none text-grayish-blue placeholder:text-grayish-blue"
    rows="4"
  />
  <img slot="avatar" width="38" src="{base}/{user.image.png}" alt="avatar" />
  <Button
    on:click={onSend}
    slot="action"
    class="uppercase bg-moderate-blue text-white rounded-md min-w-[120px]"
  >
    {#if isReply}
      Reply
    {:else}
      Send
    {/if}
  </Button>
</NewCommentSkeleton>
