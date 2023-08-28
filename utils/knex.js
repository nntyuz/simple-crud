const knex = require("knex");

const knexConnect = knex({
  client: "sqlite3",
  connection: {
    filename: "./db/cars.sqlite3",
  },
});

module.exports = knexConnect;
