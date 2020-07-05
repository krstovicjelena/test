import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Advertisement } from "./advertisement.entity";
import { FuelType } from "./fuelType.entity";
import { Model } from "./model.entity";
import { Transmission } from "./transmission.entity";
import { User } from "./user.entity";
import { VehicleType } from "./vehicleType.entity";
import * as Validator from 'class-validator';

@Index("uq_vehicle_photo", ["photo"], { unique: true })
@Index("fk_vehicle_vehicle_type_id", ["vehicleTypeId"], {})
@Index("fk_vehicle_model_id", ["modelId"], {})
@Index("fk_vehicle_fuel_type_id", ["fuelTypeId"], {})
@Index("fk_vehicle_transmission_id", ["transmissonId"], {})
@Index("fk_vehicle_user_id", ["userId"], {})
@Entity("vehicle", { schema: "auto_oglasi" })
export class Vehicle {
  @PrimaryGeneratedColumn({ type: "int", name: "vehicle_id", unsigned: true })
  vehicleId: number;

 
  @Column({ type: "int",name: "vehicle_type_id", unsigned: true })
  vehicleTypeId: number;

  @Column({ type: "int" })
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity:false,
    allowNaN: false, 
    maxDecimalPlaces: 0  
  })
  price: number;

  @Column({ type: "int",name: "transmisson_id", unsigned: true })
  transmissonId: number;

  @Column({ type: "int",name: "model_id", unsigned: true })
  modelId: number;

  @Column({type: "text" })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(20,10000)
  description: string;

  @Column( { type: "varchar" ,length: 255, unique:true, default:()=>"'0'"})
  @Validator.IsString()
  @Validator.IsNotEmpty()
  @Validator.Length(3,255)
  photo: string;

  @Column( { type: "int",name: "fuel_type_id", unsigned: true })
  fuelTypeId: number;

  @Column( {type: "int", })
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity:false,
    allowNaN: false, 
    maxDecimalPlaces: 0  
  })
  door: number;

  @Column({type: "varchar", length: 30 })
  @Validator.IsString()
  @Validator.IsNotEmpty()
  @Validator.Length(3,30)
  color: string;

  @Column({ name:"cubic_capacity",type: "int"})
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity:false,
    allowNaN: false, 
    maxDecimalPlaces: 0  
  })
  cubicCapacity: number;

  @Column({type: "int" })
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity:false,
    allowNaN: false, 
    maxDecimalPlaces: 0  
  })
  power: number;

  @Column({type: "int",})
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity:false,
    allowNaN: false, 
    maxDecimalPlaces: 0  
  })
  kilometer: number;

  @Column( { type: "tinyint", unsigned: true,default:1 })
  @Validator.IsNotEmpty()
  @Validator.IsIn([0,1])
  registration: number;

  @Column({ type: "enum",enum: ["Owner", "Agency"] })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.IsIn(["Owner", "Agency"])
  seller: "Owner" | "Agency";

  @Column( { type: "varchar", length: 255 })
  @Validator.IsString()
  @Validator.IsNotEmpty()
  @Validator.Length(0,255)
  tags: string;

  @Column({ type: "int",name: "user_id", unsigned: true })
  userId: number;
  @OneToMany(() => Advertisement, (advertisement) => advertisement.vehicle)
  advertisements: Advertisement[];

  @Column({type: "int", name : "year_of_production"})
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity:false,
    allowNaN: false, 
    maxDecimalPlaces: 0  
  })
  yearOfProduction: number;

  @ManyToOne(() => FuelType, (fuelType) => fuelType.vehicles, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "fuel_type_id", referencedColumnName: "fuelTypeId" }])
  fuelType: FuelType;

  @ManyToOne(() => Model, (model) => model.vehicles, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "model_id", referencedColumnName: "modelId" }])
  model: Model;

  @ManyToOne(() => Transmission, (transmission) => transmission.vehicles, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "transmisson_id", referencedColumnName: "transmissionId" },
  ])
  transmisson: Transmission;

  @ManyToOne(() => User, (user) => user.vehicles, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;

  @ManyToOne(() => VehicleType, (vehicleType) => vehicleType.vehicles, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "vehicle_type_id", referencedColumnName: "vehicleTypeId" },
  ])
  vehicleType: VehicleType;
}
