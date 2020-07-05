import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tag } from "./tag.entity";
import { Vehicle } from "./vehicle.entity";

@Index("uq_category_name", ["name"], { unique: true })
@Entity("category", { schema: "auto_oglasi" })
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "category_id", unsigned: true })
  categoryId: number;

  @Column("varchar", { name: "name", nullable: true, unique: true, length: 32 })
  name: string | null;

  @Column("int", {
    name: "parent__category_id",
    nullable: true,
    unsigned: true,
  })
  parentCategoryId: number | null;

  @OneToMany(() => Tag, (tag) => tag.category)
  tags: Tag[];

  @OneToMany(() => Vehicle, (vehicle) => vehicle.category)
  vehicles: Vehicle[];
}
