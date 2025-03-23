const { ControllerPayloadSchema } = require('./schema');

const InvariantError = require('../../exceptions/InvariantError');

const ControllersValidator = {
  validateControllerPayload: (payload) => {
    const validationResult = ControllerPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ControllersValidator;
