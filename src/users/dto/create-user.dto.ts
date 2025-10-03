import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "user1",
    description: "Foydalanuvchi ismi",
  })
  name: string;

  @ApiProperty({
    example: "user1@mail.uz",
    description: "Foydalanuvchi emaili",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "123456",
    description: "Foydalanuvchi paroli",
  })
  password: string;

  @ApiProperty({
    example: "user",
    description: "Foydalanuvchi role",
  })
  value: string;
}
