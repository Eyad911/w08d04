const express = require("express");
const {
  Register,
  login,
  deletedUser,
  getUser,
  verifyAccount
} = require("./../controllers/user");
const { authentication } = require("./../middleware/authentication");
const { authorization } = require("./../middleware/authorization");

const userRouter = express.Router();
userRouter.post("/signUp", Register);
userRouter.post("/login", login);
userRouter.post("/verify_account", verifyAccount);
//admin
userRouter.delete("/user/:id", authentication, authorization, deletedUser);
userRouter.get("/users", authentication, authorization, getUser);

module.exports = userRouter;
