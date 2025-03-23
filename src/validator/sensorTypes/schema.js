const Joi = require('joi');

const PostSensorTypeSchema = Joi.object({
  type: Joi.string().required(),
  name: Joi.string().required(),
});

const PutSensorTypeSchema = Joi.object({
  type: Joi.string().required(),
  name: Joi.string().required(),
});

module.exports = {
  PostSensorTypeSchema,
  PutSensorTypeSchema,
};
