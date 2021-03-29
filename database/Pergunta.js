const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define(
  "pergunta",
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
  {}
);

//nao força a criação da tabela caso ela ja exista
Pergunta.sync({ force: false }).catch((err) => {
  console.log(err);
});

module.exports = Pergunta;
