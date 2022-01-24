import * as Hapi from '@hapi/hapi';
import config from './config';

const init = async () => {
  const server = Hapi.server({
    port: config.server.port,
    host: config.server.host,
  });

  await server.start();
  console.log(`Server running on port ${config.server.port}`);
};

export { init, };
