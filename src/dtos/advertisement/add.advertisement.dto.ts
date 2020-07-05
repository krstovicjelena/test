
import * as Validator from 'class-validator';
export class AddAdvertisementDto{
    userId:number;

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
    door:number;

    @Validator.IsString()
    @Validator.IsNotEmpty()
    @Validator.Length(3,255)
    photo:string;

    @Validator.IsString()
    @Validator.IsNotEmpty()
    @Validator.Length(3,30)
    color:string;

    @Validator.IsNotEmpty()
    @Validator.IsPositive()
    @Validator.IsNumber({
      allowInfinity:false,
      allowNaN: false, 
      maxDecimalPlaces: 0  
    })
    cubic_capacity:number;

    @Validator.IsNotEmpty()
    @Validator.IsPositive()
    @Validator.IsNumber({
      allowInfinity:false,
      allowNaN: false, 
      maxDecimalPlaces: 0  
    })
    power:number;

    @Validator.IsNotEmpty()
    @Validator.IsPositive()
    @Validator.IsNumber({
      allowInfinity:false,
      allowNaN: false, 
      maxDecimalPlaces: 0  
    })
    kilometer:number;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.IsIn(["Owner", "Agency"])
    seller: 'Owner' | "Agency";

    @Validator.IsString()
    @Validator.Length(0,255)
    tags:string;
    
    vehicle_type_id:number;
    transmisson_id:number;
    model_id:number;
    fuel_type_id:number;

    @Validator.IsNotEmpty()
    @Validator.IsPositive()
    @Validator.IsNumber({
    allowInfinity:false,
    allowNaN: false, 
    maxDecimalPlaces: 0  
  })
  yearOfProduction: number;
    

}