const routes = (handler) => [
  {
    method: 'POST',
    path: '/controllers',
    handler: handler.postControllerHandler,
    options: {
      auth: 'auth_jwt',
    },
  },
  {
    method: 'GET',
    path: '/controllers/{id}',
    handler: handler.getControllerByIdHandler,
    options: {
      auth: 'auth_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/controllers/{id}',
    handler: handler.putControllerByIdHandler,
    options: {
      auth: 'auth_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/controllers/{id}',
    handler: handler.deleteControllerByIdHandler,
    options: {
      auth: 'auth_jwt',
    },
  },
];

module.exports = routes;
