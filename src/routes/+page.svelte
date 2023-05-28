<script lang="ts">
  import Comment from '$lib/components/comments/Comment.svelte';
  import NewComment from '$lib/components/comments/NewComment.svelte';

  export let data;
</script>

<div class="space-y-2">
  {#each data.comments as comment}
    {@const owned = data.user.username === comment.user.username}
    <Comment {owned} {comment} />
    <div class="ml-[2.5%] pl-[2.5%] space-y-2 border-l-2 border-light-gray">
      {#each comment?.replies || [] as reply}
        {@const owned = data.user.username === reply.user.username}
        <Comment {owned} comment={reply} />
      {/each}
    </div>
  {/each}
</div>

<NewComment comment={data.comments[0]} />
