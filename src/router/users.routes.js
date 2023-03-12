const { Router } = require("express");
const multer = require("multer");

const UserController = require("../controller/UserController");
const UserAvatarController = require("../controller/UserAvatarController");

const uploadConfig = require("../configs/upload");
const upload = multer(uploadConfig.MULTER);

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const userRoute = Router();

const userController = new UserController();
const userAvatarController = new UserAvatarController();

userRoute.post("/", userController.create);
userRoute.put("/", ensureAuthenticated, userController.update);
userRoute.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

module.exports = userRoute;
