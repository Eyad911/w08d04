const mongoose = require("mongoose");

const user = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userName: { type: String, required: true },
  passwordCode: {type: String},
  activeCode: {type: String},
  active: {type: Boolean,default: false, },
  avatar: { type: String, default: "avatar" },
  isDelete: { type: Boolean, default: false },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" , default: "61a73331f9a6d98fe9606239" },
});

module.exports = mongoose.model("User", user);
