import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Driver } from './models/driver.model';
import { FileModule } from '../file/file.module';

@Module({
  imports:[SequelizeModule.forFeature([Driver]),FileModule],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
