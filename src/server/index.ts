import * as Hapi from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import * as HapiBearer from 'hapi-auth-bearer-token';
import config from './config/config';
import sequelize from './models';
import routes from './routes';
import { tokenValidate, } from './utils/auth';

const createServer = async () => {
  const server = Hapi.server({
    port: config.server.port,
    host: config.server.host,
  });

  await server.register([Inert, HapiBearer]);

  server.realm.modifiers.route.prefix = '/api';

  server.auth.strategy('jwt-access', 'bearer-access-token', {
    validate: tokenValidate('access'),
  });
  server.auth.strategy('jwt-refresh', 'bearer-access-token', {
    validate: tokenValidate('refresh'),
  });
  server.auth.default('jwt-access');

  server.route(routes);

  try {
    await sequelize.sync();
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  }
  catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  return server;
};

const init = async () => {
  const server = await createServer();
  await server.initialize();
  return server;
};

const start = async () => {
  const server = await createServer();
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  return server;
};

export { init, start, };
