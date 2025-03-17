const {
  PostControllerPayloadSchema,
  PutContollerPayloadSchema,
  DeleteControllerPayloadSchema,
} = require('./schema');

const InvariantError = require('../../exceptions/InvariantError');

const ControllersValidator = {
  validatePostControllerPayload: (payload) => {
    const validationResult = PostControllerPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePutControllerPayload: (payload) => {
    const validationResult = PutContollerPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateDeleteControllerPayload: (payload) => {
    const validationResult = DeleteControllerPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
}

module.exports = ControllersValidator;
