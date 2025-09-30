import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBuilderDto } from './dto/create-builder.dto';
import { UpdateBuilderDto } from './dto/update-builder.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Builder } from './models/builder.model';
import { Company } from '../company/models/company.model';
import { CompanyService } from '../company/company.service';

@Injectable()
export class BuilderService {
  constructor(
      @InjectModel(Builder) private readonly builderModel: typeof Builder,
      private readonly companyServise:CompanyService
    ) {}

  async create(CreateBuilderDto:CreateBuilderDto){
    const {companyId}=CreateBuilderDto
    const company = await this.companyServise.findOne(companyId)
    
    return this.builderModel.create(CreateBuilderDto)
  }

  findAll() {
    return this.builderModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.builderModel.findByPk(id);
  }

  async update(id: number, updateBuilderDto: UpdateBuilderDto) {
  const updatedbuilder = await this.builderModel.update(updateBuilderDto, {
    where: { id },
    returning: true,
  });
  return updatedbuilder[1][0];  }

  async remove(id: number) {
 const delcount = await this.builderModel.destroy({ where: { id } });
 if (!delcount) {
   return { message: "Bunday kompaniya yoq" };
 }
 return { message: "Kompaniya o'chirlidi", id };  }  }

