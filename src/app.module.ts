import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { CompanyModule } from './company/company.module';
import { Company } from "./company/models/company.model";
import { BuilderModule } from './builder/builder.module';
import { Builder } from "./builder/models/builder.model";
import { DriverModule } from './driver/driver.module';
import { MachineModule } from './machine/machine.module';
import { Machine } from "./machine/models/machine.model";
import { Driver } from "./driver/models/driver.model";
import { MachineDriverModule } from './machine-driver/machine-driver.module';
import { MachineDriver } from "./machine-driver/models/machine-driver.model";
import { RoleModule } from './role/role.module';
import { Role } from "./role/models/role.model";
import { UsersModule } from './users/users.module';
import { UserRole } from "./users/models/user-role.model";
import { User } from "./users/models/user.model";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      models: [Company,Builder,Machine,Driver,MachineDriver,Role,UserRole,User],
      autoLoadModels: true,
      logging: true,
      sync: { alter: true },
    }),
    CompanyModule,
    BuilderModule,
    DriverModule,
    MachineModule,
    MachineDriverModule,
    RoleModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
