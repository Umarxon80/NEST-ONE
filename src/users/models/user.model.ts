import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Role } from "../../role/models/role.model";
import { UserRole } from "./user-role.model";
import { ApiProperty } from "@nestjs/swagger";

interface IUserCreationAttr {
  name: string;
  email: string;
  password: string;
}

@Table({ tableName: "user" })
export class User extends Model<User, IUserCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Foydalanuvchi Idsi",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "user1",
    description: "Foydalanuvchi ismi",
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare name: string;

  @ApiProperty({
    example: "user1@gmail.com",
    description: "Foydalanuvchi emaili",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING(1000),
  })
  declare password: string;

  @Column({
    type: DataType.BOOLEAN(),
    defaultValue: false,
  })
  declare is_active: boolean;

  @BelongsToMany(() => Role, () => UserRole)
  role: Role[];
}
