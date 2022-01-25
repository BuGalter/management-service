import { Sequelize, } from 'sequelize-typescript';
import config from '../config';
import { User, } from './User';
import { Session, } from './Session';

const sequelize = new Sequelize(config.db.dbName, config.db.userName, config.db.password, {
  host: config.db.dbHost,
  dialect: 'postgres',
  models: [User, Session],
});

sequelize.sync({ force: true, });
export default sequelize;
