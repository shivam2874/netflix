import fs from "fs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import logger from "../src/config/logger.config.js";
import Movie from "../src/models/movieModel.js";

// dotenv config
dotenv.config({ path: "../.env" });

//Database URL
const DB = process.env.DATABASE_URL;

if (!DB) {
  throw new Error("DATABASE_URL is not defined in .env file");
}

// Connection to MongoDB Database
mongoose
  .connect(DB, {})
  .then(() => {
    logger.info("Database connected Successfully");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Reading JSON file
const movies = JSON.parse(fs.readFileSync("./dev-data.json", "utf-8"));

//Function to import Data
const importData = async () => {
  try {
    await Movie.create(movies);
    logger.info("Data Sucessfully Loaded");
  } catch (error) {
    logger.error("Error in Importing Data:", error);
  }
  process.exit();
};

//Function to Delete data
const deleteData = async () => {
  try {
    await Movie.deleteMany();
    logger.info("Data Deleated Sucessfully");
  } catch (error) {
    logger.error("Error in Importing Data:", error);
  }
  process.exit();
};

//Configuring importing and deleting Data
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
