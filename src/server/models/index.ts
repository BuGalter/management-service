import { Sequelize, } from 'sequelize-typescript';
import config from '../config/config';
import { User, } from './User';
import { Session, } from './Session';
import { Student, } from './Student';
import { Teacher, } from './Teacher';

const sequelize = new Sequelize(config.db.dbName, config.db.userName, config.db.password, {
  host: config.db.dbHost,
  dialect: 'postgres',
  models: [User, Session, Student, Teacher, ],
});

sequelize.sync({ force: true, });
export default sequelize;
