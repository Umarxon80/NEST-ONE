import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { signinUserDto } from "../users/dto/signin-user.dto";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/models/user.model";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  private async generateToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    return { token: this.jwtService.sign(payload) };
  }

  async signup(createUserDto: CreateUserDto) {
    const candidate = await this.userService.findUserByemail(
      createUserDto.email
    );

    if (candidate) {
      throw new ConflictException("Bunday foydalanuvchi mavjud");
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 7);
    createUserDto.password = hashedPassword;
    createUserDto.value = "USER";
    const newUser = await this.userService.create(createUserDto);
    return newUser;
  }

  async signin(signinUserDto: signinUserDto) {
    const user = await this.userService.findUserByemail(signinUserDto.email);
    if (!user) {
      throw new UnauthorizedException("Email yoki parol noto'gri");
    }
    const verifyPassword = await bcrypt.compare(
      signinUserDto.password,
      user.password
    );
    if (!verifyPassword) {
      throw new UnauthorizedException("Email yoki parol noto'gri");
    }
    return this.generateToken(user);
  }
}
