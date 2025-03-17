const Joi = require('joi');

const PostSensorSchema = Joi.object({
  sensorTypeId: Joi.string().required(),
  controllerId: Joi.string().required(),
});

const PutSensorSchema = Joi.object({
  sensorId: Joi.string().required(),
  sensorTypeId: Joi.string().required(),
});

const DeleteSensorSchema = Joi.object({
  sensorId: Joi.string().required(),
});

module.exports = {
  PostSensorSchema,
  PutSensorSchema,
  DeleteSensorSchema,
};
