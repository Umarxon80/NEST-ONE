import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { UserRole } from "../../users/models/user-role.model";
import { User } from "../../users/models/user.model";

interface IRoleCreationAttr {
  value: string;
  description: string;
}

@Table({ tableName: "role" })
export class Role extends Model<Role, IRoleCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare value: string;

  @Column({
    type: DataType.STRING,
  })
  declare description: number;

  @BelongsToMany(() => User, () => UserRole)
  role: User[];
}
