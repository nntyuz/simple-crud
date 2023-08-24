const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
const fs = require("fs");
let people = require("./data/people.json");

// utils
const updateData = (response, value) => {
  fs.writeFile("./data/people.json", JSON.stringify(people), (err) => {
    response.status(200).send(value);
  });
};
const errorResponse = (response, value) => {
  response.status(404).send(`Person with ID: ${value} not founded!`);
};
const getInformation = (request) => {
  const paramId = Number(request.params.id);
  const person = people.find((a) => a.id === paramId);
  return {
    paramId,
    person,
  };
};

// CRUD Operations
const getAll = (req, res) => {
  //когда мы отправляем через send - мы отправляем text/html
  res.status(200).json({
    status: "success",
    count: people.length,
    people,
  });
};
const add = (req, res) => {
  const personId = people.length + 1;
  const person = req.body;

  people.push({ id: personId, ...person });
  updateData(res, `${person.name} has been added!`);
};
const getById = (req, res) => {
  const data = getInformation(req);

  if (data.person) {
    res.status(200).json(data.person);
  } else {
    errorResponse(res, data.paramId);
  }
};
const update = (req, res) => {
  const data = getInformation(req);
  const indexOfPerson = people[data.paramId - 1];

  if (data.person) {
    Object.assign(data.person, req.body);
    people[indexOfPerson] = data.person;
    updateData(res, data.person);
  } else {
    errorResponse(res, data.paramId);
  }
};
const remove = (req, res) => {
  const data = getInformation(req);

  if (data.person) {
    people = people.filter((a) => a.id !== data.paramId);
    updateData(res, `Person with ID ${data.paramId} has been deleted!`);
  } else {
    errorResponse(res, data.paramId);
  }
};

app.use(bodyParser.json());

app.route("/api/people").get(getAll).post(add);
app
  .route("/api/people/:id")
  .get(getById)
  .patch(update)
  .put(update)
  .delete(remove);

app.listen(port, () => {
  console.log(`Server listen on http://localhost:${port}/`);
});
