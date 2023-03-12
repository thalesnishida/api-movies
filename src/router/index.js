const { Router } = require("express");

const routes = Router();

const userRoute = require("./users.routes");
const notesMoviesRoute = require("./moviesNotes.routes");
const tagsMoviesRoute = require("./moviesTags.routes");
const sessionsRoute = require("./sessions.routes");

routes.use("/users", userRoute);
routes.use("/notes", notesMoviesRoute);
routes.use("/tags", tagsMoviesRoute);
routes.use("/sessions", sessionsRoute);

module.exports = routes;
