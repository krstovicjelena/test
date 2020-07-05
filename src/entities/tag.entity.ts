import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category.entity";
import { TagVehicle } from "./tagVehicle.entity";

@Index("name_UNIQUE", ["name"], { unique: true })
@Index("tag_category_id", ["categoryId"], {})
@Entity("tag", { schema: "auto_oglasi" })
export class Tag {
  @PrimaryGeneratedColumn({ type: "int", name: "tag_id", unsigned: true })
  tagId: number;

  @Column("varchar", { name: "name", unique: true, length: 128 })
  name: string;

  @Column("int", { name: "category_id", unsigned: true })
  categoryId: number;

  @Column("varchar", { name: "type", length: 10 })
  type: string;

  @ManyToOne(() => Category, (category) => category.tags, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Category;

  @OneToMany(() => TagVehicle, (tagVehicle) => tagVehicle.tag)
  tagVehicles: TagVehicle[];
}
