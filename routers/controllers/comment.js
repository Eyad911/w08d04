const commentModel = require("./../../db/models/comment");


const createComment = (req, res) => {
    const { userId,desc} = req.body;
    const newComent = new commentModel({
        desc,
      userId,
    });
    newComent
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };

  

  module.exports = {
    createComment,
  };