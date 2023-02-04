const { Router } =  require("express");
const UserController = require("../Controller/UserController");
const userRoute = Router();

const userController = new UserController();

userRoute.post("/", userController.create);
userRoute.put("/:id", userController.update);

module.exports = userRoute;