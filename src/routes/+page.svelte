<script lang="ts">
  import { useModal } from '$lib/components/Modal.svelte';
  import Comment from '$lib/components/comments/Comment.svelte';
  import DeleteCommentConfirmation from '$lib/components/dialogs/DeleteCommentConfirmation.svelte';

  export let data;

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

  const onEdit = (event: CustomEvent) => {
    alert('EDIT ' + event.detail.id);
  };

  const onReply = (event: CustomEvent) => {
    alert('REPLY TO ' + event.detail.id);
  };

  const onUpvote = (event: CustomEvent) => {
    alert('UPVOTE ' + event.detail.id);
  };

  const onDownvote = (event: CustomEvent) => {
    alert('DOWNVOTE ' + event.detail.id);
  };
</script>

<div class="space-y-2">
  {#each data.comments as comment}
    {@const owned = data.user.username === comment.user.username}
    <Comment
      on:delete={onDelete}
      on:edit={onEdit}
      on:reply={onReply}
      on:upvote={onUpvote}
      on:downvote={onDownvote}
      {owned}
      {comment}
    />
    <div class="ml-[2.5%] pl-[2.5%] space-y-2 border-l-2 border-light-gray">
      {#each comment?.replies || [] as reply}
        {@const owned = data.user.username === reply.user.username}
        <Comment
          on:delete={onDelete}
          on:edit={onEdit}
          on:reply={onReply}
          on:upvote={onUpvote}
          on:downvote={onDownvote}
          {owned}
          comment={reply}
        />
      {/each}
    </div>
  {/each}
</div>
