const express = require("express");
const { createPost ,getPosts,updateImgPost,
    updateDescPost,deletedPost} = require("./../controllers/post");
const postRouter = express.Router();



postRouter.post('/newPost',createPost);
postRouter.get('/posts',getPosts);
postRouter.put('/updateimg/:id',updateImgPost);
postRouter.put('/updatedesc/:id',updateDescPost);
postRouter.delete("/delete/:id",  deletedPost);

module.exports = postRouter;