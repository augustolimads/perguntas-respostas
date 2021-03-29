const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define(
  "resposta",
  {
    corpo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    perguntaId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {}
);

//nao força a criação da tabela caso ela ja exista
Resposta.sync({ force: false }).catch((err) => {
  console.log(err);
});

module.exports = Resposta;
