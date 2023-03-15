const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskSorage = require("../providers/DiskStorage");

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFileName = request.file.filename;

    const diskSorage = new DiskSorage();

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError(
        "Someento usuário autenticado pode atualizar o avatar"
      );
    }

    if (user.avatar) {
      await diskSorage.deleteFile(user.avatar);
    }

    const fileName = await diskSorage.saveFile(avatarFileName);
    user.avatar = fileName;

    await knex("users").update(user).where({ id: user_id });

    return response.json(user);
  }
}

module.exports = UserAvatarController;
