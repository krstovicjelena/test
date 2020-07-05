import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Make } from "./make.entity";
import { Vehicle } from "./vehicle.entity";
import * as Validator from 'class-validator';

@Index("uq_model_name", ["name"], { unique: true })
@Index("fk_model_make_id", ["makeId"], {})
@Entity("model")
export class Model {
  @PrimaryGeneratedColumn({ type: "int", name: "model_id", unsigned: true })
  modelId: number;

  @Column( { type: "int",name: "make_id", unsigned: true })
  makeId: number;

  @Column({ type: "varchar", unique: true, length: 60 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(1,60)
  name: string;

  @ManyToOne(() => Make, (make) => make.models, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "make_id", referencedColumnName: "makeId" }])
  make: Make;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.model)
  vehicles: Vehicle[];
}
