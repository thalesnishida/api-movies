const { hash, compare } =  require("bcryptjs");
const knex = require("../database/knex");
const AppError = require("../Utils/AppError");

class UserController{
  async create(request, response){
    const { name, email, password } = request.body;

    const user = await knex("users").where({ email }).first();

    if(user){
      throw new AppError("Usuário ja existe!");
    }

    const hashedPassword =  await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword
    })
  

    return response.status(201).json();
  }

  async update(request, response){
    const { name, email, old_password, password } = request.body;
    const { id } = request.params;

    const user = await knex("users").where({ id: id }).select();

    if(user == ""){
      throw new AppError("Usuário não encontrado")
    }

    if(name || email ){
      const emailNameBefore = user.map( item => {
        return item['name'];
      });

      console.log(emailNameBefore)

      const userWithEmail = await knex("users").where('email', email ?? emailNameBefore);
      
      console.log(userWithEmail)
      
      userWithEmail.map(all => {
        
        if(all && all['id'] !== id){
          throw new AppError("Email ja esta em uso!")
        };
        
        all['name'] = name ?? all['name'];
        all['email'] = email ?? all['email'];
        
        console.log(all['id'], all['email'])
        console.log(id, email)
      });

      await knex("users").where("id", id).update({
        name,
        email
      })
    }
    
   
    if(password && !old_password){
      throw new AppError("Voce perecisa digitar a senha antiga para atualiza nova senha!")
    }

    if(password && old_password){
      const pad = user.map(p => {
        return p['password'];
      })
      
      const chekPassword = await compare(old_password, pad.toString());
  
      if(!chekPassword){
        throw new AppError("Senha antiga nao confere!");
      }
      
      const passwordH = await hash(password, 8);

      console.log(passwordH)
      
      await knex("users").where("id", id).update({
        password: passwordH
      })
    }
    

    return response.status(201).json();
  }
}

module.exports = UserController;