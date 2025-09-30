import { DataTypes } from "sequelize";
import { BelongsTo, Column, ForeignKey, Table,Model, BelongsToMany } from "sequelize-typescript";
import { Company } from "../../company/models/company.model";
import { Driver } from "../../driver/models/driver.model";
import { MachineDriver } from "../../machine-driver/models/machine-driver.model";

interface IMachineCreateAttr {
  model: string;
  name: string;
  companyId: number;
}

@Table({ tableName: "machine" })
export class Machine extends Model<Machine, IMachineCreateAttr> {
  @Column({
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataTypes.STRING(30),
    allowNull: false,
  })
  declare model: string;

  @Column({
    type: DataTypes.STRING(50),
    allowNull: false,
  })
  declare name: string;

  @ForeignKey(() => Company)
  @Column({
    type: DataTypes.INTEGER,
    onDelete: "CASCADE",
  })
  declare companyId: number;

  @BelongsTo(() => Company)
  company: Company;

  @BelongsToMany(()=>Driver, ()=>MachineDriver)
  drivers:Driver[]
}
