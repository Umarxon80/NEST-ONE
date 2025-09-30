import { forwardRef, Module } from '@nestjs/common';
import { MachineService } from './machine.service';
import { MachineController } from './machine.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from '../company/models/company.model';
import { Machine } from './models/machine.model';
import { CompanyModule } from '../company/company.module';

@Module({
  imports:[SequelizeModule.forFeature([Company,Machine]),
  forwardRef(()=>CompanyModule)],
  controllers: [MachineController],
  providers: [MachineService],
  exports:[MachineService]
})
export class MachineModule {}
