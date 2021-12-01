const mongoose = require("mongoose");

const post = new mongoose.Schema({
  img: { type: String, required: true},
  desc: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  timeStamp: { type: Date, default: new Date() },
  isDelete: {type: Boolean , default:false},
  likeId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
});

module.exports = mongoose.model("Post", post);