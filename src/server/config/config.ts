import { config, } from 'dotenv';

config();

export default {
  db: {
    dbName: process.env.DB,
    userName: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    dbHost: process.env.DB_HOST,
  },
  server: {
    port: process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000,
    host: process.env.SERVER_HOST ? process.env.SERVER_HOST : 'localhost',
  },
  auth: {
    jwt: {
      access: {
        secret: process.env.JWT_ACCESS_SECRET,
        lifetime: Number(process.env.JWT_ACCESS_LIFETIME),
      },
      refresh: {
        secret: process.env.JWT_REFRESH_SECRET,
        lifetime: Number(process.env.JWT_REFRESH_LIFETIME),
      },
    },
  },
};
