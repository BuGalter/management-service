import * as Hapi from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import * as AuthBearer from 'hapi-auth-bearer-token';
import config from './config';
import sequelize from './models';
import routes from './routes';

const init = async () => {
  const server = Hapi.server({
    port: config.server.port,
    host: config.server.host,
  });

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  }
  catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  server.realm.modifiers.route.prefix = '/api';

  await server.register([Inert, AuthBearer]);

  server.route(routes);

  await server.start();
  console.log(`Server running on port ${config.server.port}`);
};

export { init, };
