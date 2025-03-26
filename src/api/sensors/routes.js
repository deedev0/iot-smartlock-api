const routes = (handler) => [
  {
    method: 'GET',
    path: '/controllers/{controllerId}/sensors',
    handler: handler.getSensorsHandler,
    options: {
      auth: 'auth_jwt',
    },
  },
  {
    method: 'GET',
    path: '/controllers/{controllerId}/sensors/{sensorId}',
    handler: handler.getSensorByIdHandler,
    options: {
      auth: 'auth_jwt',
    },
  },
  {
    method: 'POST',
    path: '/controllers/{controllerId}/sensors',
    handler: handler.postSensorHandler,
    options: {
      auth: 'auth_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/controllers/{controllerId}/sensors/{sensorId}',
    handler: handler.deleteSensorByIdHandler,
    options: {
      auth: 'auth_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/controllers/{controllerId}/sensors/{sensorId}',
    handler: handler.putSensorByIdHandler,
    options: {
      auth: 'auth_jwt',
    },
  },
];

module.exports = routes;
