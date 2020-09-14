import express from "express";

import Post from "../../models/post";

const router = express.Router();

// api/posts
router.get("/", async (req, res) => {
  const postFindResult = await Post.find();
  console.log("postFindResult", postFindResult);
  res.json(postFindResult);
});

router.post("/", async (req, res) => {
  try {
    console.log("req", req);
    const { title, bookTitle, contents, part, page } = req.body;
    // imgurl 프론트단에서 보내야함
    const newPost = await Post.create({
      title,
      bookTitle,
      contents,
      part,
      page,
    });
  } catch (e) {
    console.error(e);
  }
});

export default router;
