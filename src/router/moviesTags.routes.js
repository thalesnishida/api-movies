const { Router } =  require("express");
const MoviesTagsController = require("../controller/MoviesTagsController");
const tagRouter = Router();

const moviesTagsController = new MoviesTagsController();

tagRouter.get("/:user_id", moviesTagsController.index);

module.exports = tagRouter;