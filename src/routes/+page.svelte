<script lang="ts">
  import { useModal } from '$lib/components/Modal.svelte';
  import Comment from '$lib/components/comments/Comment.svelte';
  import NewComment from '$lib/components/comments/NewComment.svelte';
  import DeleteCommentConfirmation from '$lib/components/dialogs/DeleteCommentConfirmation.svelte';
  import { slide } from 'svelte/transition';

  export let data;

  const NONE = -1;
  let replyingTo: number = -1;

  const modal = useModal({ closeOnBackdrop: true });

  const onDelete = (event: CustomEvent) => {
    modal.openModal(DeleteCommentConfirmation, {
      onCancel: () => {
        alert('cancel');
        modal.closeModal();
      },
      onConfirm: () => {
        alert('Delete comment ' + event.detail.id);
        modal.closeModal();
      }
    });
  };

  const onUpdate = (event: CustomEvent) => {
    alert('UPDATE ' + event.detail.id);
  };

  const onReply = (event: CustomEvent) => {
    if (event.detail.id === replyingTo) {
      replyingTo = NONE;
    } else {
      replyingTo = event.detail.id;
    }
  };

  const onUpvote = (event: CustomEvent) => {
    alert('UPVOTE ' + event.detail.id);
  };

  const onDownvote = (event: CustomEvent) => {
    alert('DOWNVOTE ' + event.detail.id);
  };

  const onSend = (event: CustomEvent) => {
    if (event.detail.isReply) {
      alert('REPLY ' + event.detail.content);
    } else {
      alert('SEND  ' + event.detail.content);
    }
    replyingTo = NONE;
  };
</script>

<div class="space-y-2">
  {#each data.comments as comment (comment.id)}
    {@const owned = data.user.username === comment.user.username}
    <Comment
      on:delete={onDelete}
      on:update={onUpdate}
      on:reply={onReply}
      on:upvote={onUpvote}
      on:downvote={onDownvote}
      {owned}
      {comment}
    />
    {#if replyingTo === comment.id}
      <div
        transition:slide={{
          duration: 250
        }}
      >
        <NewComment on:send={onSend} user={data.user} isReply />
      </div>
    {/if}
    <div class="ml-[2.5%] pl-[2.5%] space-y-2 border-l-2 border-light-gray">
      {#each comment?.replies || [] as reply}
        {@const owned = data.user.username === reply.user.username}
        <Comment
          on:delete={onDelete}
          on:update={onUpdate}
          on:reply={onReply}
          on:upvote={onUpvote}
          on:downvote={onDownvote}
          {owned}
          comment={reply}
        />
        {#if replyingTo === reply.id}
          <div
            transition:slide={{
              duration: 250
            }}
          >
            <NewComment on:send={onSend} user={data.user} isReply />
          </div>
        {/if}
      {/each}
    </div>
  {/each}

  <NewComment on:send={onSend} user={data.user} />
</div>
