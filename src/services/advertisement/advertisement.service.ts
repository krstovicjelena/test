import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddAdvertisementDto } from "../../dtos/advertisement/add.advertisement.dto";
import { ApiResponse } from "../../misc/api.response.class";
import { Advertisement } from "../../entities/advertisement.entity";
import { Vehicle } from "../../entities/vehicle.entity";
import { EditAdvertisementDto } from "../../dtos/advertisement/edit.advertisement.dto";
import{TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import { AdvertisementSearchDto } from "../../dtos/advertisement/advertisement.search.dto";
import { Model } from "../../entities/model.entity";
import { TagVehicle } from "../../entities/tagVehicle.entity";


@Injectable()
export class AdvertisementService extends TypeOrmCrudService<Advertisement>{
    constructor(
        
        @InjectRepository(Vehicle) private readonly vehicle:Repository<Vehicle>,
        @InjectRepository(Advertisement) private readonly adv:Repository<Advertisement>,
        @InjectRepository(Model) private readonly model:Repository<Model>,
        @InjectRepository(TagVehicle) private readonly tagv:Repository<TagVehicle>
        

    ){super(adv)}

    async createFullAdvertisement(data:AddAdvertisementDto):Promise<Advertisement|ApiResponse>{
      
        let newVehicle :Vehicle = new Vehicle();

        
        newVehicle.price=data.price;
        newVehicle.description=data.description;
        newVehicle.door=data.door;
        newVehicle.photo=data.photo;
        newVehicle.color=data.color;
        newVehicle.cubicCapacity=data.cubic_capacity;
        newVehicle.power=data.power;
        newVehicle.kilometer=data.kilometer;
        newVehicle.seller=data.seller;
        newVehicle.transmissonId=data.transmisson_id;
        newVehicle.modelId=data.model_id;
        newVehicle.fuelTypeId=data.fuel_type_id;
        newVehicle.userId=data.userId;
        newVehicle.categoryId=data.userId;
        newVehicle.yearOfProduction=data.yearOfProduction;
        

        let savedVehicle = await this.vehicle.save(newVehicle);

        
        for (let tag of data.tags) {
            let newTagVehicle: TagVehicle = new TagVehicle();
            newTagVehicle.vehicleId = savedVehicle.vehicleId;
            newTagVehicle.tagId = tag.tagId;

            await this.tagv.save(newTagVehicle);
        }

        let newAdvertisement:Advertisement = new Advertisement();

        newAdvertisement.vehicleId=savedVehicle.vehicleId;

        return await this.adv.save(newAdvertisement);

        


    }

    async editById(id:number,data:EditAdvertisementDto):Promise<Vehicle|ApiResponse>{
        let a=await this.adv.findOne(id);

        if(a===undefined){
            return new Promise((resolve)=>{
                resolve(new ApiResponse("error",-1002,"Ne postoji oglas sa ovim id-jem"));
            })
        }

        let v = await this.vehicle.findOne(a.vehicleId, {
            relations: [ 'tagVehicles']
        });
        if(v===undefined){
            return new Promise((resolve)=>{
                resolve(new ApiResponse("error",-1003,"Ne postoji vozilo sa ovim id-jem"));
            })
        }

        v.price=data.price;
        v.kilometer=data.kilometer;
        v.description=data.description;

        const savedVehicle=await this.vehicle.save(v);
        if (!savedVehicle) {
            return new ApiResponse('error', -5002, 'Could not save new vehicle data.');
        }

        
        if (data.tags !== null) {
            await this.tagv.remove(v.tagVehicles);

            for (let tag of data.tags) {
                let newTagVehicle: TagVehicle = new TagVehicle();
                newTagVehicle.vehicleId = id;
                newTagVehicle.tagId = tag.tagId;
               
    
                await this.tagv.save(newTagVehicle);
            }
        }
        return await this.vehicle.findOne(id, {
            relations: [
              
                "tagVehicles"
            ]
        });

      

    }


    async deactivateByid(id:number):Promise<Advertisement|ApiResponse>{
        let a=await this.adv.findOne(id);
        if(a===undefined){
            return new Promise((resolve)=>{
                resolve(new ApiResponse("error",-1002,"Ne postoji oglas sa ovim id-jem"));
            })
        }
    a.status=!a.status;
    return this.adv.save(a);
}



getById(id:number):Promise<Advertisement>{
    return this.adv.findOne(id);
}

async search(data: AdvertisementSearchDto):Promise<Vehicle[]>{
    const builder = await this.vehicle.createQueryBuilder("vehicle");
   
    builder.innerJoin("vehicle.tagVehicles","tv");
    builder.innerJoin("vehicle.category","c");
    builder.innerJoin("tv.tag","tg");
    builder.innerJoin("vehicle.transmisson","t");
    builder.innerJoin("vehicle.model","m");
    builder.innerJoin("vehicle.fuelType","ft");
    builder.innerJoin("m.make","mm");

    
    

    if(data.priceMin && typeof data.priceMin==='number' ){
        builder.where('vehicle.price >=:min ',{min:data.priceMin}) 
    }

    if(data.priceMax && typeof data.priceMax==='number' ){
        builder.andWhere('vehicle.price <=:max ',{max:data.priceMax}) 
    }

    
    if(data.yearOfProductionMin && typeof data.yearOfProductionMin==='number' ){
        builder.andWhere('vehicle.yearOfProduction >= :ymin ',{ymin:data.yearOfProductionMin})
    }

    if(data.yearOfProductionMax && typeof data.yearOfProductionMax==='number' ){
        builder.andWhere('vehicle.yearOfProduction <=:ymax ',{ymax:data.yearOfProductionMax})
    }

    if(data.powerMin && typeof data.powerMin==='number' ){
        builder.andWhere('vehicle.power >=:pmin ',{pmin:data.powerMin})
    }

    if(data.powerMax && typeof data.powerMax==='number' ){
        builder.andWhere('vehicle.power <=:pmax ',{pmax:data.powerMax})
    }

    if(data.door && typeof data.door==='number' ){
        builder.andWhere('vehicle.door LIKE :d ',{d:data.door})
    }

    if(data.kilometerMin && typeof data.kilometerMin==='number' ){
        builder.andWhere('vehicle.kilometer>=:kmin ',{kmin:data.kilometerMin})
    }

    if(data.kilometerMax && typeof data.kilometerMax==='number' ){
        builder.andWhere('vehicle.kilometer <=:kmax ',{kmax:data.kilometerMax})
    }

    if(data.type &&  data.type.length > 0  ){
        builder.andWhere('vt.type LIKE :n ',{n:data.type})
    }

    if(data.fuel &&  data.fuel.length > 0  ){
        builder.andWhere('ft.type LIKE :n ',{n:data.fuel})
    }

    if(data.transsmision &&  data.transsmision.length > 0  ){
        builder.andWhere('t.type LIKE :n ',{n:data.transsmision})
    }

    if(data.make &&  data.make.length > 0  ){
        builder.andWhere('mm.name LIKE :n ',{n:data.make})
    }

    if(data.model &&  data.model.length > 0  ){
        builder.andWhere('m.name LIKE :n ',{n:data.model})
    }


    if (data.tags && data.tags.length > 0) {
        for (const tag of data.tags) {
            builder.andWhere(
                'tg.name = :tn',
                {
                    tn: tag.tagValue
                    
                }
            );
        }
    }

    if (data.categories && data.categories.length > 0) {
        for (const ct of data.categories) {
            builder.andWhere(
                'c.name = :cn',
                {
                    cn: ct.categoryValue
                    
                }
            );
        }
    }



    



    let page=0;
    let perPage:5|10|25|50|75=25;

    if(data.page && typeof data.page === 'number'){
        page=data.page;
    }
    if(data.itemsPerPage && typeof data.itemsPerPage === 'number'){
        perPage=data.itemsPerPage ;
    }

    builder.skip(page*perPage);
    builder.take(perPage);

    let items=await builder.getMany();

    return items;



}

}