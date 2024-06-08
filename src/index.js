import app from "./app.js";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import logger from "./config/logger.config.js";

const filePath = path.join(path.resolve(), "Data", "dev-data.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

app.get("/", (req, res) => {
  res.status(200).json({
    results: data.length,
    data: data,
  });
});

const PORT = process.env.PORT || 8000;
const { DATABASE_URL } = process.env;

mongoose.connection.on("error", (err) => {
  logger.error(`Mongodb Connectiion Error: ${err}`);
  process.exit(1);
});

mongoose.connect(DATABASE_URL, {}).then(() => {
  logger.info("Connected to Mongodb");
});

let server;
server = app.listen(PORT, () => {
  logger.info(`App is Running on Port: ${PORT}`);
});

const exitHandler = () => {
  if (server) {
    logger.info("Server Closed");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const uncaughtErrorHandler = (error) => {
  logger.error(error);
  exitHandler;
};

process.on("uncaughtException", uncaughtErrorHandler);

//SIGTERM

process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server Closed");
    process.exit(1);
  } else {
    process.exit(1);
  }
});
