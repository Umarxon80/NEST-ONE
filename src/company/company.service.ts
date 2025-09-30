import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { Company } from "./models/company.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company) private readonly companyModel: typeof Company
  ) {}

  create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.companyModel.create(createCompanyDto);
  }

  async findAll(): Promise<Company[] | null> {
    const company= await this.companyModel.findAll({include:{all:true}});
    if (!company) {
      // throw new HttpException("Bunday companiya yoq",404)
      throw new NotFoundException("Bunday companiya yoq");
    }
    return company
  }

  findOne(id: number): Promise<Company | null> {
    return this.companyModel.findByPk(id);
  }
  findOneByName(name: string): Promise<Company | null> {
    return this.companyModel.findOne({ where: { name } });
  }


  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const updatedCompany= await this.companyModel.update(updateCompanyDto,{
      where:{id},
      returning:true
    })
    return updatedCompany[1][0];
  }

  async remove(id: number) {
    
    const delcount= await this.companyModel.destroy({where:{id}});
    if (!delcount) {
      return {message:"Bunday kompaniya yoq"}
    }
    return {message:"Kompaniya o'chirlidi",id}
  }
}
