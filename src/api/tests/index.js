const TestHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'tests',
  version: '1.0.0',
  register: async (server) => {
    const testsHandler = new TestHandler();
    server.route(routes(testsHandler));
  },
};