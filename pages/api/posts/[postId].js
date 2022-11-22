import data from "../data";

// api/posts/[postId]
export default function handler(req, res) {
  const { postId } = req.query;
  console.log(postId);
  const { Posts } = data;

  if (postId) {
    const post = Posts.find((value) => value.id == postId);
    return res.status(200).json(post);
  }

  return res.status(404).json({ error: "Data not found" });
}
