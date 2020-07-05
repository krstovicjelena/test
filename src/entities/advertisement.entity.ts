import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Vehicle } from "./vehicle.entity";
import * as Validator from 'class-validator';

@Index("fk_advertisement_vehicle_id", ["vehicleId"], {})
@Entity("advertisement", { schema: "auto_oglasi" })
export class Advertisement {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "advertisement_id",
    unsigned: true,
  })
  advertisementId: number;

 
  @Column({ type: "int", name: "vehicle_id", unsigned: true })
  vehicleId: number;

  @Column({
    type: "tinyint",
    nullable: true,
    width: 1,
    default: () => "'1'",
  })
  @Validator.IsNotEmpty()
  @Validator.IsIn([0,1])
  status: boolean | null;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.advertisements, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  
  @JoinColumn([{ name: "vehicle_id", referencedColumnName: "vehicleId" }])
  vehicle: Vehicle;
}
