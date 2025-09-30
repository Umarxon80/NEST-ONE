import { forwardRef, Module } from '@nestjs/common';
import { BuilderService } from './builder.service';
import { BuilderController } from './builder.controller';
import { Builder } from './models/builder.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from '../company/models/company.model';
import { CompanyModule } from '../company/company.module';

@Module({
  imports:[
    SequelizeModule.forFeature([Builder,Company]),
    forwardRef(()=>CompanyModule) 
  ],
  controllers: [BuilderController],
  providers: [BuilderService],
  exports:[BuilderService]
})
export class BuilderModule {}
