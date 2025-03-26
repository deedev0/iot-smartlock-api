class ControllersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postControllerHandler = this.postControllerHandler.bind(this);
    this.getControllerByIdHandler = this.getControllerByIdHandler.bind(this);
    this.putControllerByIdHandler = this.putControllerByIdHandler.bind(this);
    this.deleteControllerByIdHandler = this.deleteControllerByIdHandler.bind(this);
  }
  
  async postControllerHandler(request, h) {
    this._validator.validateControllerPayload(request.payload);
    const { name } = request.payload;
    const { id: owner } = request.auth.credentials;
    const ControllerId = await this._service.addController(owner, name);


    const response = h.response({
      status: 'success',
      message: 'Controller berhasil ditambahkan',
      data: {
        ControllerId,
      },
    });
    response.code(201);
    return response;
  }

  async getControllerByIdHandler(request, h) {
    const { id } = request.params;
    const controller = await this._service.getControllerById(id);
    return {
      status: 'success',
      data: {
        controller,
      },
    };
  }

  async putControllerByIdHandler(request, h) {
    this._validator.validateControllerPayload(request.payload);
    const { name } = request.payload;
    const { id } = request.params;
    const { id: owner } = request.auth.credentials;
    await this._service.editControllerById(owner, { id, name});
    return {
      status: 'success',
      message: 'Controller berhasil diperbarui',
    };
  }

  async deleteControllerByIdHandler(request) {
    const { id } = request.params;
    const { id: owner } = request.auth.credentials;
    await this._service.deleteControllerById(id, owner);
    return {
      status: 'success',
      message: 'Controller berhasil dihapus',
    };
  }
}

module.exports = ControllersHandler;
