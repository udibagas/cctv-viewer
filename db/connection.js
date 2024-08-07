require("dotenv").config();
const { createConnection } = require("mysql");

const {
  DB_HOST: host,
  DB_PORT: port,
  DB_NAME: database,
  DB_USER: user,
  DB_PASS: password,
} = process.env;

const db = createConnection({
  host,
  port,
  database,
  user,
  password,
});

module.exports = db;
