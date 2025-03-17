const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(8).required(),
  fullname: Joi.string().required(),
});

module.exports = { UserPayloadSchema };
