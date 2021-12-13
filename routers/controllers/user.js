const userModel = require("./../../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
// const { options } = require("../routes/role");
const SALT = Number(process.env.SALT);
require("dotenv").config();



const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const Register = async (req, res) => {
  const { email, password, userName, avatar, role } = req.body;
  const lowerEmail = email.toLowerCase();
  console.log(req.token);
  console.log(req);
  const hashPass = await bcrypt.hash(password, SALT);
  let activeCode = "";
  const characters = "0123456789";
  for (let i = 0; i < 4; i++) {
    activeCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  const newUser = new userModel({
    email: lowerEmail,
    password: hashPass,
    passwordCode: "",
    userName,
    avatar,
    activeCode,
    role,
  });
  newUser
    .save()
    .then((result) => {
      transport
          .sendMail({
            from: process.env.EMAIL,
            to: lowerEmail,
            subject: "Please confirm your account",
            html: `<h1>Email Confirmation</h1>
              <h2>Hello ${result.userName}</h2>
              <h4>CODE: ${activeCode}</h4>
              <p>Thank you for registering. Please confirm your email by entring the code on the following link</p>
              <a href=https://social-media-project-frontend.herokuapp.com/verify_account/${result._id}> Click here</a>
              </div>`,
          })
          .catch((err) => console.log(err));
        res.status(201).json(result);
      })
    .catch((err) => {
      res.status(400).json(err);
    });
};



const verifyAccount = async (req, res) => {
  const { id, code } = req.body;

  const user = await userModel.findOne({ _id: id });
console.log(user);
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


const checkEmail = async (req, res) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email });

  if (user) {
    let passwordCode = "";
    const characters = "0123456789";
    for (let i = 0; i < 4; i++) {
      passwordCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    userModel
      .findByIdAndUpdate(user._id, { passwordCode }, { new: true })
      .then((result) => {
        transport
          .sendMail({
            from: process.env.EMAIL,
            to: result.email,
            subject: "Reset Your Password",
            html: `<h1>Reset Your Password</h1>
              <h2>Hello ${result.username}</h2>
              <h4>CODE: ${passwordCode}</h4>
              <p>Please enter the code on the following link and reset your password</p>
              <a href=https://social-media-project-frontend.herokuapp.com/reset_password/${result._id}> Click here</a>
              </div>`,
          })
          .catch((err) => console.log(err));
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("No user with this email");
  }
};

const resetPassword = async (req, res) => {
  const { id, code, password } = req.body;

  const user = await userModel.findOne({ _id: id });

  if (user.passwordCode == code) {
    const hashedPassword = await bcrypt.hash(password, SALT);

    userModel
      .findByIdAndUpdate(
        id,
        { password: hashedPassword, passwordCode: "" },
        { new: true }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("Wrong Code...");
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
            if (result.active == true){
            res.status(200).json({ result, token });
          }else{res.status(404).json("Active your Account");}} else {
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
  verifyAccount,
  checkEmail,
  resetPassword
};
