import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './models/driver.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class DriverService {
  constructor(
      @InjectModel(Driver) private readonly driverModel: typeof Driver
    ) {}

  

  create(createDriverDto: CreateDriverDto) {
    return this.driverModel.create(createDriverDto);
  }

  findAll() {
    return this.driverModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.driverModel.findByPk(id);
  }

  async update(id: number, updateDriverDto: UpdateDriverDto) {
    const updateDriver= await this.driverModel.update(updateDriverDto,{where:{id},returning:true})
    return updateDriver[1][0]
  }

  async remove(id: number) {
    const delcount = await this.driverModel.destroy({where:{id}})
    if (!delcount) {
      return {message:"Bunday driver yo'q"}
    }
    return {message:"Driver o'chirildi",id}
  }

}
