import express from "express";
import "dotenv/config.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import { __dirname } from "./utils.js";
import router from "./routes/index.js";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";

const server = express();

// Middlewares
server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

server.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_LINK,
      ttl: 7 * 24 * 60 * 60 * 1000,
    }),
    rolling: true,
  })
);
server.use("/public", express.static("public"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

//
server.use("/", router); // Enrutador principal
server.use(errorHandler); // Manejador de errores
server.use(notFoundHandler); // Manejador de rutas inextistetes

export default server;
