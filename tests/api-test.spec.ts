import { test, expect } from "@playwright/test";
// import { createComment } from "../api/comments.api";
import { createComment } from "../api/comments.api";

test("can send api", async ({ page, request }) => {
  const comment = {
    title: "I am in love with someone.",
    userId: 5,
  };
  const newComment = await createComment(request, comment);

  // Get a newly created comment
  const getComment = await request.get(
    `https://dummyjson.com/posts/` + newComment.id,
  );
  expect(await getComment.json()).toMatchObject({
    message: "Post with id '252' not found",
  });

  // npx playwright test api-test
});
