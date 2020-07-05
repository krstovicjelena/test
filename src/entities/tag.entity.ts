import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import * as Validator from 'class-validator';


@Index("name_UNIQUE", ["name"], { unique: true })
@Entity("tag")
export class Tag {
  @PrimaryGeneratedColumn({ type: "int", name: "tag_id", unsigned: true })
  tagId: number;

  @Column({  type: "varchar",unique: true, length: 128 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(1,128)
  name: string;

  @Column( { type: "int" })
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity:false,
    allowNaN: false, 
    maxDecimalPlaces: 0  
  })
  category: number;
}
