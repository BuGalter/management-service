import * as Hapi from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import * as AuthBearer from 'hapi-auth-bearer-token';
import config from './config';
import sequelize from './models';
import routes from './routes';
import { validateSession, } from './utils/validate';

const init = async () => {
  const server = Hapi.server({
    port: config.server.port,
    host: config.server.host,
  });

  server.realm.modifiers.route.prefix = '/api';

  await server.register([Inert, AuthBearer]);

  server.auth.strategy('simple', 'bearer-access-token', { validate: validateSession, });

  server.auth.default('simple');

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
