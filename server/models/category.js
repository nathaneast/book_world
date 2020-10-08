import mongoose from "mongoose";
import moment from "moment";

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    // default: "미분류",
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});

const Category = mongoose.model("category", CategorySchema);

export default Category;
