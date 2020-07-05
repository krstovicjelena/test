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
import { TagVehicle } from "./tagVehicle.entity";
import { Category } from "./category.entity";
import { FuelType } from "./fuelType.entity";
import { Model } from "./model.entity";
import { Transmission } from "./transmission.entity";
import { User } from "./user.entity";

@Index("uq_vehicle_photo", ["photo"], { unique: true })
@Index("fk_vehicle_model_id", ["modelId"], {})
@Index("fk_vehicle_transmission_id", ["transmissonId"], {})
@Index("fk_vehicle_user_id", ["userId"], {})
@Index("fk_vehicle_category_id", ["categoryId"], {})
@Index("fk_vehicle_fuel_type_id", ["fuelTypeId"], {})
@Entity("vehicle", { schema: "auto_oglasi" })
export class Vehicle {
  @PrimaryGeneratedColumn({ type: "int", name: "vehicle_id", unsigned: true })
  vehicleId: number;

  @Column("int", { name: "price" })
  price: number;

  @Column("int", { name: "transmisson_id", unsigned: true })
  transmissonId: number;

  @Column("int", { name: "model_id", unsigned: true })
  modelId: number;

  @Column("text", { name: "description" })
  description: string;

  @Column("varchar", {
    name: "photo",
    unique: true,
    length: 255,
    default: () => "'0'",
  })
  photo: string;

  @Column("int", { name: "fuel_type_id", unsigned: true })
  fuelTypeId: number;

  @Column("int", { name: "door" })
  door: number;

  @Column("varchar", { name: "color", length: 30 })
  color: string;

  @Column("int", { name: "cubic_capacity" })
  cubicCapacity: number;

  @Column("int", { name: "power" })
  power: number;

  @Column("int", { name: "kilometer" })
  kilometer: number;

  @Column("tinyint", {
    name: "registration",
    unsigned: true,
    default: () => "'1'",
  })
  registration: number;

  @Column("enum", { name: "seller", enum: ["Owner", "Agency"] })
  seller: "Owner" | "Agency";


  @Column("int", { name: "user_id", unsigned: true })
  userId: number;

  @Column("int", { name: "year_of_production" })
  yearOfProduction: number;

  @Column("int", { name: "category_id", unsigned: true })
  categoryId: number;

  @OneToMany(() => Advertisement, (advertisement) => advertisement.vehicle)
  advertisements: Advertisement[];

  @OneToMany(() => TagVehicle, (tagVehicle) => tagVehicle.vehicle)
  tagVehicles: TagVehicle[];

  @ManyToOne(() => Category, (category) => category.vehicles, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Category;

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
}
