export class JwtDataUSerDto{
    userId:number;
    email:string;
    exp:number;
    ip:string;
    ua: string;

    toPlainObject(){
        return{
            userId:this.userId,
            email:this.email,
            exp:this.exp,
            ip:this.ip,
            ua:this.ua
        }

    }
}
