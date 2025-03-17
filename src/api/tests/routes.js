const { options } = require('joi');

const routes = (handler) => [
  {
    method: 'GET',
    path: '/tests',
    handler: handler.getTest,
    options: {
      auth: 'auth_jwt',
    },
  },
];

module.exports = routes;
