import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Model } from "./model.entity";
import * as Validator from 'class-validator';

@Index("uq_make_name", ["name"], { unique: true })
@Entity("make")
export class Make {
  @PrimaryGeneratedColumn({ type: "int", name: "make_id", unsigned: true })
  makeId: number;

  @Column( {type: "varchar", unique: true, length: 60 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(1,60)
  name: string;

  @OneToMany(() => Model, (model) => model.make)
  models: Model[];
}
