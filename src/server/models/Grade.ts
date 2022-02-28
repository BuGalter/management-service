import {
  Column, DataType, Model, Table, ForeignKey, BelongsTo,
} from 'sequelize-typescript';
import { getUUID, } from '../utils/index';
import { Student, } from './Student';
import { Teacher, } from './Teacher';

@Table
export class Grade extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING,
    defaultValue: () => getUUID(),
  })
  id: string;

  @ForeignKey(() => Student)
  @Column({ })
  studentId: string;

  @BelongsTo(() => Student)
  student: Student;

  @ForeignKey(() => Teacher)
  @Column({ })
  teacherId: string;

  @Column({ })
  grade: number;

  @Column({})
  lesson: string;
}
