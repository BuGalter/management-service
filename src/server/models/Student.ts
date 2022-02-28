import {
  Column, DataType, Model, Table, ForeignKey,
} from 'sequelize-typescript';
import { getUUID, } from '../utils/index';
import { User, } from './User';
import { University, } from './University';

@Table
export class Student extends Model {
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

  @Column({})
  group: number;
}
