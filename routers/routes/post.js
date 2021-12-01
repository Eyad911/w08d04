const express = require("express");
const {
  createPost,
  getPosts,
  updateImgPost,
  updateDescPost,
  deletedPost,
} = require("./../controllers/post");
const { authentication } = require("./../middleware/authentication");
const { authorization } = require("./../middleware/authorization");
const postRouter = express.Router();

postRouter.post("/newPost", createPost);
postRouter.get("/posts", getPosts);
//admin
postRouter.put("/updateimg/:id", authentication, authorization, updateImgPost);
postRouter.put(
  "/updatedesc/:id",
  authentication,
  authorization,
  updateDescPost
);
postRouter.delete("/delete/:id", authentication, authorization, deletedPost);

module.exports = postRouter;
