const ControllersHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'controllers',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const controllersHandler = new ControllersHandler(service, validator);
    server.route(routes(controllersHandler));
  }
};
