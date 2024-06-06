const express = require("express");

const {
  createPost,
  getPosts,
  deletePost,
  getPost,
  updatePost,
} = require("../controllers/post.controller");

const multer = require("multer");

//cau hinh luu tru file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/", upload.single("file"), createPost);

router.get("/", getPosts);

router.get("/:id", getPost);

router.delete("/:id", deletePost);

router.put("/:id", updatePost);

module.exports = router;
