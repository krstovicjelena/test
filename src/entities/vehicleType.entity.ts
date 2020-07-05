import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Vehicle } from "./vehicle.entity";
import * as Validator from 'class-validator';

@Index("uq_vehicle_type_type", ["type"], { unique: true })
@Entity("vehicle_type")
export class VehicleType {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "vehicle_type_id",
    unsigned: true,
  })
  vehicleTypeId: number;

  @Column({ type:"varchar", unique: true, length: 60 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(2,60)
  type: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.vehicleType)
  vehicles: Vehicle[];
}
