import { Injectable } from '@nestjs/common';
import { CreateMachineDriverDto } from './dto/create-machine-driver.dto';
import { UpdateMachineDriverDto } from './dto/update-machine-driver.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MachineDriver } from './models/machine-driver.model';

@Injectable()
export class MachineDriverService {
  constructor(
      @InjectModel(MachineDriver) private readonly machineDriverModule: typeof MachineDriver
    ) {}

  create(createMachineDriverDto: CreateMachineDriverDto) {
    return this.machineDriverModule.create(createMachineDriverDto)
  }

  findAll() {
    return this.machineDriverModule.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return `This action returns a #${id} machineDriver`;
  }

  update(id: number, updateMachineDriverDto: UpdateMachineDriverDto) {
    return `This action updates a #${id} machineDriver`;
  }

  remove(id: number) {
    return `This action removes a #${id} machineDriver`;
  }
}
