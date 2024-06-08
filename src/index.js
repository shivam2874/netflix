import app from "./app.js";
import mongodb from "mongodb";
import mongoose from "mongoose";
import logger from "./config/logger.config.js";

const PORT = process.env.PORT || 8000;
const { DATABASE_URL } = process.env;

mongoose.connection.on("error", (err) => {
  logger.error(`Mongodb Connectiion Error: ${err}`);
  process.exit(1);
});

mongoose.connect(DATABASE_URL, {}).then(() => {
  logger.info("Connected to Mongodb");
});

app.get("/", (req, res) => {
  res.send("Hello aman from server");
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
