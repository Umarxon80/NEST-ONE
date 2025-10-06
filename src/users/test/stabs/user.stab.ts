import { Role } from "../../../role/models/role.model";
import { User } from "../../models/user.model";

export const userStub=()=>{
    return {
      id: 1,
      name: "user1",
      email: "user1@mail.uz",
      password: "123456",
      is_active:true,
      value: "admin",
    };
}