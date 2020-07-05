import * as Validator from 'class-validator';
import { Vehicle } from 'src/entities/vehicle.entity';
import { VehicleTagComponentDto } from './vehicle.tag.component.dto';
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
    @Validator.Length(5,10000)
    description:string;

    @Validator.IsNotEmpty()
    @Validator.IsPositive()
    @Validator.IsNumber({
      allowInfinity:false,
      allowNaN: false, 
      maxDecimalPlaces: 0  
    })
    kilometer:number;

    @Validator.IsOptional()
    @Validator.IsArray()
    @Validator.ValidateNested({
        always: true,
    })
    tags: VehicleTagComponentDto[] | null;
    
 

}