const express = require("express");
const {
  createPost,
  getPosts,
  getPostById,
  updateImgPost,
  updateDescPost,
  deletedPostByUser,
  deletedPost,
} = require("./../controllers/post");
const { authentication } = require("./../middleware/authentication");
const { authorization } = require("./../middleware/authorization");
const postRouter = express.Router();

postRouter.post("/newPost",authentication, createPost);
postRouter.get("/posts",authentication, getPosts);
postRouter.get("/post/:id", getPostById);
postRouter.delete("/deletebyuser/:id", deletedPostByUser);
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
