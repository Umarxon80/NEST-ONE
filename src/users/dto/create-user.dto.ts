import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

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
  @IsStrongPassword(
    {minLength:6,minUppercase:0,minSymbols:0},
    {message:"Parol yetarlicha mustahkam emas"}
  )
  password: string;

  @ApiProperty({
    example: "user",
    description: "Foydalanuvchi role",
  })
  value: string;
}
