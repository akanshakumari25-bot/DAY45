
import { useMutation, useQueryClient } from "@tanstack/react-query";

function LikeButton({ postId, initialLikeCount }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/posts/${postId}/like`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to like post");
      }

      return response.json();
    },

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["posts", postId],
      });

      const previousPost = queryClient.getQueryData([
        "posts",
        postId,
      ]);

      queryClient.setQueryData(["posts", postId], (oldPost) => {
        if (!oldPost) {
          return {
            id: postId,
            likes: initialLikeCount + 1,
          };
        }

        return {
          ...oldPost,
          likes: oldPost.likes + 1,
        };
      });

      return { previousPost };
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData(
        ["posts", postId],
        context.previousPost
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", postId],
      });
    },
  });

  const post = queryClient.getQueryData(["posts", postId]);

  const likeCount = post?.likes ?? initialLikeCount;

  return (
    <button
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending}
    >
      ❤️ Like ({likeCount})
    </button>
  );
}

export default LikeButton;