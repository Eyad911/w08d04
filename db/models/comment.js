const mongoose = require("mongoose");

const comment = new mongoose.Schema({
  desc: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  isDelete: { type: Boolean, default: false },
  timeStamp: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Comment", comment);
