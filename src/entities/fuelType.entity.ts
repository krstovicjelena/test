import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Vehicle } from "./vehicle.entity";
import * as Validator from 'class-validator';
@Index("uq_fuel_type_type", ["type"], { unique: true })
@Entity("fuel_type")
export class FuelType {
  @PrimaryGeneratedColumn({ type: "int", name: "fuel_type_id", unsigned: true })
  fuelTypeId: number;

  @Column({ type: "varchar", nullable: true, unique: true, length: 50 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(50)
  type: string | null;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.fuelType)
  vehicles: Vehicle[];
}
