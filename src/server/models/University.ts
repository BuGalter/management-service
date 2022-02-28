import {
  Column, DataType, Model, Table,
} from 'sequelize-typescript';
import { getUUID, } from '../utils/index';

@Table
export class University extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING,
    defaultValue: () => getUUID(),
  })
  id: string;

  @Column({ })
  name: string;
}
