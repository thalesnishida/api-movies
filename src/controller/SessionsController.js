const { compare } = require("bcryptjs");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("E-mail e/ou senha incorretos!");
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new AppError("E-mail e/ou senha incorretos");
    }

    const { secret, expiresIn } = authConfig.Jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return response.json({ user, token });
  }
}

module.exports = SessionsController;
