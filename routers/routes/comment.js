const express = require("express");
const {
  createComment,
  getComment,
  updateComment,
  deletedComment,
} = require("./../controllers/comment");
const { authentication } = require("./../middleware/authentication");
const { authorization } = require("./../middleware/authorization");

const commentRouter = express.Router();

commentRouter.post("/newcomment", createComment);
commentRouter.get("/comments", getComment);
//admin
commentRouter.put(
  "/updatecomment/:id",
  authentication,
  authorization,
  updateComment
);
commentRouter.delete(
  "/delcomment/:id",
  authentication,
  authorization,
  deletedComment
);

module.exports = commentRouter;
