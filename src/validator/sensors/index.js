const {
  PostSensorSchema,
  PutSensorSchema,
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
}

module.exports = SensorsValidator;
