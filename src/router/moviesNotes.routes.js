const { Router } =  require("express");
const NotesMoviesController = require("../Controller/NotesMoviesController");
const notesRoute = Router();

const notesMoviesController = new NotesMoviesController();

notesRoute.get("/", notesMoviesController.index);
notesRoute.post("/:user_id", notesMoviesController.create);
notesRoute.get("/:user_id", notesMoviesController.show);
notesRoute.delete("/:id", notesMoviesController.delete);

module.exports = notesRoute;