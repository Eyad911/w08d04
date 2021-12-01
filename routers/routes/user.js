const express = require("express");
const { Register, login ,deletedUser,getUser} = require("./../controllers/user");
const userRouter = express.Router();
userRouter.post("/signUp", Register);
userRouter.post("/login", login);

userRouter.delete("/user/:id", deletedUser);
userRouter.get("/users", getUser);

module.exports = userRouter;
