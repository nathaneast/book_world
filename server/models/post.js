import mongoose from "mongoose";
import moment from "moment";

const PostSchema = new mongoose.Schema({
  bookTitle: {
    type: String,
    required: true,
    index: true,
  },
  part: {
    type: String,
  },
  page: {
    type: Number,
  },
  imageUrl: {
    type: String,
    default: "https://source.unsplash.com/random/301x201",
  },
  contents: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: -2,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  date: {
    type: Date,
    default: moment().format("YYYY-MM-DD hh:mm:ss"),
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Post = mongoose.model("post", PostSchema);

export default Post;
