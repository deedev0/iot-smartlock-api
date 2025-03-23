const Joi = require('joi');

const ControllerPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = { ControllerPayloadSchema };
