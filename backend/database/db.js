require("dotenv").config();
const cli = require("nodemon/lib/cli");
const { Pool, Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "login",
  password: "Jeel@postgre1",
  port: 5432,
});
client.connect().then(() => {
  console.log("database connected successfully");
});

module.exports = client;
