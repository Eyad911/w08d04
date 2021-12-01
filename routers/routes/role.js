const express = require("express");
const { create, getRoles } = require("./../controllers/role");
const roleRouter = express.Router();
const { authentication } = require("./../middleware/authentication");
const { authorization } = require("./../middleware/authorization");

roleRouter.post("/createRole", create);

// admin
roleRouter.get("/role", authentication, authorization, getRoles);

module.exports = roleRouter;
