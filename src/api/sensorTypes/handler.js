class SensorTypesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.getSensorTypesHandler = this.getSensorTypesHandler.bind(this);
    this.postSensorTypeHandler = this.postSensorTypeHandler.bind(this);
    this.putSensorTypeHandler = this.putSensorTypeHandler.bind(this);
    this.deleteSensorTypeHandler = this.deleteSensorTypeHandler.bind(this);
  }

  async getSensorTypesHandler(request, h) {
    const sensorTypes = await this._service.getSensorTypes();

    return {
      status: 'success',
      data: {
        sensorTypes,
      },
    };

  }

  async postSensorTypeHandler(request, h) {
    this._validator.validatePostSensorTypePayload(request.payload);

    const { type, name } = request.payload;
    const sensorTypeId = await this._service.addSensorType(type, name);

    const response = h.response({
      status: 'success',
      message: 'Sensor type berhasil ditambahkan',
      data: {
        sensorTypeId,
      },
    });
    response.code(201);
    return response;
  }

  async putSensorTypeHandler(request, h) {
    this._validator.validatePutSensorTypePayload(request.payload);

    const { id } = request.params;
    const { type, name } = request.payload;
    await this._service.editSensorType({ id, name, type });
    return {
      status: 'success',
      message: 'Sensor type berhasil diperbarui',
    };
  }

  async deleteSensorTypeHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteSensorType(id);
    return {
      status: 'success',
      message: 'Sensor type berhasil dihapus',
    };
  }
}

module.exports = SensorTypesHandler;
