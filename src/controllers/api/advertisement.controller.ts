import { Controller, Post, Body, Patch, Param, Get, UseInterceptors, UploadedFile } from "@nestjs/common";
import { AdvertisementService } from "../../services/advertisement/advertisement.service";
import { AddAdvertisementDto } from "src/dtos/advertisement/add.advertisement.dto";
import { EditAdvertisementDto } from "src/dtos/advertisement/edit.advertisement.dto";
import { Vehicle } from "src/entities/vehicle.entity";
import { ApiResponse } from "src/misc/api.response.class";
import { Advertisement } from "src/entities/advertisement.entity";
import {FileInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import { StorageConfig } from "config/storage.config";
import { InjectRepository } from "@nestjs/typeorm";
import { Crud } from "@nestjsx/crud";
import { AdvertisementSearchDto } from "src/dtos/advertisement/advertisement.search.dto";

@Controller('api/advertisement')
@Crud({
    model:{
        type:Advertisement
    },
    params:{
        id:{
            field:'advertisementId',  
            type:'number',
            primary:true      }
    },

    query :{
        join:{
            vehicle :{
                eager:true
            }

        }
    },

    

    routes:{
        only:[
            "getManyBase",
            "getOneBase"
        ]
    }
})
export class AdvertisementController {
    constructor(
        public service:AdvertisementService
    ){}

    @Post('createFull')
    createfull(@Body() data:AddAdvertisementDto){
        return this.service.createFullAdvertisement(data);
    }

    @Patch(':id')
    edit(@Param('id') id:number, @Body() data:EditAdvertisementDto):Promise<Vehicle|ApiResponse>{
        return this.service.editById(id,data);
    }

    @Get('delete/:id')
    activation(@Param('id') id:number):Promise<Advertisement|ApiResponse>{
        return this.service.deactivateByid(id);
    }


    @Post('search')
    async search(@Body() data:AdvertisementSearchDto):Promise<Vehicle[]>{
        return await this.service.search(data);

    }
    

  /*  @Post(':id/uploadPhoto/')
    @UseInterceptors(FileInterceptor('photo',{
        storage:diskStorage({
            destination:StorageConfig.photos,
            filename:(req,file,callback)=> {
                let original=file.originalname;
                let normalized= original.replace(/\W+/g,'-'); //bilo koju belinu globalno zameni sa crtom
                let sada=new Date();
                let datePart='';
                datePart += sada.getFullYear().toString();
                datePart += (sada.getMonth()+1).toString();
                datePart += sada.getDate().toString();

                let randomPart:string=new Array(10).fill(0).map(e=>(Math.random()*9).toString()).join('');

                let fileName=datePart + '-' + randomPart + '-' +normalized;

                callback(null,fileName);
            }
        })

    }))
    uploadPhoto(@Param('id') advertismentId:number,@UploadedFile() photo){
        let imagePath=photo.fileName;

        let a=this.service.getById(advertismentId);
        




    }*/
}