import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  authorImage: {
    type: String,
    required: true,
  },
  date: {
    type: date,
    default: Date.now(),
  },
});

const blogModel = mongoose.models.blog || mongoose.model("blog", Schema);

export default blogModel;
