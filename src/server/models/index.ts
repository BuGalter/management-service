import { Sequelize, } from 'sequelize-typescript';
import config from '../config/config';
import { User, } from './User';

const sequelize = new Sequelize(config.db.dbName, config.db.userName, config.db.password, {
  host: config.db.dbHost,
  dialect: 'postgres',
  models: [User],
});

sequelize.sync();
export default sequelize;
