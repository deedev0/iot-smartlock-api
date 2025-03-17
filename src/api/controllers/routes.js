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
    method: 'PUT',
    path: '/controllers',
    handler: handler.putControllerHandler,
    options: {
      auth: 'auth_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/controllers',
    handler: handler.deleteControllerHandler,
    options: {
      auth: 'auth_jwt',
    },
  },
];

module.exports = routes;
