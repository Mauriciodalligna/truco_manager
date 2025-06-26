import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { Match } from "./match";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  email?: string;

  @Column()
  password?: string;

  @ManyToMany(() => Match, (matches) => matches.users, { lazy: true })
  matches?: Match[];

  constructor(
    id?: number,
    name?: string,
    email?: string,
    password?: string,
    matches?: Match[]
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.matches = matches;
  }
}

export default User;
