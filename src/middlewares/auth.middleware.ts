import { NestMiddleware, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user/user.service";
import * as jwt from 'jsonwebtoken';
import { JwtDataUSerDto } from "../dtos/auth/jwt.data.user.dto";
import { jwtSecret } from "../../config/jwt.secret";

//nas mw treba da presretne req i pronadje u hederu vrednost kod nas je to authorization 
//taj string je heshovan sifrovan json objekat koji sadrzi info o tom eko smo mi koji saljemno a da ni mi sami ne znamo sadrzaj tog tokena
//znamo samo da je pripremnjen od strane app i da joj ga posaljemo i ona utvrdjuje ko smo mi na osnovu njega 
// poredice da li u tom tokenu stoji info o ip, ua da li se to sve poklapa
/*
posto token ima odredjeno vreme vazenja isteci ce i nasa app bice spremna da to utvrdi i kada se to desi
trazice novi ili ce nas redirectovati na login na nama je da odlucimo sta cemo
*/ 
@Injectable() //injektuje se u apply fju consumera
export class AuthMiddleware implements NestMiddleware{
    constructor(private readonly userService:UserService){}
    async use(req:Request, res: Response, next: NextFunction) { //NEXT JE FUNKCIJA KOJA SE SLEDECE POKRECE
        //ako je sve proslo ok pozivamo samo next, a ako ne onda hvatamo izuzetak
        //ako nemamo header authorization prekidamo dalji rad
        if(!req.headers.authorization){
            throw new HttpException("Token not found", HttpStatus.UNAUTHORIZED); //nema tokena nije autoziovan
        }
        //izvuci token
        const token = req.headers.authorization;

        //ovo radimo zbog postmana da ne bi imali svaki put rucno unosenje tokena
        const tokenParts=token.split(' ');
        if(tokenParts.length!==2){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED); 
        }
        const tokenString=tokenParts[1];

        //formiraj jwt objekat
        let jwtData:JwtDataUSerDto;

        try{
        jwtData=jwt.verify(tokenString,jwtSecret);}
        catch(e){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED); 
        }
        //ako nije ok jwtData opet Http Exception
        if(!jwtData){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED); 
        }
        if(jwtData.ip !== req.ip.toString()){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED); 
        }
        if(jwtData.ua !== req.headers["user-agent"]){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED); 
        }
        const user=await this.userService.getById(jwtData.userId);
        if(!user){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED);  
        }

        const trenutno=new Date().getTime()/1000; 
        if(trenutno>=jwtData.exp){
            throw new HttpException("Token has expired", HttpStatus.UNAUTHORIZED); 
        }

        //ukoliko se nije desila nijedna od prethodno navedenih mogucih gresaka samo idemo next
        //da li nas middleware treba da prekine i oresretne dalje izvrsavanje metoda
        next();
        
    }

}