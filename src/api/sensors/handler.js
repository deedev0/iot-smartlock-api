class SensorsHandler {
  constructor(service, validator) {
    this._sensorServices = service;
    this._validator = validator

    this.postSensorHandler = this.postSensorHandler.bind(this);
    this.getSensorsHandler = this.getSensorsHandler.bind(this);
    this.getSensorByIdHandler = this.getSensorByIdHandler.bind(this);
    this.putSensorByIdHandler = this.putSensorByIdHandler.bind(this);
    this.deleteSensorByIdHandler = this.deleteSensorByIdHandler.bind(this);
  }

  async postSensorHandler(request, h) {
    await this._validator.validatePostSensorsPayload(request.payload);

    const { sensorTypeId, name } = request.payload;
    const { controllerId } = request.params;

    const sensorId = await this._sensorServices.addSensor(name, sensorTypeId, controllerId);

    const response = h.response({
      status: 'success',
      message: 'Sensor berhasil ditambahkan',
      data: {
        sensorId,
      },
    });
    response.code(201);
    return response;
  }

  async getSensorsHandler(request, h) {
    const { id } = request.auth.credentials;
    const { controllerId } = request.params;
    const sensors = await this._sensorServices.getSensors(id, controllerId);

    return {
      status: 'success',
      data: {
        sensors,
      },
    };
  }

  async getSensorByIdHandler(request, h) {
    const { id } = request.auth.credentials;
    const { sensorId } = request.params;
    const sensor = await this._sensorServices.getSensorById(sensorId, id);

    return {
      status: 'success',
      data: {
        sensor,
      },
    };
  }

  async putSensorByIdHandler(request, h) {
    this._validator.validatePutSensorsPayload(request.payload);

    const { sensorId: id } = request.params;
    const { id: owner } = request.auth.credentials;
    const { name, sensorTypeId, isActive } = request.payload;

    await this._sensorServices.editSensorById(owner, { id, name, sensorTypeId, isActive });

    return {
      status: 'success',
      message: 'Sensor berhasil diperbarui',
    };
  }

  async deleteSensorByIdHandler(request, h) {
    const { sensorId } = request.params;
    const { id: owner } = request.auth.credentials;

    await this._sensorServices.deleteSensorById(sensorId, owner);

    return {
      status: 'success',
      message: 'Sensor berhasil dihapus',
    };
  }
}

module.exports = SensorsHandler;
