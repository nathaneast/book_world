import express from "express";

import Post from "../../models/post";

const router = express.Router();

// api/post
router.get("/", async (req, res) => {
  const postFindResult = await Post.find();
  console.log("postFindResult", postFindResult);
  res.json(postFindResult);
});

router.post("/", async (req, res) => {
  try {
    console.log("req", req);
    const { title, bookTitle, contents } = req.body;
    const newPost = await Post.create({
      title,
      bookTitle,
      contents,
    });
  } catch (e) {
    console.error(e);
  }
});

export default router;
