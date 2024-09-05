import Joi from "joi";

export const fetchEmailsSchema = Joi.object({
  md5Hash: Joi.string().required(),
});

export const fetchMessageSchema = Joi.object({
  messageId: Joi.string().required(),
});
