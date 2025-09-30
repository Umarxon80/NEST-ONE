import { DataTypes } from "sequelize";
import { BelongsTo, Column, ForeignKey, Table,Model } from "sequelize-typescript";
import { Company } from "../../company/models/company.model";

interface IBuilderCreationAttr {
  full_name: string;
  birth_day: Date;
  salary: number;
  companyId: number;
}

@Table({tableName:"buider"})
export class Builder extends Model<Builder, IBuilderCreationAttr>{
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
        type: DataTypes.DATEONLY,
      })
      declare birth_date: Date;
    
      @Column({
        type: DataTypes.DECIMAL(15,2),
      })
      declare salary: number;

      @ForeignKey(()=>Company)
      @Column({
        type:DataTypes.INTEGER,
        onDelete:"CASCADE"
      })
      declare companyId:number

      @BelongsTo(()=>Company)
      company:Company
}