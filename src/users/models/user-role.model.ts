import {  Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { Role } from "../../role/models/role.model";

interface IUserRoleCreationAttr{
    userId:number,
    roleId:number
}

@Table({ tableName: "user_role" })
export class UserRole extends Model<UserRole, IUserRoleCreationAttr> {
  @ForeignKey(()=>User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: number;

  @ForeignKey(()=>Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare roleId: number;
}
