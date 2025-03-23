const SensorTypesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'sensorTypes',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const sensorTypesHandler = new SensorTypesHandler(service, validator);
    server.route(routes(sensorTypesHandler));
  }
};
