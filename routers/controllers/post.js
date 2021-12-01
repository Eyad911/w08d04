const postModel = require("./../../db/models/post");


const createPost = (req, res) => {
    const { img,userId,desc,isDelete ,commentId} = req.body;
    const newPost = new postModel({
        img,
        desc,
      userId,
    });
    newPost
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };
  const getPosts = (req, res) => {
    postModel
    .find({isDelete : false})
    .then((result) => {

         res.status(200).json(result);
      
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const updateImgPost = (req, res) => {
    const { id } = req.params;
    const {img} = req.body
    
    console.log(id);
    postModel
    .findByIdAndUpdate(id,{ img }).exec()
    .then((result) => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const updateDescPost = (req, res) => {
    const { id } = req.params;
    const {desc} = req.body
    
    console.log(id);
    postModel
    .findByIdAndUpdate(id,{$set :{ desc }}).exec()
    .then((result) => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deletedPost = (req, res) => {
    const { id } = req.params;
    
    console.log(id);
    postModel
    .findByIdAndUpdate(id,{ isDelete: true }).exec()
    .then((result) => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};



  module.exports = {
    createPost,
    getPosts,
    updateImgPost,
    updateDescPost,
    deletedPost
  };