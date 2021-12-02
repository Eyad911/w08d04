const express = require("express");
const { addLike, deleteLike } = require("./../controller/like");
const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");
const likeRouter = express.Router();



likeRouter.post("/addLike", authentication, addLike);
likeRouter.delete("/deleteLike/:id", authentication, deleteLike);

module.exports = likeRouter;
