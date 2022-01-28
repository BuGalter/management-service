import {
  BelongsTo, Column, DataType, ForeignKey, Model, Table,
} from 'sequelize-typescript';
import { v4 as uuidv4, } from 'uuid';
import { User, } from './User';

@Table
export class Session extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING,
    defaultValue: () => uuidv4(),
  })
  id: string;

  @ForeignKey(() => User)
  @Column(DataType.STRING)
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
