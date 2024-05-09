const express = require("express");
const {
  createPost,
  getPosts,
  deletePost,
  getPost,
} = require("../controllers/post.controller");

const router = express.Router();

router.post("/", createPost);

router.get("/", getPosts);

router.get("/:id", getPost);

router.delete("/:id", deletePost);

module.exports = router;
