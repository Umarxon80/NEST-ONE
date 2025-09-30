import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateDriverDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;
  last_name: string;
  driver_license: string;
  phone: string;
}
