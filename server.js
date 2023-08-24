//Without Express js
// const http = require('http');
// const hostname = "127.0.0.1";
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end('May Node be with you');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}`);
// });

//With Express
const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
let people = require("./data/people.json");

app.listen(port, () => {
  console.log(`Server listen on http://localhost:${port}/`);
});
app.use(bodyParser.json());

const updateData = (response, value) => {
  fs.writeFile("./data/people.json", JSON.stringify(people), (err) => {
    response.status(200).send(value);
  });
};

//Get All
app.get("/api/people", (req, res) => {
  //когда мы отправляем через send мы отправляем text/html
  res.status(200).json({
    status: "success",
    count: people.length,
    people,
  });
});

//Add
app.post("/api/people", (req, res) => {
  const personId = people.length + 1;
  const person = req.body;
  people.push({ id: personId, ...person });

  updateData(res, `${person.name} has been added!`);
});

//Get by id
app.get("/api/people/:id", (req, res) => {
  const paramId = Number(req.params.id);
  const person = people.find((a) => a.id === paramId);

  // Проверка на айдишник
  if (person) {
    res.status(200).json(person);
  } else {
    res.status(404).send(`Person with ID: ${paramId} not founded!`);
  }
});

//Update (patch)
app.patch("/api/people/:id", (req, res) => {
  const paramId = Number(req.params.id);
  const personToUpdate = people.find((a) => a.id === paramId);
  const indexOfPerson = people[paramId - 1];

  if (personToUpdate) {
    Object.assign(personToUpdate, req.body);
    people[indexOfPerson] = personToUpdate;
    updateData(res, personToUpdate);
  } else {
    res.status(404).send(`Person with ID: ${paramId} not founded!`);
  }
});

//Update (put)
app.put("/api/people/:id", (req, res) => {
  const paramId = Number(req.params.id);
  const personToUpdate = people.find((a) => a.id === paramId);
  const indexOfPerson = people[paramId - 1];

  if (personToUpdate) {
    Object.assign(personToUpdate, req.body);
    people[indexOfPerson] = personToUpdate;
    updateData(res, personToUpdate);
  } else {
    res.status(404).send(`Person with ID: ${paramId} not founded!`);
  }
});

//Delete
app.delete("/api/people/:id", (req, res) => {
  const paramId = Number(req.params.id);
  const personToDelete = people.find((a) => a.id === paramId);

  if (personToDelete) {
    people = people.filter((a) => a.id !== paramId);
    updateData(res, `Person with ID ${paramId} has been deleted!`);
  } else {
    res.status(404).send(`Person with ID ${paramId} not founded!`);
  }
});