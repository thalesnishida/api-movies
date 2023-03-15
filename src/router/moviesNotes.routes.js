const { Router } = require("express");
const NotesMoviesController = require("../controller/NotesMoviesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const notesRoute = Router();

const notesMoviesController = new NotesMoviesController();

notesRoute.use(ensureAuthenticated);

notesRoute.get("/", notesMoviesController.index);
notesRoute.post("/", notesMoviesController.create);
notesRoute.get("/:user_id", notesMoviesController.show);
notesRoute.delete("/:id", notesMoviesController.delete);

module.exports = notesRoute;
