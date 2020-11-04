import express from "express";

// import Category from "../../models/category";
import Post from "../../models/post";

const router = express.Router();

router.get("/:searchTerm", async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    const searchResult = await Post.find({
      bookTitle: searchTerm
    });
    console.log(searchTerm, 'searchTerm')
    console.log(searchResult,'searchResult');
  } catch (e) {
    console.error(e);
  }
});


export default router;
