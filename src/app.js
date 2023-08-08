import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";

// dotEnv config
dotenv.config();

// create express app
const app = express();

// middlewares
// Morgan for logging
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Helmet for security
app.use(helmet());

// Body parser for parsing request URL
app.use(express.json());

// Body parser for parsing request body
app.use(express.urlencoded({ extended: true }));

// Mongo Sanitize for sanitizing data security 
app.use(mongoSanitize());

// Cookie parser
app.use(cookieParser());

// gzip Compression
app.use(compression());

// File Upload
app.use(fileUpload({
  useTempFiles: true
}));

// CORS for cross origin resource sharing and restrictions 
app.use(cors());

app.post("/test", (req, res) => {
  res.send(req.body);
});

export default app;