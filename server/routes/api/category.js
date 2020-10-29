import express from "express";

import Category from "../../models/category";
import Post from "../../models/post";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categoryFindResult = await Category.find();
    let category = ["전체"];
    console.log(categoryFindResult, "categoryFindResult");

    if (categoryFindResult) {
      console.log("categoryFindResult.length 들어옴");
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

// comment 만들면 populate 같이 하기
// 전체 이외 카테고리시 populate 안쓰는 항목 제거
router.get("/:id", async (req, res) => {
  try {
    const categoryName = req.params.id;
    console.log(categoryName, "categoryName");
    if (categoryName === "전체") {
      const postFindResult = await Post.find().sort({ date: -1 });
      console.log("server postFindResult 전체", postFindResult);
      res.json(postFindResult);
    } else {
      const postFindResult = await Category.findOne()
        .where("categoryName")
        .equals(categoryName)
        .populate(
          "posts",
          "authors bookTitle category comments contents creator date imageUrl page part publisher title views"
        )
        .sort({ date: -1 });

      console.log("postFindResult 이외", postFindResult);
      res.json(postFindResult.posts);
    }
  } catch (e) {
    console.error(e);
  }
});

export default router;
