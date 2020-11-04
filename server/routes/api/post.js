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

// 무한스크롤 페이지네이션 나중에 구현
// 코멘트 추가되면 넣어야함
// 전체 이외 카테고리 최신순 정렬 구현
router.get("/skip/:categoryName", async (req, res) => {
  try {
    const selectedCategory = req.params.categoryName;
    console.log(selectedCategory, "selectedCategory");

    if (selectedCategory === "전체") {
      const allPosts = await Post.find()
        .sort({ date: -1 })
        .populate("creator", "name email")
        .populate("category", "categoryName");
      res.json(allPosts);
    } else {
      const categoryPosts = await Category.findOne({
        categoryName: selectedCategory,
      })
        .sort({ date: -1 })
        .populate({
          path: "posts",
          populate: [
            {
              path: "creator",
              select: "name email",
            },
            {
              path: "category",
              select: "categoryName",
            },
          ],
        });
      console.log(categoryPosts, "셀렉 이외 result");
      res.json(categoryPosts.posts);
    }
  } catch (e) {
    console.error(e);
  }
});

// router.get("/skip/:skip", async (req, res) => {
//   try {
//     const postCount = await Post.countDocuments();
//     const postFindResult = await Post.find()
//       .skip(Number(req.params.skip))
//       .limit(6)
//       .sort({ date: -1 });
//     const result = { postCount, postFindResult };
//     res.json(result);
//   } catch (e) {
//     console.error(e);
//     res.json({ msg: "더 이상 포스트가 없습니다" });
//   }
// });

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("creator", "email name")
      .populate({ path: "category", select: "categoryName" });
    post.views += 1;
    post.save();
    console.log(post, "post id");
    res.json(post);
  } catch (e) {
    console.error(e);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const {
      title,
      category,
      part,
      page,
      contents,
      bookTitle,
      imageUrl,
      authors,
      publisher,
    } = req.body;

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

    const findCategory = await Category.findOne({
      categoryName: category,
    });
    console.log(findCategory, "findCategory");

    if (findCategory) {
      await Post.findByIdAndUpdate(newPost._id, {
        category: findCategory._id,
      });
      await Category.findByIdAndUpdate(findCategory._id, {
        $push: {
          posts: newPost._id,
        },
      });
    } else {
      const newCategory = await Category.create({
        categoryName: category,
      });
      await Post.findByIdAndUpdate(newPost._id, {
        category: newCategory._id,
      });
      await Category.findByIdAndUpdate(newCategory._id, {
        $push: {
          posts: newPost._id,
        },
      });
    }

    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        posts: newPost._id,
      },
    });

    return res.redirect(`/api/post/${newPost._id}`);
  } catch (e) {
    console.error(e);
  }
});

router.get("/delete/:id", async (req, res) => {
  try {
    const post = await Post.deleteOne({
      _id: req.params.id
    });
    res.json(post);
  } catch (e) {
    console.error(e);
  }
});

export default router;
