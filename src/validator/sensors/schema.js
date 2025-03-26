const Joi = require('joi');

const PostSensorSchema = Joi.object({
  sensorTypeId: Joi.string().required(),
  name: Joi.string().required(),
});

const PutSensorSchema = Joi.object({
  sensorTypeId: Joi.string().required(),
  name: Joi.string().required(),
  isActive: Joi.bool(),
});

module.exports = {
  PostSensorSchema,
  PutSensorSchema,
};
