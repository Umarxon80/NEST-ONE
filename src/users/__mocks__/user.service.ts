import { userStub } from "../test/stabs/user.stab";


export const UsersService = jest.fn().mockReturnValue({
    create: jest.fn().mockResolvedValue(userStub()),
    findOne: jest.fn().mockResolvedValue([userStub]),
    findAll: jest.fn().mockResolvedValue([userStub]),
    remove:jest.fn().mockReturnValue({
        message:"Foydalanuvchi ochirildi"
    })
})