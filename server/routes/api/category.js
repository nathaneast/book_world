import express from "express";

import Category from "../../models/category";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const category = ["전체"];
    const categoryFindResult = await Category.find();
    console.log(categoryFindResult, 'categoryFindResult');

    console.log(categoryFindResult.length)
    if (categoryFindResult.length) {
      console.log('categoryFindResult.length 들어옴');
      const categoris = categoryFindResult.map((category) => category.categoryName );
      category.concat(categoris);
      console.log('카테고리즈', categoris)
      console.log('합친 후  카테고리', category)
    }
    console.log('응답 전 카테고리', category)
    res.json(category);
  } catch {
    console.error(e);
  }
});

export default router;

