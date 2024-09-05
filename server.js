import { createServer } from "http";
import express from "express";
import logger from "./src/utils/logger.js";
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

app.get("/", (req, res) => {
  return respond(res, 200, "API is healthy and running...");
});

app.use("/api/v1/disposable-email", email);

app.use(globalErrorhandler);
app.use(routeNotFoundHandler);

server.listen(PORT, () => {
  logger.info(`Server is running on port: ${PORT}`);
});
