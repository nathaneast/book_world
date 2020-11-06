import express from "express";
import moment from "moment";
import auth from "../../middleware/auth";

import Category from "../../models/category";
import Post from "../../models/post";
import User from "../../models/user";
import Comment from "../../models/comment";

const router = express.Router();

router.get("/", async (req, res) => {
  const postFindResult = await Post.find();
  console.log("postFindResult", postFindResult);
  res.json(postFindResult);
});

// 무한스크롤 페이지네이션 나중에 구현
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
      res.json(categoryPosts);
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

router.delete("/:id", auth, async (req, res) => {
  try {
    await Post.deleteMany({ _id: req.params.id });
    await User.findByIdAndUpdate(req.user.id, {
      $pull: {
        posts: req.params.id,
        // comments: { post_id: req.params.id },
      },
    });
    const CategoryUpdateResult = await Category.findOneAndUpdate(
      { posts: req.params.id },
      { $pull: { posts: req.params.id } },
      { new: true }
    );

    if (CategoryUpdateResult.posts.length === 0) {
      await Category.deleteMany({ _id: CategoryUpdateResult._id });
    }

    return res.json({ success: true });
  } catch (e) {
    console.error(e);
  }
});

router.post("/:id/edit", auth, async (req, res) => {
  try {
    const { bookTitle, title, category, part, page, contents, id } = req.body;

    const beforePost = await Post.findById(id)
    .populate("category", "categoryName");

    let editCategory = await Category.findOne({
      categoryName: category,
    });

    if (!editCategory) {
      editCategory = await Category.create({
        categoryName: category,
      });
    }

    const updatePost = await Post.findByIdAndUpdate(id, {
      bookTitle,
      title,
      category: editCategory._id,
      part,
      page,
      contents,
    }, { new: true })
    .populate("category", "categoryName")
    .populate("creator", "name email");

    if (beforePost.category.categoryName !== updatePost.category.categoryName) {
      const CategoryUpdateResult = await Category.findByIdAndUpdate(
        beforePost.category._id,
        { $pull: { posts: id } },
        { new: true }
      );

      if (CategoryUpdateResult.posts.length === 0) {
        await Category.deleteMany({ _id: CategoryUpdateResult._id });
      }

      await Category.findByIdAndUpdate(editCategory._id, {
        $push: {
          posts: id,
        },
      });
    }

    res.json(updatePost);
  } catch (e) {
    console.error(e);
  }
});

router.get("/:id/comment", async (req, res) => {
  try {
    console.log(req.params.id, 'GET comment')
    const postResult = await Post.findById(req.params.id)
    .populate("comments")

    const result = postResult.comments;
    console.log('해당 글 코멘트 ', result);
    res.json(result);
  } catch (e) {
    console.error(e);
  }
});

router.post("/:id/comment", async (req, res) => {
  try {
    const {
      contents, postId, userId, userName
    } = req.body;
    console.log(req.body, 'POST comment')

    const newComment = await Comment.create({
      contents,
      post: postId,
      creator: userId,
      creatorName: userName,
      date: moment().format("YYYY-MM-DD hh:mm:ss"),
    });

    await Post.findByIdAndUpdate(postId, {
      $push: {
        comments: newComment._id,
      }
    });

    await User.findByIdAndUpdate(userId, {
      $push: {
        comments: {
          post_id: postId,
          comment_id: newComment._id,
        }
      }
    });

    console.log(newComment, "POST comment NewComment");
    res.json(newComment);
  } catch (e) {
    console.error(e);
  }
});

router.get("/:id/myPosts", async (req, res) => {
  try {
    const userPosts = await User.findById(req.params.id)
    .populate("posts", "bookTitle title");
    // .populate({
    //   path: "posts",
    //   populate: [
    //     {
    //       path: "creator",
    //       select: "name email",
    //     },
    //     {
    //       path: "category",
    //       select: "categoryName",
    //     },
    //   ],
    // });

    console.log(userPosts, 'userPosts');
    res.json(userPosts);
  } catch (e) {
    console.error(e);
  }
});

export default router;
