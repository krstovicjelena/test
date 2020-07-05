import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tag } from "./tag.entity";
import { Vehicle } from "./vehicle.entity";

@Index("fk_tag_vehicle_vehicle_id", ["vehicleId"], {})
@Index("fk_tag_vehicle_tag_id", ["tagId"], {})
@Entity("tag_vehicle", { schema: "auto_oglasi" })
export class TagVehicle {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "tag_vehicle_id",
    unsigned: true,
  })
  tagVehicleId: number;

  @Column("int", { name: "tag_id", unsigned: true })
  tagId: number;

  @Column("int", { name: "vehicle_id", unsigned: true })
  vehicleId: number;

  @ManyToOne(() => Tag, (tag) => tag.tagVehicles, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "tag_id", referencedColumnName: "tagId" }])
  tag: Tag;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.tagVehicles, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "vehicle_id", referencedColumnName: "vehicleId" }])
  vehicle: Vehicle;
}
