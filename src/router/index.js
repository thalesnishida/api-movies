const { Router } =  require("express");

const routes =  Router();

const userRoute = require("./users.routes");
const notesMoviesRoute = require("./moviesNotes.routes");
const tagsMoviesRoute = require("./moviesTags.routes");

routes.use("/users", userRoute);
routes.use("/notes", notesMoviesRoute);
routes.use("/tags", tagsMoviesRoute);

module.exports = routes;