<script lang="ts">
  import { page } from '$app/stores';
  import type { Comment } from '$lib/models/comment';
  import Button from '../Button.svelte';
  import CommentSkeleton from './CommentSkeleton.svelte';

  export let comment: Comment;
  export let owned: boolean = false;
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

  <p slot="content" class="text-grayish-blue">
    {#if comment.replyingTo}
      <span class="text-moderate-blue font-medium">@{comment.replyingTo}</span>
    {/if}
    {comment.content}
  </p>

  <div slot="counter" class="text-moderate-blue font-medium bg-very-light-gray flex items-center gap-2 rounded-md sm:flex-col min-w-fit">
    <button class="">
      <img width="12" src="/images/icon-plus.svg" alt="plus" class="m-4" />
    </button>
    <span>{comment.score}</span>

    <button class="">
      <img width="12" src="/images/icon-minus.svg" alt="minus" class="m-4" />
    </button>
  </div>

  <svelte:fragment slot="actions">
    {#if owned}
      <div class="flex">
        <Button class="text-soft-red">
          <img slot="icon" src="/images/icon-delete.svg" alt="delete" />
          Delete
        </Button>
        <Button>
          <img slot="icon" src="/images/icon-edit.svg" alt="edit" />
          Edit
        </Button>
      </div>
    {:else}
      <Button>
        <img slot="icon" src="/images/icon-reply.svg" alt="reply" />
        Reply
      </Button>
    {/if}
  </svelte:fragment>
</CommentSkeleton>
