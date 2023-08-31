const knex = require("knex");

const knexConnect = knex({
  client: "sqlite3",
  connection: {
    filename: "./db/db.sqlite3",
  },
});

module.exports = knexConnect;
