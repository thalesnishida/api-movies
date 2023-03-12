const { hash, compare } = require("bcryptjs");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      throw new AppError("Digite todos os campos!");
    }

    const user = await knex("users").where({ email }).first();

    if (user) {
      throw new AppError("Usuario encontrado");
    }

    const hashPassword = await hash(password, 10);

    await knex("users").insert({
      name,
      email,
      password: hashPassword,
    });

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, old_password, password } = request.body;
    const user_id = request.user.id;

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdateEmail = await knex("users").where({ email }).first();

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError("Este email ja esta em uso!");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError("Você precisa digitar a senha antiga!");
    }

    await knex("users").where({ id: user_id }).update({
      name,
      email,
    });

    if (password && old_password) {
      const checkPasswordMatch = await compare(old_password, user.password);

      if (!checkPasswordMatch) {
        throw new AppError("Senha antiga não confere!");
      }

      const hashNewPassword = await hash(password, 8);

      await knex("users").where({ id: user_id }).update({
        password: hashNewPassword,
      });
    }

    return response.status(201).json();
  }
}

module.exports = UserController;
