import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import fileupload from "express-fileupload";
import cors from "cors";
import createHttpError from "http-errors";

//dotenv config
dotenv.config();

//create app from express

const app = express();

//Adding Morgan Middleware
if (process.env.NODE_ENV != "production") {
  app.use(morgan("dev"));
}

//Helmet
app.use(helmet());

//Parse json Request Url
app.use(express.json());

//Parse Json request Body
app.use(express.urlencoded({ extended: true }));

//Sanitize Request Data
app.use(mongoSanitize());

//Compression
app.use(compression());

//File Upload
app.use(fileupload({ useTempFiles: true }));

app.use(cors());

export default app;
