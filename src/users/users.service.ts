import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { RoleService } from "../role/role.service";
import { Role } from "../role/models/role.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly roleService: RoleService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const role = await this.roleService.findRoleByValue(createUserDto.value);
    if (!role) {
      throw new NotFoundException("Bunday role yo'q");
    }
    const newUser = await this.userModel.create(createUserDto);
    await newUser.$set("role", [role.id]);
    return newUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findUserByemail(email: string) {
    const user = await this.userModel.findOne({
      where: { email },
      include: {model:Role,
        attributes:["value"],
        through:{attributes:[]}
      },
    });
    return {user,usd:user?.dataValues};
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
