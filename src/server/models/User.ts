import {
  Column, DataType, HasMany, Model, Table,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { getUUID, } from '../utils/index';
import { Session, } from './Session';

@Table
export class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING,
    defaultValue: () => getUUID(),
  })
  id: string;

  @HasMany(() => Session)
  session: Session[];

  @Column({})
  name: string;

  @Column({})
  email: string;

  @Column({
    type: DataType.STRING,
    set(value: string) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(value, salt);
      this.setDataValue('password', hash);
    },
    get() {
      return this.getDataValue('password');
    },
  })
  password: string;

  @Column({})
  phone: string;

  @Column({})
  birth: Date;

  @Column({})
  sex: string;

  async passwordCompare(pwd: string) {
    return bcrypt.compareSync(pwd, this.password);
  }
}