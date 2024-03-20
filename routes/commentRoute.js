const router = require("express").Router();
const Comment = require("../models/commentModel");

router.get("/", async (req, res) => {
  try {
    const postId = req.params.postId;

    if (!postId) {
      return res.status(404).json("Post Tidak Ditemukan");
    }

    const comment = await Comment.find({ postId: postId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      result: comment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
