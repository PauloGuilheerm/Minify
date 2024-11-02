import "dotenv/config";

import express from "express";
import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "./src/swagger";
import bodyParser from "body-parser";
import urlRoutes from "./src/routes/routes";
import sequelize from "./src/config/db";
import { setupAssociations } from "./src/models/associations";

try {
  const app = express();
  app.use(bodyParser.json());

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/", urlRoutes);

  setupAssociations();

  sequelize.sync();

  const PORT = process.env.PORT;
  app.listen(PORT);
} catch (error) {
  console.error("Unable to connect to the database:", error);
}