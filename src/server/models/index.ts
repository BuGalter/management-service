import { Sequelize, } from 'sequelize-typescript';
import config from '../config';

const sequelize = new Sequelize(config.db.dbName, config.db.userName, config.db.password, {
  host: config.db.dbHost,
  dialect: 'postgres',
  models: [],
});

sequelize.sync();
export default sequelize;
