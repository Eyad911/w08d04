const express = require("express");
const { createComment,getComment,updateComment ,deletedComment} = require("./../controllers/comment");


const commentRouter = express.Router();



commentRouter.post('/newcomment',createComment);
commentRouter.get('/comments',getComment);
commentRouter.put('/updatecomment/:id',updateComment);
commentRouter.delete("/delcomment/:id",  deletedComment);




module.exports = commentRouter;
