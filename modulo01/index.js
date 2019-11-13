const express = require("express");

const server = express();

//express ler json do req body (corpo da requisição)
server.use(express.json());

//Request body = {"name": "Juca", "email": "juca@teste.com" } (payload)

// localhost:3000/teste
//Query params = ?teste=1
/*server.get("/teste", (req, res) => {
  const nome = req.query.nome;

  return res.json({ message: `Hello ${nome}` });
}); */

//localhost:3000/users/919293 (id)
//Route params = /users/1
// server.get("/users/:index", (req, res) => {
//   const { index } = req.params;

//   return res.json(users[index]);
// });

const users = ["Juca", "Eva", "Diego", "Adão"];

// middleware Global  -  middleware é um interceptador
server.use((req, res, next) => {
  console.time("Request"); // quanto tempo demorou a requisição
  console.log(`Método: ${req.method}, URL: ${req.url}`); // middleware de log

  next();

  console.timeEnd("Request"); // quando finaliza ele conta o tempo
});

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: "User doesn't exists" });
  }

  req.user = user;

  return next();
}

//CRUD

server.get("/users", (req, res) => {
  // return res.json(users);
  return res.json(users);
});

server.get("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
});

//criar novo usuário
server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

//editar um usuário
server.put("/users/:index", checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

//exclusão
server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  // return res.json(users);
  return res.send("Usuário deletado com sucesso");
});
server.listen(3000);
