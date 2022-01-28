import * as Hapi from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import config from './config/config';
import sequelize from './models';
import routes from './routes';
import { validateSession, } from './utils/auth';

const init = async () => {
  const server = Hapi.server({
    port: config.server.port,
    host: config.server.host,
  });

  server.realm.modifiers.route.prefix = '/api';

  await server.register([Inert, require('hapi-auth-jwt2')]);

  server.auth.strategy('jwt-access', 'jwt', {
    key: config.token.access.secret,
    validate: validateSession('access'),
  });

  server.auth.strategy('jwt-refresh', 'jwt', {
    key: config.token.refresh.secret,
    validate: validateSession('refresh'),
  });

  server.auth.default('jwt-access');

  server.route(routes);

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  }
  catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  await server.start();
  console.log(`Server running on port ${config.server.port}`);
};

export { init, };
