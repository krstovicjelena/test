import { Controller, Post, Body, Req, HttpException, HttpStatus, Put } from "@nestjs/common";
import { LoginUserDto } from "src/dtos/user/login.user.dto";
import { ApiResponse } from "src/misc/api.response.class";
import * as crypto from 'crypto';
import { LoginInfoUserDto } from "src/dtos/auth/login.info.user.dto";
import * as jwt from 'jsonwebtoken';
import { Request } from "express";
import { jwtSecret } from "../../../config/jwt.secret";
//import { JwtRefreshDataEmployeeDto } from "src/dtos/users/jwt.refresh.dto";
//import { EmployeeRefreshTokenDto } from "src/dtos/users/user.refresh.token.dto";
import { UserService } from "src/services/user/user.service";
import { JwtDataUSerDto } from "src/dtos/auth/jwt.data.user.dto";
import { UserRegistrationDto } from "src/dtos/user/user.registration.dto";


 
@Controller('auth')
export class AuthController{
    constructor(public userService:UserService,
        
        ){}

    @Post('login')
    async doLogin(@Body() data:LoginUserDto, @Req() req:Request):Promise<ApiResponse|LoginInfoUserDto>{
        const user = await this.userService.getByEmail(data.email);

        if(!user){
            return new Promise(resolve=>resolve(new ApiResponse('error',-3001, "Nije pronadjem korisnik")));
        }

        const passwordHash=crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        if(user.passwordHash !==passwordHashString){
            return new Promise(resolve=>resolve(new ApiResponse('error',-3002, "Nije dobar password")));
        }
        
        //token je json koji u sebi sadrsi userId, username, exp, ip, ua

        const jwtData=new JwtDataUSerDto();
        jwtData.userId=user.userId;
        jwtData.email=user.email;
        jwtData.exp=this.getDatePlus(60*60*24*31);
        jwtData.ip=req.ip.toString();
        jwtData.ua=req.headers["user-agent"];



        let token:string=jwt.sign(jwtData.toPlainObject(),jwtSecret); //jwt secret tajni kod za sifrovanje preko koga se sifruje json

        /*const jwtRefreshData=new JwtRefreshDataEmployeeDto();
        jwtRefreshData.userId=user.userId;
        jwtRefreshData.username=user.username;
        jwtRefreshData.exp=this.getDatePlus(60*60*24*31);
        jwtRefreshData.ip=req.ip.toString();
        jwtRefreshData.ua=req.headers["user-agent"];

        let refreshToken:string=jwt.sign(jwtRefreshData.toPlainObject(),jwtSecret);*/

        const responseObject=new LoginInfoUserDto(
            user.userId,
            user.email,
            token,
           //this.getIsoDate(jwtRefreshData.exp)
           );

        //await this.userService.addToken(user.userId,this.getDataBaseDateFormat(this.getIsoDate(jwtRefreshData.exp)))
        return new Promise(resolve=>resolve(responseObject))
        
    }

    @Put('user/register')
    async userRegister(@Body() data:UserRegistrationDto){
       return await this.userService.register(data);
        
    }

   /* @Post('refresh')
    async userTokenRefresh(@Req() req:Request,@Body() data:EmployeeRefreshTokenDto):Promise<LoginInfoUserDto|ApiResponse>{
         const empToken = await this.userService.getEmployeeToken(data.token);

         if (!empToken){
            return new ApiResponse("error",-10002,"No such refresh token")
         }

         if(empToken.isValid == 0){
            return new ApiResponse("error",-10003,"The token is no longer valid")
         }

         const sada=new Date();
         const datumIsteka=new Date(empToken.expiresAt);
         if(datumIsteka.getTime()<sada.getTime()){
            return new ApiResponse("error",-10004,"The token has expired")
         }
          //formiraj jwt objekat
        let jwtRefreshData:JwtRefreshDataEmployeeDto;

        try{
            jwtRefreshData=jwt.verify(data.token,jwtSecret);}
        catch(e){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED); 
           
        }

         //ako nije ok jwtData opet Http Exception
         if(!jwtRefreshData){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED); 
        }
        if(jwtRefreshData.ip !== req.ip.toString()){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED); 
        }
        if(jwtRefreshData.ua !== req.headers["user-agent"]){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED); 
        }
        
        const jwtData=new JwtDataEmployeeDto();
        jwtData.userId=jwtRefreshData.userId;
        jwtData.username=jwtRefreshData.username;
        jwtData.exp=this.getDatePlus(60*5);
        jwtData.ip=jwtRefreshData.ip;
        jwtData.ua=jwtRefreshData.ua;

        let token:string=jwt.sign(jwtData.toPlainObject(),jwtSecret);

          const responseObject=new LoginInfoUserDto(
            jwtData.userId,
            jwtData.username,
            token,
            data.token,
            this.getIsoDate(jwtRefreshData.exp));

        return responseObject;
         
    }*/


    private getDatePlus(numberOfSeconds:number){
        return new Date().getTime() / 1000 + numberOfSeconds;
    }

    private getIsoDate(timestamp:number){
        const date=new Date();
        date.setTime(timestamp*1000); 
        return date.toISOString();


    }

    private getDataBaseDateFormat(iso:string):string{
        return iso.substr(0,19).replace('T',' ');
    }
}