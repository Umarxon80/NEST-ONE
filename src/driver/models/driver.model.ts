import { DataTypes } from "sequelize";
import {
  BelongsToMany,
  Column,
  Model,
  Table,
} from "sequelize-typescript";
import { Machine } from "../../machine/models/machine.model";
import { MachineDriver } from "../../machine-driver/models/machine-driver.model";

interface IDriverCreationAttr {
  full_name: string;
  last_name: string;
  driver_license: string;
  phone: string;
}

@Table({ tableName: "driver" })
export class Driver extends Model<Driver, IDriverCreationAttr> {
  @Column({
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
      type: DataTypes.STRING(50),
      allowNull: false,
    })
    declare full_name: string;

    @Column({
      type: DataTypes.STRING,
    })
    declare last_name: string;

    @Column({
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    })
    declare driver_license: string;

    @Column({
      type: DataTypes.STRING(15),
      unique: true,
    })
    declare phone: string;

    @BelongsToMany(()=>Machine,()=>MachineDriver)
    machines:Machine[]
  }
