import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { RoleService } from "../role/role.service";
import { Role } from "../role/models/role.model";
import { AddRemoveRoleDto } from "./dto/add-removev-role.dto";
import { ActivateUserDto } from "./dto/activate-user.dto";

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
    // await newUser.$set("role", [role.id]);

    return newUser;
  }

  findAll() {
    return this.userModel.findAll({ include: { all: true } });
  }

  async findUserByemail(email: string) {
    const user = await this.userModel.findOne({
      where: { email },
      include: {
        model: Role,
        attributes: ["value"],
        through: { attributes: [] },
      },
    });

    return user?.dataValues;
  }

  findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    await this.userModel.destroy({where:{id}})
    return `Foydalanuvchi ochirildi`;
  }

  async addRole(addRemoveRoleDto: AddRemoveRoleDto) {
    const { userId, value } = addRemoveRoleDto;

    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException("Bunday foydalanuchi yo'q");
    }
    const role = await this.roleService.findRoleByValue(value);
    if (!role) {
      throw new NotFoundException("Bunday role yo'q");
    }
    await user.$add("role", role.id);
    const updatedUser = await this.userModel.findByPk(userId, {
      include: {
        model: Role,
        attributes: ["value"],
        through: { attributes: [] },
      },
    });
    return updatedUser?.dataValues;
  }

  async romoveRole(addRemoveRoleDto: AddRemoveRoleDto) {
    const { userId, value } = addRemoveRoleDto;
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException("Bunday foydalanuchi yo'q");
    }
    const role = await this.roleService.findRoleByValue(value);
    if (!role) {
      throw new NotFoundException("Bunday role yo'q");
    }
    await user.$remove("role", role.id);
    const updatedUser = await this.userModel.findByPk(userId, {
      include: {
        model: Role,
        attributes: ["value"],
        through: { attributes: [] },
      },
    });
    return updatedUser;
  }

  async activateUser(activateUserDto: ActivateUserDto) {
    const { userId } = activateUserDto;
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException("Bunday foydalanuchi yo'q");
    }
    user.is_active = true;
    await user.save();
    return { message: "User activated" };
  }
}
