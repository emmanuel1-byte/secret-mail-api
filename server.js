import { createServer } from "http";
import express from "express";
import logger from "./src/utils/logger.js";
import cors from "cors";
import YAML from "yaml";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import {
  globalErrorhandler,
  routeNotFoundHandler,
} from "./src/middlewares/error.js";
import respond from "./src/utils/respond.js";
import email from "./src/modules/email/route.js";
const app = express();

const PORT = 8000;
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "*", methods: ["POST", "GET", "DELETE"] }));

const file = fs.readFileSync("doc/swagger.yaml", "utf-8");
const swaggerDocument = YAML.parse(file);

app.get("/", (req, res) => {
  return respond(res, 200, "API is healthy and running...");
});

app.use("/api/v1/disposable-email", email);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(globalErrorhandler);
app.use(routeNotFoundHandler);

server.listen(PORT, () => {
  logger.info(`Server is running on port: ${PORT}`);
});
