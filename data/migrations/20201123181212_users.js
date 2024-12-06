exports.up = function (knex) {
  return knex.schema.createTable('users', users => {
    users.increments();
    users.string('username', 255).notNullable().unique();
    users.string('password', 255).notNullable();
  })
  .createTable('jokes', jokes => {
    jokes.increments('joke_id');
    jokes.string('joke', 512).notNullable().unique();
    jokes.string('punchline', 512).notNullable();
    jokes.integer('cringe_factor');
    jokes.integer('created_by').unsigned().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('jokes').dropTableIfExists('users');
};
