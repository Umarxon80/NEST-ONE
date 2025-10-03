import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AddRemoveRoleDto } from "./dto/add-removev-role.dto";
import { ActivateUserDto } from "./dto/activate-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./models/user.model";

@ApiTags("Users-Foydalanuvchi")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: "Foydalanuvchi qo'shish",
  })
  @ApiResponse({
    status: 201,
    description: "Yangi user",
    type: User,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post("add-role")
  @HttpCode(200)
  addRole(@Body() addRemoveRoleDto: AddRemoveRoleDto) {
    return this.usersService.addRole(addRemoveRoleDto);
  }

  @Post("activate")
  @HttpCode(200)
  activateUser(@Body() activateUserDto: ActivateUserDto) {
    return this.usersService.activateUser(activateUserDto);
  }

  @Post("remove-role")
  @HttpCode(200)
  removeRole(@Body() addRemoveRoleDto: AddRemoveRoleDto) {
    return this.usersService.romoveRole(addRemoveRoleDto);
  }

  @ApiResponse({
    status: 200,
    description: "Userlar royhati",
    type: [User],
  })-
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get("email/:email")
  findUserByEmail(@Param("email") email: string) {
    return this.usersService.findUserByemail(email);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
