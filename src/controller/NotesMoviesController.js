const knex = require("../database/knex");

class NotesMoviesController {
  async create(request, response){
    const { title, description, rating, tags} = request.body;
    const { user_id } = request.params

    const note_id = await knex("movies_notes").insert({
      title,
      description,
      rating,
      user_id
    });

    const tagsInsert = tags.map(name => {
      return {
        name,
        user_id,
        note_id
      }
    })

    await knex("movies_tags").insert(tagsInsert);


    response.status(201).json();

  }

  async index(request, response){
    const { user_id, title, tags } = request.query;

    let notes;

    if(tags){
      const filterTags = tags.split(',').map(tag => tag.trim());

      notes = await knex("movies_tags")
        .select([
          "movies_notes.id",
          "movies_notes.title",
          "movies_notes.user_id"
        ])
        .where("movies_notes.user_id", user_id)
        .whereLike("movies_notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("movies_notes", "movies_notes.id", "movies_tags.note_id")
        .orderBy("movies_notes.title")  

    }else {  
      notes = await knex("movies_notes")
      .where("user_id", user_id)
      .whereLike("title", `%${title}%`)
      .orderBy("title");
    }

    const tagsUser = await knex("movies_tags").where({ user_id });
    const notesWithTags = notes.map( note => {
      const noteTags = tagsUser.filter(tag => tag.note_id === note.id);

      return {
        ...note,
        tags: noteTags
      }
    });
    
    return response.json(notesWithTags);
  }

  async show(request, response){
    const { user_id } = request.params;

    const note = await knex("movies_notes").where("user_id", user_id).first();
    const tag = await knex("movies_tags").where({ user_id }).orderBy("name");

    return response.json({
      ...note,
      tag
    })
  }

  async delete(request, response){
    const { id } = request.params;

    await knex("movies_notes").where({ id }).delete();

    response.json();
  }
}

module.exports = NotesMoviesController;