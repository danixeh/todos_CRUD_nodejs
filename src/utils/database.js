// creating database
// import sequalize
const { Sequelize } = require("sequelize");
require("dotenv").config();

// creating network configuration of sequalize

const db = new Sequelize({
  host: process.env.DB_HOST,
  database: process.env.DBNAME,
  port: process.env.DBPORT,
  username: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  dialect: "postgres",
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
});

module.exports = db;
