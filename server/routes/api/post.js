import express from "express";
import moment from "moment";
import auth from "../../middleware/auth";

import Category from "../../models/category";
import Post from "../../models/post";
import User from "../../models/user";

const router = express.Router();

// api/posts
router.get("/", async (req, res) => {
  const postFindResult = await Post.find();
  console.log("postFindResult", postFindResult);
  res.json(postFindResult);
});

router.get("/:id", async (req, res) => {
  console.log(req.params, 'req.params')
});

router.post("/", auth, async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { title, category, part, page, contents, bookTitle, imageUrl, authors, publisher } = req.body;
    const newPost = await Post.create({
      creator: req.user.id,
      title,
      part,
      page,
      contents,
      bookTitle,
      imageUrl,
      authors,
      publisher,
      date: moment().format("YYYY-MM-DD hh:mm:ss"),
    });
    console.log(req.user, "req user!!!")

    const findCategory = await Category.findOne({
      categoryName: category,
    });
    console.log(findCategory, 'findCategory');

    if (findCategory) {
      await Post.findByIdAndUpdate(newPost._id, {
        $push: { category: findCategory._id },
      });
      await Category.findByIdAndUpdate(findCategory._id, {
        $push: {
          posts: newPost._id,
        }
      });
    } else {
      const newCategory = await Category.create({
        categoryName: category,
      });
      await Post.findByIdAndUpdate(newPost._id, {
        $push: { category: newCategory._id },
      });
      await Category.findByIdAndUpdate(newCategory._id, {
        $push: {
          posts: newPost._id,
        }
      });
    }

    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        posts: newPost._id,
      }
    });

    return res.redirect(`/api/post/${newPost._id}`);
  } catch (e) {
    console.error(e);
  }
});

export default router;
