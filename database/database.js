const Sequelize = require("sequelize");

const connection = new Sequelize("guia-perguntas", "root", "voylez99815293", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;