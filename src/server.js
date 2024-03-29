require("express-async-errors");
require("dotenv/config");

const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const routes = require("./router");
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload");

app.use(routes);

app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER));

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error.message);

  return response.status(500).json({
    status: "error",
    message: "Internal error server!",
  });
});
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
