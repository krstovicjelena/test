import * as Validator from 'class-validator';
export class EditAdvertisementDto{
    @Validator.IsNotEmpty()
    @Validator.IsPositive()
    @Validator.IsNumber({
      allowInfinity:false,
      allowNaN: false, 
      maxDecimalPlaces: 0  
    })
    price:number;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(20,10000)
    description:string;

    @Validator.IsNotEmpty()
    @Validator.IsPositive()
    @Validator.IsNumber({
      allowInfinity:false,
      allowNaN: false, 
      maxDecimalPlaces: 0  
    })
    kilometer:number;

    @Validator.IsString()
    @Validator.Length(0,255)
    tags:string;
    
 

}