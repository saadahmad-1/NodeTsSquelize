import "express-async-errors";
import logger from "jet-logger";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import cors from "cors";

import EnvVars from "@src/constants/EnvVars";
import { NodeEnvs } from "@src/constants/misc";
import sequelize from "@src/configs/db";
import routes from "@src/routes";
import ModelAssociations from "./models/ModelAssociations";
import { errorHandler } from "./middlewares/errrorHandler";
// Set the env file

const app = express();

// **** Setup **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan("dev"));
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}
app.use(cors());
// Use morgan middleware for logging HTTP requests
app.use(morgan("dev"));

// Health Check Route
app.get("/health", async (req, res) => {
  let health = await sequelize.query("SELECT 1;");
  res.status(200).json({ status: "Ok", message: "No Worries! The Image Upload Scripts are healthy", health });
});

app.use(routes);
app.use(errorHandler);

sequelize
  .authenticate()
  .then(() => {
    ModelAssociations();
    app.listen(EnvVars.Port, () => {
      const SERVER_START_MSG =
        "Database Authenticated and Server started on port: " +
        EnvVars.Port.toString();
      logger.info(SERVER_START_MSG);
    });
  })
  .catch((err) => logger.err(err));
