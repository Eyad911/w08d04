const commentModel = require("./../../db/models/comment");

const createComment = (req, res) => {
  const { userId, desc,postId } = req.body;
  const newComent = new commentModel({
    desc,
    userId,
    postId
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

const getComment = (req, res) => {
  commentModel
    .find({ isDelete: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const updateComment = (req, res) => {
  const { id } = req.params;
  const { desc } = req.body;

  console.log(id);
  commentModel
    .findByIdAndUpdate(id, { $set: { desc } }, { new: true })
    .exec() // (id, {dec}) <==طريقة ثانيه
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deletedComment = (req, res) => {
  const { id } = req.params;

  console.log(id);
  commentModel
    .findByIdAndUpdate(id, { isDelete: true }, { new: true })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  createComment,
  getComment,
  updateComment,
  deletedComment,
};
