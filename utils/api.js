const knex = require("./knex.js");

const getAllCars = async (req, res) => {
  const cars = await knex("CARS").select("*");
  try {
    res.status(200).json({
      message: "Success",
      cars,
    });
  } catch (error) {
    res.status(404).send({
      message: "Error",
      error: error,
    });
  }
};

const getCarById = async (req, res) => {
  const car = await knex("CARS")
    .column(["id", "model", "year"])
    .select()
    .where("id", req.params.id);
  try {
    res.status(200).json({
      message: "Success",
      car,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error",
      error: error,
    });
  }
};

const addCar = async (req, res) => {
  await knex("CARS").insert(req.body);
  try {
    res.status(201).json({
      message: "Success",
      car: req.body,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error",
      error: error,
    });
  }
};

const updateCar = async (req, res) => {
  await knex("CARS").where("id", req.params.id).update(req.body);
  const cars = await knex("CARS").select("*");
  try {
    res.status(201).json({
      message: "Success",
      cars,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error",
      error: error,
    });
  }
};

const deleteCar = async (req, res) => {
  await knex("CARS").where("id", req.params.id).del();
  const cars = await knex("CARS").select("*");
  try {
    res.status(200).json({
      message: "Success",
      cars,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error",
      error: error,
    });
  }
};

module.exports = {
  getAllCars,
  getCarById,
  addCar,
  updateCar,
  deleteCar,
};
