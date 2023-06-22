const mongoose = require("mongoose");

const Comment = new mongoose.Schema({
  comment: String,
  created_at: Date,
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  image: [
    {
      url: String,
    },
  ],
});

module.exports = Comment;
