const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Vui long viết bài post!"],
    },

    title: {
      type: String,
      required: [true, "Vui lòng nhập title của bài viết"],
    },

    file: {
      type: String,
      require: [true],
    },
  },
  {
    Timestamp: true,
  }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
