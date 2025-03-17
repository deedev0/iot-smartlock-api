const Joi = require('joi');

const PostControllerPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

const PutContollerPayloadSchema = Joi.object({
  sensorId: Joi.string().required(),
});

const DeleteControllerPayloadSchema = Joi.object({
  sensorId: Joi.string().required(),
  name: Joi.string().required(),
});

module.exports = {
  PostControllerPayloadSchema,
  PutContollerPayloadSchema,
  DeleteControllerPayloadSchema,
};
