const {
  PostSensorSchema,
  PutSensorSchema,
  DeleteSensorSchema,
} = require('./schema');

const InvariantError = require('../../exceptions/InvariantError');

const SensorsValidator = {
  validatePostSensorsPayload: (payload) => {
    const validationResult = PostSensorSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePutSensorsPayload: (payload) => {
    const validationResult = PutSensorSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateDeleteSensorsPayload: (payload) => {
    const validationResult = DeleteSensorSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
}

module.exports = SensorsValidator;
