export class LoginInfoUserDto{
    userId:number;
    email:string;
    token:string;

    constructor(id:number,em:string,jwt:string){
        this.userId=id;
        this.email=em;
        this.token=jwt;
    }
}