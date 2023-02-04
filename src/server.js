require("express-async-errors");

const express = require("express");

const app = express();
app.use(express.json());

const routes = require("./router");
const AppError = require("./Utils/AppError");

app.use(routes);

app.use((error, request, response, next) => {
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.error(error.message);

  return response.status(500).json({
    status: "error",
    message: "Internal error server!"
  })
})
const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))