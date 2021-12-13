const express = require("express");

const popupTools = require("popup-tools");
const passport = require("passport");
require("./../../Config/passport")
const {
  Register,
  login,
  deletedUser,
  getUser,
  verifyAccount,
  checkEmail,
  resetPassword
} = require("./../controllers/user");
const { authentication } = require("./../middleware/authentication");
const { authorization } = require("./../middleware/authorization");

const userRouter = express.Router();
userRouter.post("/signUp", Register);
userRouter.post("/login", login);
userRouter.post("/verify_account", verifyAccount);
userRouter.post("/email_check", checkEmail);
userRouter.post("/reset_pass", resetPassword);

userRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    console.log(req);
    res.end(popupTools.popupResponse(req.user));
  }
);

//admin
userRouter.delete("/user/:id", authentication, authorization, deletedUser);
userRouter.get("/users", authentication, authorization, getUser);

module.exports = userRouter;
