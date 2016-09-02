
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(t) {
      t.uuid('id');
      t.text('email');
      t.text('password');
      t.text('name');
      t.timestamps();
      t.timestamp('deleted_at');
    }),
    knex.schema.createTable('blogs', function(t) {
      t.uuid('id');
      t.uuid('user_id');
      t.text('name');
      t.text('domain');
      t.text('description');
      t.timestamps();
      t.timestamp('deleted_at');
    }),
    knex.schema.createTable('articles', function(t) {
      t.uuid('id');
      t.uuid('user_id');
      t.uuid('blog_id');
      t.text('title');
      t.text('content');
      t.timestamps();
      t.timestamp('deleted_at');
    }),
    knex.schema.createTable('comments', function(t) {
      t.uuid('id');
      t.uuid('user_id');
      t.uuid('article_id');
      t.text('content');
      t.timestamps();
      t.timestamp('deleted_at');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('users'),
    knex.schema.dropTableIfExists('blogs'),
    knex.schema.dropTableIfExists('articles'),
    knex.schema.dropTableIfExists('comments')
  ]);
};
