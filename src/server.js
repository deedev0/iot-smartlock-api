require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

// users
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');
const ClientError = require('./exceptions/ClientError');

// authentications
const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/postgres/AuthenticationsService');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/authentications');

// tests
const tests = require('./api/tests');

// controllers
const controllers = require('./api/controllers');
const ControllersService = require('./services/postgres/ControllersService');
const ControllersValidator = require('./validator/controllers');

// sensor-types
const sensorTypes = require('./api/sensorTypes');
const SensorTypesService = require('./services/postgres/SensorTypesService');
const SensorTypesValidator = require('./validator/sensorTypes');

// sensors
const sensors = require('./api/sensors');
const SensorsService = require('./services/postgres/SensorsService');
const SensorsValidator = require('./validator/sensors');

// states-service
const SensorStatesService = require('./services/postgres/SensorStatesService');

// logs
const LogsService = require('./services/postgres/LogsService');

const init = async () => {
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const controllersService = new ControllersService();
  const sensorTypesService = new SensorTypesService();
  const sensorStatesService = new SensorStatesService(new SensorsService(), new LogsService());
  const sensorsService = new SensorsService(sensorStatesService);

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  // mendefinisikan strategy autentikasi jwt
  server.auth.strategy('auth_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: tests,
    },
    {
      plugin: controllers,
      options: {
        service: controllersService,
        validator: ControllersValidator,
      },
    },
    {
      plugin: sensorTypes,
      options: {
        service: sensorTypesService,
        validator: SensorTypesValidator,
      },
    },
    {
      plugin: sensors,
      options: {
        service: sensorsService,
        validator: SensorsValidator,
      },
    }
  ]);

  server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request;

    // penanganan client error secara internal
    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server bejalan pada ${server.info.uri}`);
};

init();
