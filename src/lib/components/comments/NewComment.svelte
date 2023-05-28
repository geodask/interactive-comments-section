<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import NewCommentSkeleton from '$lib/components/comments/skeletons/NewCommentSkeleton.svelte';
  import type { User } from '$lib/models/user';

  export let user: User;
  export let isReply: boolean = false;
</script>

<NewCommentSkeleton>
  <textarea
    slot="edit-area"
    class="w-full outline-moderate-blue outline outline-1 focus:outline-2 p-4 rounded-md resize-none"
    rows="4"
  />
  <img slot="avatar" width="38" src={user.image.png} alt="avatar" />
  <Button slot="action" class="uppercase bg-moderate-blue text-white rounded-md min-w-[120px]">
    {#if isReply}
      Reply
    {:else}
      Send
    {/if}
  </Button>
</NewCommentSkeleton>
