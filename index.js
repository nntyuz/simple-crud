const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./utils/api.js");

app.use(bodyParser.json());

app.get("/api/v1/cars", db.getAllCars);
app.post("/api/v1/cars", db.addCar);
app.patch("/api/v1/cars/:id", db.updateCar);
app.delete("/api/v1/cars/:id", db.deleteCar);

app.listen(3000, () => {
  console.log("listening on http://localhost:3000/");
});
