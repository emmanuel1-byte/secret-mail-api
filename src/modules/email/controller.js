import tempmail from "../../services/disposable-email/tempmail.js";
import { faker } from "@faker-js/faker";
import respond from "../../utils/respond.js";
import crypto from "crypto";
import { fetchEmailsSchema, fetchMessageSchema } from "./schema.js";

export async function generateEmailAddress(req, res, next) {
  try {
    const randomName = faker.person.firstName().toLowerCase();
    const domains = await tempmail.listDomain();

    const domain = domains[0];
    const tempEmail = `${randomName}${domain}`; // Concatenate the random name with the domain

    // Generate MD5 hash
    const md5Hash = crypto.createHash("md5").update(tempEmail).digest("hex");

    return respond(res, 200, { tempEmail, md5Hash });
  } catch (err) {
    next(err);
  }
}

export async function listEmails(req, res, next) {
  try {
    const params = await fetchEmailsSchema.validateAsync(req.query);

    const emails = await tempmail.listEmail(params.md5Hash);
    if (emails.error) return respond(res, 200, emails.error);

    return respond(res, 200, "Emails retrieved succesfuly", { emails });
  } catch (err) {
    next(err);
  }
}

export async function getMessage(req, res, next) {
  try {
    const params = await fetchMessageSchema.validateAsync(req.params);

    const message = await tempmail.getMessage(params.messageId);
    if (message.error) return respond(res, 200, message.error);

    return respond(res, 200, "Message found", { message });
  } catch (err) {
    next(err);
  }
}

export async function deleteMessage(req, res, next) {
  try {
    const params = await fetchMessageSchema.validateAsync(req.params);

    const message = await tempmail.deleteMessage(params.messageId);
    if (message.error) return respond(res, 200, message.error);

    return respond(res, 200, "Message deleted");
  } catch (err) {
    next(err);
  }
}
