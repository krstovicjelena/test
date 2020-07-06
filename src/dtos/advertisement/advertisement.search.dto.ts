import * as Validator from 'class-validator';
import { TagVehicleSearchComponentDto } from './tag.vehicle.search.component.dto';
import { CategoriesSearchComponentDto } from './categories.search.component.dto';

export class AdvertisementSearchDto{
    @Validator.IsOptional()
    @Validator.IsPositive()
    @Validator.IsNumber({
      allowInfinity:false,
      allowNaN: false, 
      maxDecimalPlaces: 0  
    })
    priceMin:number;
     
    @Validator.IsOptional()
    @Validator.IsPositive()
    @Validator.IsNumber({
      allowInfinity:false,
      allowNaN: false, 
      maxDecimalPlaces: 0  
    })
    priceMax:number;
    

    @Validator.IsOptional()
    @Validator.IsString()
    make:string;

    @Validator.IsOptional()
    @Validator.IsString()
    model:string;

    @Validator.IsOptional()
    @Validator.IsString()
    transsmision:string;

    @Validator.IsOptional()
    @Validator.IsPositive()
    @Validator.IsNumber({
      allowInfinity:false,
      allowNaN: false, 
      maxDecimalPlaces: 0  
    })
    yearOfProductionMin:number;

    @Validator.IsOptional()
    @Validator.IsPositive()
    @Validator.IsNumber({
      allowInfinity:false,
      allowNaN: false, 
      maxDecimalPlaces: 0  
    })
    yearOfProductionMax:number;

   @Validator.IsOptional()
    @Validator.IsString()
    type:string;
    
    @Validator.IsOptional()
    @Validator.IsString()
    fuel:string;

    @Validator.IsOptional()
    @Validator.IsString()
    @Validator.IsIn(["Owner", "Agency"])
    seller: 'Owner' | 'Agency';

    @Validator.IsOptional()
    @Validator.IsPositive()
    @Validator.IsNumber({
      allowInfinity:false,
      allowNaN: false, 
      maxDecimalPlaces: 0  
    })
    kilometerMin:number;

    @Validator.IsOptional()
    @Validator.IsPositive()
    @Validator.IsNumber({
      allowInfinity:false,
      allowNaN: false, 
      maxDecimalPlaces: 0  
    })
    kilometerMax:number;

    @Validator.IsOptional()
    @Validator.IsPositive()
    @Validator.IsNumber({
      allowInfinity:false,
      allowNaN: false, 
      maxDecimalPlaces: 0  
    })
    door:number;

    @Validator.IsOptional()
    @Validator.IsPositive()
    @Validator.IsNumber({
      allowInfinity:false,
      allowNaN: false, 
      maxDecimalPlaces: 0  
    })
    cubicCapacityMin:number;

    @Validator.IsOptional()
    @Validator.IsPositive()
    @Validator.IsNumber({
      allowInfinity:false,
      allowNaN: false, 
      maxDecimalPlaces: 0  
    })
    cubicCapacityMax:number;

    @Validator.IsOptional()
    @Validator.IsPositive()
    @Validator.IsNumber({
      allowInfinity:false,
      allowNaN: false, 
      maxDecimalPlaces: 0  
    })
    powerMin:number;

    @Validator.IsOptional()
    @Validator.IsPositive()
    @Validator.IsNumber({
      allowInfinity:false,
      allowNaN: false, 
      maxDecimalPlaces: 0  
    })
    powerMax:number;

    @Validator.IsOptional()
    @Validator.IsString()
    @Validator.Length(3,30)
    color:string;

   
   
    @Validator.IsOptional()
    @Validator.IsPositive()
    @Validator.IsNumber({
      allowInfinity:false,
      allowNaN: false, 
      maxDecimalPlaces: 0  
    })
    page:number;

    
    tags: TagVehicleSearchComponentDto[];
    categories: CategoriesSearchComponentDto[];
    

    @Validator.IsOptional()
    @Validator.IsIn([5,10,25,50,75])
    itemsPerPage:5 | 10 | 25 | 50 | 75;




    

}