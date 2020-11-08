import express from "express";

// import Category from "../../models/category";
import Post from "../../models/post";

const router = express.Router();

router.get("/:searchTerm", async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    const searchResult = await Post.find({
      bookTitle: {
        $regex: searchTerm,
        $options: "i",
      },
    })
    .sort({ date: -1 })
    .populate("creator", "name email")
    .populate("category", "categoryName");

    const response = {
      searchTerm,
      searchResult,
    }
    res.json(response);
  } catch (e) {
    console.error(e);
  }
});


export default router;
