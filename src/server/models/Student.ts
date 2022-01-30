import {
  Column, DataType, Model, Table, ForeignKey, HasMany,
} from 'sequelize-typescript';
import { getUUID, } from '../utils/index';
import { User, } from './User';
import { University, } from './University';
import { Grade, } from './Grade';

@Table
export class Student extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING,
    defaultValue: () => getUUID(),
  })
  id: string;

  @HasMany(() => Grade)
  grade: Grade[];

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
