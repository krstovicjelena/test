import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../entities/user.entity";
import { UserRegistrationDto } from "src/dtos/user/user.registration.dto";
import { ApiResponse } from "src/misc/api.response.class";
import * as crypto from 'crypto';

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private readonly user:Repository<User>
    ){}

    getAll():Promise<User[]>{
        return this.user.find();
    }
    getById(id:number):Promise<User>{
        return this.user.findOne(id);
    }

    async getByEmail(email:string):Promise<User|null>{
        const u=await this.user.findOne({
            email:email
        });
        if(u){
            return u;
        }

        return null;

    }


    async register(data: UserRegistrationDto):Promise<User|ApiResponse>{

        const passwordHash=crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        const newUser:User=new User();
        newUser.email=data.email;
        newUser.passwordHash=passwordHashString;
        newUser.forename=data.forename;
        newUser.surname=data.surname;
        newUser.phone=data.phone;

        try{
            const savedUser=await this.user.save(newUser);

            if(!savedUser){
                throw new Error('');
            }
            return savedUser;
        }
        catch(e){
            return new ApiResponse('error',-6001,'Ne moze se kreirati nalog');
        }

    }
}