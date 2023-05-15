// creating database
// import sequalize
const { Sequelize } = require("sequelize");

// creating network configuration of sequalize

const db = new Sequelize({
  host: "localhost",
  database: "users_crud",
  port: 5432,
  username: "postgres",
  password: "Daniel.caro317",
  dialect: "postgres",
});

module.exports = db;
