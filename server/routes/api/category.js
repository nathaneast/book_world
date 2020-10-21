import express from "express";

import Category from "../../models/category";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categoryFindResult = await Category.find();
    let category = ["전체"];
    console.log(categoryFindResult, "categoryFindResult");

    if (categoryFindResult.length) {
      console.log("categoryFindResult.length 들어옴");
      const categoryNames = categoryFindResult.map(
        (category) => category.categoryName
      );
      category = category.concat(categoryNames);
    }
    console.log("응답 전 카테고리", category);
    res.json(category);
  } catch {
    console.error(e);
  }
});

export default router;
