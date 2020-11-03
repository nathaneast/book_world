import express from "express";

import Category from "../../models/category";
import Post from "../../models/post";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categoryFindResult = await Category.find();
    let category = ["전체"];
    console.log(categoryFindResult, "categoryFindResult");

    if (categoryFindResult.length) {
      const categoryNames = categoryFindResult.map(
        (category) => category.categoryName
      );
      category = category.concat(categoryNames);
    }
    console.log("응답 전 카테고리", category);
    res.json(category);
  } catch (e) {
    console.error(e);
  }
});

// 코멘트 추가되면 넣어야함 
router.get("/:categoryName", async (req, res) => {
  try {
    const selectedCategory = req.params.categoryName;
    console.log(selectedCategory, "selectedCategory");

    if (selectedCategory === "전체") {
      const allPosts = await Post.find()
        .sort({ date: -1 })
        .populate("creator", "name email")
        .populate("category", "categoryName")
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

export default router;
