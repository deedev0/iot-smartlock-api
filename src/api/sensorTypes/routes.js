const routes = (handler) => [
  {
    method: 'GET',
    path: '/sensor-types',
    handler: handler.getSensorTypesHandler,
    options: {
      auth: 'auth_jwt',
    },
  },
  {
    method: 'POST',
    path: '/sensor-types',
    handler: handler.postSensorTypeHandler,
    options: {
      auth: 'auth_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/sensor-types/{id}',
    handler: handler.deleteSensorTypeHandler,
    options: {
      auth: 'auth_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/sensor-types/{id}',
    handler: handler.putSensorTypeHandler,
    options: {
      auth: 'auth_jwt',
    },
  },
];

module.exports = routes;
