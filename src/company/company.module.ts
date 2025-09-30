import { forwardRef, Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from './models/company.model';
import { Builder } from '../builder/models/builder.model';
import { BuilderModule } from '../builder/builder.module';
import { Machine } from '../machine/models/machine.model';

@Module({
  imports:[SequelizeModule.forFeature([Company,Builder,Machine]),
  forwardRef(()=>BuilderModule) ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports:[CompanyService]
})
export class CompanyModule {}
