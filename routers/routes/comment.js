const express = require("express");
const { createComment } = require("./../controllers/comment");


const commentRouter = express.Router();



commentRouter.post('/newcomment',createComment);



module.exports = commentRouter;
