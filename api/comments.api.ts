import { APIRequestContext, expect } from "@playwright/test";

export async function createComment(
  apiClient: APIRequestContext,
  commentObject: { title: string; userId: number },
) {
  // Create a new comment
  const newComment = await apiClient.post(`https://dummyjson.com/posts/add`, {
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(commentObject),
  });

  // Verify response
  const newCommentJson = await newComment.json();
  expect(newCommentJson).toMatchObject({
    id: 252,
    title: "I am in love with someone.",
    userId: 5,
  });

  return newCommentJson;
}
