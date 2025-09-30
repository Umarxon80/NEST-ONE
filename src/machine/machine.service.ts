import { Injectable } from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Machine } from './models/machine.model';
import { Company } from '../company/models/company.model';
import { CompanyService } from '../company/company.service';

@Injectable()
export class MachineService {
    constructor(
        @InjectModel(Machine) private readonly machineModel: typeof Machine,
        private readonly companyServise:CompanyService
      ) {}

  async create(createMachineDto: CreateMachineDto) {
    return this.machineModel.create(createMachineDto)
  }

  findAll() {
    return this.machineModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.machineModel.findByPk(id);
  }

  async update(id: number, updateMachineDto: UpdateMachineDto) {
    const updatedMachine = await this.machineModel.update(updateMachineDto, {
      where: { id },
      returning: true,
    });
    return updatedMachine[1][0];
  }

  async remove(id: number) {
 const delcount = await this.machineModel.destroy({ where: { id } });
 if (!delcount) {
   return { message: "Bunday kompaniya yoq" };
 }
 return { message: "Kompaniya o'chirlidi", id };  }
}
