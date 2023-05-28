<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import CommentSkeleton from '$lib/components/comments/skeletons/CommentSkeleton.svelte';
  import type { Comment } from '$lib/models/comment';
  import { createEventDispatcher } from 'svelte';

  export let comment: Comment;
  export let owned: boolean = false;

  let editMode: boolean = false;

  const dispatch = createEventDispatcher();

  const onClickDelete = (id: number) => dispatch('delete', { id });
  const onClickReply = (id: number) => dispatch('reply', { id });

  const onClickEdit = () => (editMode = true);
  const onClickEditCancel = () => (editMode = false);
  const onClickUpdate = (id: number) => {
    editMode = false;
    dispatch('edit', { id });
  };

  const onClickUpvote = (id: number) => dispatch('upvote', { id });
  const onClickDownVote = (id: number) => dispatch('downvote', { id });
</script>

<CommentSkeleton>
  <div slot="user-tag" class="items-center flex gap-3">
    <img width="38" src={comment.user.image.png} alt="avatar" />
    <span class="text-dark-blue font-bold">{comment.user.username}</span>
    {#if owned}
      <span class="bg-moderate-blue text-xs text-white px-1 rounded-sm">you</span>
    {/if}
    <span class="text-grayish-blue font-normal">{comment.createdAt}</span>
  </div>

  <svelte:fragment slot="content">
    {#if editMode}
      <textarea
        value={comment.content}
        class="w-full outline-moderate-blue outline outline-1 focus:outline-2 p-4 rounded-md resize-none"
        rows="4"
      />
    {:else}
      <p class="text-grayish-blue w-full">
        {#if comment.replyingTo}
          <span class="text-moderate-blue font-medium">@{comment.replyingTo}</span>
        {/if}
        {comment.content}
      </p>
    {/if}
  </svelte:fragment>

  <div
    slot="counter"
    class="text-moderate-blue font-medium bg-very-light-gray flex items-center gap-2 rounded-md sm:flex-col min-w-fit"
  >
    <button on:click={() => onClickUpvote(comment.id)}>
      <img width="12" src="/images/icon-plus.svg" alt="plus" class="m-4" />
    </button>
    <span>{comment.score}</span>

    <button on:click={() => onClickDownVote(comment.id)}>
      <img width="12" src="/images/icon-minus.svg" alt="minus" class="m-4" />
    </button>
  </div>

  <svelte:fragment slot="actions">
    {#if editMode}
      <div class="flex">
        <Button on:click={onClickEditCancel}>Cancel</Button>
        <Button
          on:click={() => onClickUpdate(comment.id)}
          class="bg-moderate-blue text-white uppercase rounded-md">Update</Button
        >
      </div>
    {:else if owned}
      <div class="flex">
        <Button class="text-soft-red" on:click={() => onClickDelete(comment.id)}>
          <img slot="icon" src="/images/icon-delete.svg" alt="delete" />
          Delete
        </Button>
        <Button on:click={onClickEdit}>
          <img slot="icon" src="/images/icon-edit.svg" alt="edit" />
          Edit
        </Button>
      </div>
    {:else}
      <Button on:click={() => onClickReply(comment.id)}>
        <img slot="icon" src="/images/icon-reply.svg" alt="reply" />
        Reply
      </Button>
    {/if}
  </svelte:fragment>
</CommentSkeleton>
