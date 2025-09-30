import { DataTypes } from "sequelize";
import {
  AllowNull,
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Builder } from "../../builder/models/builder.model";
import { Machine } from "../../machine/models/machine.model";

interface ICompanyCreationAttr {
  name: string;
  address: string;
  email: string;
  phone: string;
}

@Table({ tableName: "company" })
export class Company extends Model<Company, ICompanyCreationAttr> {
  @Column({
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataTypes.STRING,
  })
  declare address: string;

  @Column({
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataTypes.STRING(15),
    unique: true,
  })
  declare phone: string;
  
  @HasMany(()=>Machine)
  machins:Machine[];

  @HasMany(()=>Builder)
  builders:Builder[];
}
