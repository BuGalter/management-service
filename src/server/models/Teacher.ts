import {
  Column, DataType, Model, Table, ForeignKey,
} from 'sequelize-typescript';
import { getUUID, } from '../utils/index';
import { University, } from './University';
import { User, } from './User';

@Table
export class Teacher extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING,
    defaultValue: () => getUUID(),
  })
  id: string;

  @ForeignKey(() => User)
  @Column({ })
  userId: string;

  @Column({ })
  faculty: string;

  @ForeignKey(() => University)
  @Column({ })
  universityId: string;
}
