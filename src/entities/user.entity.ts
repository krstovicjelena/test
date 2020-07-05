import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Vehicle } from "./vehicle.entity";
import * as Validator from 'class-validator';

@Index("uq_user_email", ["email"], { unique: true })
@Entity("user")
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column({type: "varchar",length: 60 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(2,60)
  forename: string;

  @Column( { type: "varchar", length: 60 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(2,60)
  surname: string;

  @Column({ type: "varchar",unique: true, length: 255 })
  @Validator.IsNotEmpty()
  @Validator.IsEmail({
    allow_ip_domain:false,//ne moze smao dshhdsa@127.0.0.1
    allow_utf8_local_part:true,
    require_tld:true,//ne moze samo kdaks@dsadsa
  })
  @Validator.Length(6,255)
  email: string;

  @Column({type: "varchar", name: "password_hash", length: 255 })
  @Validator.IsNotEmpty()
  @Validator.IsHash('sha512')
  passwordHash: string;

  @Column({ type: "varchar",nullable: true, length: 20 })
  @Validator.IsString()
  @Validator.IsPhoneNumber(null)
  @Validator.Length(0,20)
  phone: string | null;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
  vehicles: Vehicle[];
}
