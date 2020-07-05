import { Controller, Get, Param } from "@nestjs/common";

import { UserService } from "../../services/user/user.service";
import { User } from "../../entities/user.entity";




@Controller('api/user')
export class UserController{
    constructor(
        private service:UserService
    ){}

    @Get()
    getAllUsers(): Promise<User[]> {
      return this.service.getAll();
    }
    @Get(':id')
    getById(@Param('id') userId:number): Promise<User> {
      return this.service.getById(userId);
    }


}


