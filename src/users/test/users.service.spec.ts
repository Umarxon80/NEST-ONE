import { Test, TestingModule } from "@nestjs/testing"
import { UsersService } from "../users.service"
import { JwtService } from "@nestjs/jwt"
import { getModelToken } from "@nestjs/sequelize"
import { userStub } from "./stabs/user.stab"
import { RoleService } from "../../role/role.service"
import { User } from "../models/user.model"
import { Role } from "../../role/models/role.model"
import { CreateUserDto } from "../dto/create-user.dto"


describe("Users service", ()=>{
    let userService:UsersService;
    const mockUsersModel = {
      create: jest.fn().mockImplementation(userStub),
      findOne: jest.fn().mockImplementation(userStub),
      findAll: jest.fn().mockImplementation(()=>[userStub()]),
      findByPk: jest.fn().mockImplementation(userStub),
      destroy: jest.fn(),
    };
    const mockRolesModel={
        findOne:jest.fn().mockImplementation((value:string)=>"USER")
    }


    beforeAll(async ()=>{
        const moduleRef: TestingModule = await Test.createTestingModule({
          imports: [],
          providers: [
            UsersService,
            JwtService,
            RoleService,
            {
              provide: getModelToken(User),
              useValue: mockUsersModel,
            },
            {
              provide: getModelToken(Role),
              useValue: mockRolesModel
            },
          ],
        }).compile()
    userService = moduleRef.get<UsersService>(UsersService);
    })
    it("should be definded",()=>{
        expect(userService).toBeDefined()
    });



    describe("createUser",()=>{
        describe("when create User is called", ()=>{
            let createUserDto:CreateUserDto;
            let newUser:User;
            beforeEach(async ()=>{
                createUserDto = {
                  name: userStub().name!,
                  email: userStub().email!,
                  password: userStub().password!,
                  value: "user",
                };
            newUser = await userService.create(createUserDto)
            console.log(newUser);

            expect(mockUsersModel.create).toHaveBeenCalled();
            expect(newUser).toEqual(userStub());
            expect(newUser).toMatchObject({
                ...userStub(),
               })
            })
        })
    })


    describe("findOne", ()=>{
        describe("when findOne is called", ()=>{
            test("then it should call userService", async ()=>{
                expect (await userService.findOne(userStub().id!)).toEqual(userStub())
            } )
        })
    })
})