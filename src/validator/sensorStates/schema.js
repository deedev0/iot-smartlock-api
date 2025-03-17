const Joi = require('joi');

const PostSensorStateSchema = Joi.object({
  sensorId: Joi.string().required(),
});

const PutSensorStateSchema = Joi.object({
  sensorId: Joi.string().required(),
  state: Joi.string().required(),
});


module.exports = {
  PostSensorStateSchema,
  PutSensorStateSchema,
};
