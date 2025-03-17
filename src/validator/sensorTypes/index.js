const {
  PostSensorTypeSchema,
  PutSensorTypeSchema,
  DeleteSensorTypeSchema,
} = require('./schema');

const InvariantError = require('../../exceptions/InvariantError');

const SensorTypesValidator = {
  validatePostSensorTypePayload: (payload) => {
    const validationResult = PostSensorTypeSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePutSensorTypePayload: (payload) => {
    const validationResult = PutSensorTypeSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateDeleteSensorTypePayload: (payload) => {
    const validationResult = DeleteSensorTypeSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
}

module.exports = SensorTypesValidator;
