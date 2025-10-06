import { JwtService } from "@nestjs/jwt";
import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";
import { Test } from "@nestjs/testing";
import { User } from "../models/user.model";
import { CreateUserDto } from "../dto/create-user.dto";
import { userStub } from "./stabs/user.stab";

jest.mock("../users.service");

describe("Users controller test, ", () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, JwtService],
    }).compile();

    usersController = moduleRef.get(UsersController);
    usersService = moduleRef.get(UsersService);

    jest.clearAllMocks();
  });

  test("User controller should be defined", () => {
    expect(usersController).toBeDefined();
  });
  it("User service should be defined", () => {
    expect(usersService).toBeDefined();
  });

  describe("create user test", () => {
    describe("when create user is called", () => {
      let user: User;
      let createUserDto: CreateUserDto;
      const dto = userStub();
      beforeAll(async () => {
        createUserDto = {
          name: dto.name,
          email: dto.email,
          password: dto.password,
          value: dto.value,
        };

        (usersService.create as jest.Mock).mockResolvedValue(userStub());

        user = await usersController.create(createUserDto);
        console.log(user);
      });
      it("then it should call userService", () => {
        expect(usersService.create).toHaveBeenCalledWith(createUserDto);
      });
      it("then it should returt", () => {
        expect(user).toEqual(userStub());
      });
    });
  });

 describe("find all users test", () => {
   describe("when find all user is called", () => {
     let users: User[];
     beforeAll(async () => {
       // 👇 mock what the service should return
       (usersService.findAll as jest.Mock).mockResolvedValue([userStub()]);

       users = await usersController.findAll();
     });

     it("then it should call userService", () => {
       expect(usersService.findAll).toHaveBeenCalled(); // ✅ don't call it again
     });

     it("then it should return", () => {
       expect(users).toEqual([userStub()]);
     });
   });
 });

});


