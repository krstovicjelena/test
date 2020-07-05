import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Vehicle } from "./vehicle.entity";
import * as Validator from 'class-validator';

@Index("uq_transmission_type", ["type"], { unique: true })
@Entity("transmission")
export class Transmission {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "transmission_id",
    unsigned: true,
  })
  transmissionId: number;

  @Column({
    type: "varchar",
    unique: true,
    length: 255,
  })
  @Validator.IsString()
  @Validator.Length(1,255)
  @Validator.IsNotEmpty()
  type: string | null;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.transmisson)
  vehicles: Vehicle[];
}
