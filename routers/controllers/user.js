const userModel = require("./../../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { options } = require("../routes/role");
const SALT = Number(process.env.SALT);
require("dotenv").config();

const Register = async (req, res) => {
  const { email, password, userName, avatar, role } = req.body;
  const lowerEmail = email.toLowerCase();
  console.log(req.token);
  console.log(req);
  const hashPass = await bcrypt.hash(password, SALT);
  const newUser = new userModel({
    email: lowerEmail,
    password: hashPass,
    userName,
    avatar,
    role,
  });
  newUser
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const verifyAccount = async (req, res) => {
  const { id, code } = req.body;

  const user = await userModel.findOne({ _id: id });

  if (user.activeCode == code) {
    userModel
      .findByIdAndUpdate(id, { active: true, activeCode: "" }, { new: true })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("Wrong code..");
  }
};

const login = (req, res) => {
  const { userName, email, password } = req.body;

  userModel
    .findOne({ $or: [{ email }, { userName }] })
    .then(async (result) => {
      if (result) {
        console.log(result);
        if (result.email == email || result.userName == userName) {
          const secret = process.env.SECRETKEY;
          const hashedpass = await bcrypt.compare(password, result.password);
          console.log(hashedpass);
          console.log(secret);
          const payload = {
            role: result.role,
            id: result._id,
            username: result.username,
            email: result.email,
            
          };
          console.log(result);
          option = {
            expiresIn: "6000000m",
          };

          const token = await jwt.sign(payload, secret, option);
          console.log("thistoken",token);
          if (hashedpass) {
            res.status(200).json({ result, token });
          } else {
            res.status(404).json("worng email or password");
          }
        } else {
          res.status(404).json("worng email or password");
        }
      } else {
        res.status(400).json("email does not exist");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getUser = (req, res) => {
  userModel
    .find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deletedUser = (req, res) => {
  // const { id } = req.params;

  console.log(req.token.id);
  userModel
    .findByIdAndUpdate(req.token.id, { isDelete: true })
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
  Register,
  login,
  deletedUser,
  getUser,
  verifyAccount
};
