const { verify } = require("jsonwebtoken");
const authConfig = require("../configs/auth");
const AppError = require("../utils/AppError");

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token não informado!", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.Jwt.secret);

    request.user = {
      id: Number(user_id),
    };

    next();
  } catch {
    throw new AppError("Token informado invalido", 401);
  }
}

module.exports = ensureAuthenticated;
