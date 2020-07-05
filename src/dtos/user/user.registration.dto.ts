
import * as Validator from 'class-validator';
export class UserRegistrationDto{

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(2,60)
    forename:string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
     @Validator.Length(2,60)
    surname:string;

    @Validator.IsNotEmpty()
    @Validator.IsEmail({
      allow_ip_domain:false,//ne moze smao dshhdsa@127.0.0.1
      allow_utf8_local_part:true,
      require_tld:true,//ne moze samo kdaks@dsadsa
    })
    @Validator.Length(6,255)
    email:string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
     @Validator.Length(6,128)
    password:string;

    @Validator.IsString()
    @Validator.IsPhoneNumber(null)
    @Validator.Length(0,20)
    phone:string|null;
}