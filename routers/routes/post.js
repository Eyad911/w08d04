const express = require("express");
const {
  createPost,
  getPosts,
  getPostById,
  updateImgPost,
  updateDescPost,
  deletedPostByUser,
  deletedPost,
  getPost
} = require("./../controllers/post");
const { authentication } = require("./../middleware/authentication");
const { authorization } = require("./../middleware/authorization");
const postRouter = express.Router();

postRouter.post("/newPost",authentication, createPost);
// postRouter.post("/like",authentication, like);
postRouter.get("/posts",authentication, getPosts);
postRouter.get("/post/:id", getPostById);
postRouter.get("/post",authentication, getPost);
postRouter.delete("/deletebyuser/:id", deletedPostByUser);
//admin
postRouter.put("/updateimg/:id", authentication, updateImgPost);
postRouter.put(
  "/updatedesc/:id",
  authentication,
  
  updateDescPost
);

postRouter.delete("/delete/:id", authentication, deletedPost);

module.exports = postRouter;
