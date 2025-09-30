import { DataTypes } from "sequelize";
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Machine } from "../../machine/models/machine.model";
import { Driver } from "../../driver/models/driver.model";

interface IMachineDriverCreationAttr {
  machineId: number;
  driverId: number;
}

@Table({ tableName: "machine_driver" })
export class MachineDriver extends Model<
  MachineDriver,
  IMachineDriverCreationAttr
> {
  @ForeignKey(() => Machine)
  @Column({
    type: DataTypes.INTEGER,
  })
  declare machineId: number;

  @ForeignKey(() => Driver)
  @Column({
    type: DataTypes.INTEGER,
  })
  declare driverId: number;

  @BelongsTo(() => Machine)
 machine: Machine;

  @BelongsTo(() => Driver)
 driver: Driver;
}

