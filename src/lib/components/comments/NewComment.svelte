<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import NewCommentSkeleton from '$lib/components/comments/skeletons/NewCommentSkeleton.svelte';
  import type { Comment } from '$lib/models/comment';

  export let comment: Comment;
</script>

<NewCommentSkeleton>
  <textarea slot="edit-area" class="w-full outline-moderate-blue outline outline-1 focus:outline-2 p-4 rounded-md resize-none" value={comment.content} rows="4" />
  <img slot="avatar" width="38" src={comment.user.image.png} alt="avatar" />
  <Button slot="action" class="uppercase bg-moderate-blue text-white rounded-md min-w-[120px]">Send</Button>
</NewCommentSkeleton>
