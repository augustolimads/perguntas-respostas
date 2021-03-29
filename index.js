const express = require("express");
let path = require("path");
const app = express();
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

connection
  .authenticate()
  .then(() => {
    console.log("conexão feita com o BD");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  Pergunta.findAll({
    raw: true,
    order: [
      ["id", "DESC"], //ou ASC
      ["createdAt", "DESC"],
    ],
  })
    .then((perguntas) => {
      res.render("index", { perguntas });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.get("/pergunta/:id", (req, res) => {
  const { id } = req.params;

  Pergunta.findOne({
    where: { id },
  })
    .then((pergunta) => {
      if (!pergunta) {
        res.redirect("/");
      } else {
        Resposta.findAll({
          where: { perguntaId: pergunta.id },
          order: [["id", "DESC"]],
        }).then((respostas) => {
          res.render("pergunta", { pergunta, respostas });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
});

app.post("/salvarpergunta", (req, res) => {
  const { title, description } = req.body;
  console.log(title, description);

  Pergunta.create({
    title,
    description,
  }).then(() => {
    res.redirect("/");
  });
});

app.post("/responder", (req, res) => {
  const { perguntaId, corpo } = req.body;

  if (corpo !== "") {
    Resposta.create({
      corpo,
      perguntaId,
    }).then(() => {
      res.redirect("/pergunta/" + perguntaId);
    });
  }
});

app.listen(8080, () => {
  console.log("app rodando, pagina: http://localhost:8080/perguntar");
});
