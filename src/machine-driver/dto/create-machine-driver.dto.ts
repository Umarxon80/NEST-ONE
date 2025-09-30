import { IsInt, IsNumber, Min } from "class-validator";

export class CreateMachineDriverDto {
  @IsNumber()
  @Min(1)
  machineId: number;
  @IsInt()
  driverId: number;
}
