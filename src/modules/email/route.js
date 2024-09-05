import express from "express";
import {
  deleteMessage,
  generateEmailAddress,
  getMessage,
  listEmails,
} from "./controller.js";
const email = express.Router();

email.get("/", generateEmailAddress);

email.get("/emails", listEmails);

email.get("/emails/:messageId", getMessage);

email.delete("/emails/:messageId", deleteMessage);

export default email;
