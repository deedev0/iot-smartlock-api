const {
  PostSensorStateSchema,
  PutSensorStateSchema,
} = require('./schema');

const InvariantError = require('../../exceptions/InvariantError');

const SensorStatesValidator = {
  validatePostSensorStatesPayload: (payload) => {
    const validationResult = PostSensorStateSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePutSensorStatesPayload: (payload) => {
    const validationResult = PutSensorStateSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
}

module.exports = SensorStatesValidator;
