const router = require("express").Router();
const Post = require("../models/postModel");

router.get("/", async (req, res) => {
  const posts = await Post.find();

  res.status(200).json({
    success: true,
    result: posts,
  });
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);

    if (!id) return res.status(404).json("Postingan Tidak Ditemukan");

    return res.status(200).json({
      success: true,
      result: post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/create", async (req, res) => {
  const { caption, image, replies, likes } = req.body;
  const username = req.user.username;

  if (!caption || !username || !image) {
    throw new Error("All fields are required");
  }

  await Post.create({
    caption,
    username,
    image,
    replies,
    likes,
  });

  res.status(201).json({
    success: true,
    message: "Post created successfully",
  });
});

module.exports = router;
