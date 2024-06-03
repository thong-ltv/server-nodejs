const Post = require("../models/post.model.js");

const fs = require("fs");

const createPost = async (req, res) => {
  try {
    const title = req.body.title;
    const content = req.body.content;
    const file = req.file;

    const body = {
      title: title,
      content: content,
      file: file.path,
    };

    const post = await Post.create(body);
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    return res.status(200).json({
      data: posts,
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//deletePost
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByIdAndDelete(id);

    const path = post.file.replace(/\\/g, "/");

    fs.unlink(path, (err) => {
      if (err) throw err;
      console.log("file deleted!");
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(500).json({ message: "Post delete successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createPost,
  getPosts,
  getPost,
  deletePost,
};
